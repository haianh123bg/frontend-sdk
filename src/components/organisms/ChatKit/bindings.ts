import type { ChatKitState } from './contracts'

export type BindingSpec = {
  path: string
  default?: any
}

export type BindingsMap = Record<string, BindingSpec>

function decodeJsonPointerToken(token: string): string {
  return token.replace(/~1/g, '/').replace(/~0/g, '~')
}

function parseJsonPointer(path: string): string[] {
  if (!path) return []
  if (path === '/') return ['']
  if (!path.startsWith('/')) {
    throw new Error(`Invalid JSON Pointer: ${path}`)
  }
  return path
    .split('/')
    .slice(1)
    .map((t) => decodeJsonPointerToken(t))
}

export function getStateValue(state: ChatKitState | undefined, path: string): any {
  if (!state) return undefined
  const tokens = parseJsonPointer(path)

  let cur: any = state
  for (const t of tokens) {
    if (cur == null) return undefined
    if (Array.isArray(cur)) {
      const idx = t === '-' ? cur.length - 1 : Number(t)
      if (!Number.isFinite(idx)) return undefined
      cur = cur[idx]
    } else {
      cur = cur[t]
    }
  }
  return cur
}

export function resolveBindings(props: Record<string, any> | undefined, state: ChatKitState | undefined): Record<string, any> | undefined {
  if (!props) return props
  const { bindings, ...rest } = props as { bindings?: BindingsMap } & Record<string, any>
  if (!bindings || typeof bindings !== 'object') return props

  const out: Record<string, any> = { ...rest }
  for (const [propName, spec] of Object.entries(bindings)) {
    if (!spec || typeof spec !== 'object') continue
    const path = (spec as any).path
    if (typeof path !== 'string') continue
    const v = getStateValue(state, path)
    out[propName] = v !== undefined ? v : (spec as any).default
  }

  return out
}
