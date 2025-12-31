import type { JsonPatchOperation } from './contracts'

function cloneJson<T>(value: T): T {
  try {
    return structuredClone(value)
  } catch {
    return JSON.parse(JSON.stringify(value)) as T
  }
}

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

function isArrayIndexToken(token: string): boolean {
  return token === '-' || /^\d+$/.test(token)
}

function ensureContainer(parent: any, token: string, nextToken: string | undefined): any {
  const shouldBeArray = nextToken != null && isArrayIndexToken(nextToken)
  if (parent[token] == null || typeof parent[token] !== 'object') {
    parent[token] = shouldBeArray ? [] : {}
  }
  return parent[token]
}

function setAtPath(doc: any, pathTokens: string[], value: any, mode: 'add' | 'replace') {
  if (pathTokens.length === 0) return value

  let cur = doc
  for (let i = 0; i < pathTokens.length - 1; i++) {
    const token = pathTokens[i]
    const nextToken = pathTokens[i + 1]

    if (Array.isArray(cur)) {
      const idx = token === '-' ? cur.length : Number(token)
      if (!Number.isFinite(idx)) throw new Error(`Invalid array index: ${token}`)
      if (cur[idx] == null || typeof cur[idx] !== 'object') {
        cur[idx] = isArrayIndexToken(nextToken) ? [] : {}
      }
      cur = cur[idx]
      continue
    }

    cur = ensureContainer(cur, token, nextToken)
  }

  const last = pathTokens[pathTokens.length - 1]
  if (Array.isArray(cur)) {
    if (last === '-') {
      cur.push(value)
      return doc
    }

    const idx = Number(last)
    if (!Number.isFinite(idx)) throw new Error(`Invalid array index: ${last}`)
    if (mode === 'add') cur.splice(idx, 0, value)
    else cur[idx] = value
    return doc
  }

  cur[last] = value
  return doc
}

function removeAtPath(doc: any, pathTokens: string[]) {
  if (pathTokens.length === 0) return undefined

  let cur = doc
  for (let i = 0; i < pathTokens.length - 1; i++) {
    const token = pathTokens[i]
    if (cur == null) return doc

    if (Array.isArray(cur)) {
      const idx = token === '-' ? cur.length - 1 : Number(token)
      if (!Number.isFinite(idx)) return doc
      cur = cur[idx]
      continue
    }

    cur = cur[token]
  }

  const last = pathTokens[pathTokens.length - 1]
  if (cur == null) return doc
  if (Array.isArray(cur)) {
    if (last === '-') {
      cur.pop()
      return doc
    }
    const idx = Number(last)
    if (!Number.isFinite(idx)) return doc
    cur.splice(idx, 1)
    return doc
  }

  delete cur[last]
  return doc
}

export function applyJsonPatch<T>(doc: T, ops: JsonPatchOperation[]): T {
  let next: any = cloneJson(doc)

  for (const op of ops) {
    const tokens = parseJsonPointer(op.path)

    if (op.op === 'add') {
      next = setAtPath(next, tokens, op.value, 'add')
      continue
    }

    if (op.op === 'replace') {
      next = setAtPath(next, tokens, op.value, 'replace')
      continue
    }

    if (op.op === 'remove') {
      next = removeAtPath(next, tokens)
      continue
    }

    throw new Error(`Unsupported JSON Patch operation: ${op.op}`)
  }

  return next as T
}
