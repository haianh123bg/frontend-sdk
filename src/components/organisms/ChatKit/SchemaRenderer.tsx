import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import type { ChatKitActionEvent } from './contracts'
import type { ComponentRegistry, SchemaComponentProps, UIComponent } from './types'
import { defaultComponentRegistry } from './defaultRegistry'

class SchemaRendererErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}

function isValidUIComponent(value: unknown): value is UIComponent {
  if (!value || typeof value !== 'object') return false
  const v = value as any
  return typeof v.type === 'string'
}

export interface SchemaRendererProps {
  node?: UIComponent | null
  nodes?: UIComponent[] | null
  registry?: ComponentRegistry
  conversationId?: string
  onAction?: (event: ChatKitActionEvent) => void
  className?: string
  fallback?: React.ReactNode
  unknownFallback?: (node: UIComponent, path: string[]) => React.ReactNode
  invalidFallback?: (value: unknown, path: string[]) => React.ReactNode
  maxDepth?: number
}

export const SchemaRenderer: React.FC<SchemaRendererProps> = ({
  node,
  nodes,
  registry,
  conversationId,
  onAction,
  className,
  fallback,
  unknownFallback,
  invalidFallback,
  maxDepth = 50,
}) => {
  const resolvedRegistry = React.useMemo(() => {
    return { ...defaultComponentRegistry, ...(registry ?? {}) }
  }, [registry])

  const renderNode = React.useCallback(
    (value: unknown, path: string[]): React.ReactNode => {
      if (!isValidUIComponent(value)) {
        return invalidFallback ? (
          <React.Fragment key={path.join('/')}>{invalidFallback(value, path)}</React.Fragment>
        ) : (
          <div
            key={path.join('/')}
            className="rounded-xl border border-dashed border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-700"
          >
            Invalid node at <span className="font-mono">{path.join('/')}</span>
          </div>
        )
      }

      const n = value
      if (path.length > maxDepth) {
        return (
          <div
            key={n.key ?? n.id ?? path.join('/')}
            className="rounded-xl border border-dashed border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800"
          >
            Max depth exceeded at <span className="font-mono">{path.join('/')}</span>
          </div>
        )
      }

      const comp = resolvedRegistry[n.type]

      const children = Array.isArray(n.children) ? n.children : []
      const renderChildren = () =>
        children.map((c, idx) =>
          renderNode(c, [...path, `${isValidUIComponent(c) ? c.type : 'invalid'}:${idx}`])
        )

      if (!comp) {
        return unknownFallback ? (
          <React.Fragment key={n.key ?? n.id ?? path.join('/')}>{unknownFallback(n, path)}</React.Fragment>
        ) : (
          <div
            key={n.key ?? n.id ?? path.join('/')}
            className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs text-text-muted"
          >
            Unsupported component: <span className="font-mono">{n.type}</span>
          </div>
        )
      }

      const props: SchemaComponentProps = {
        node: n,
        renderChildren,
        onAction,
        conversationId,
        path,
      }

      const Comp = comp
      return (
        <React.Fragment key={n.key ?? n.id ?? path.join('/')}> 
          <Comp {...props} />
        </React.Fragment>
      )
    },
    [conversationId, invalidFallback, maxDepth, onAction, resolvedRegistry, unknownFallback]
  )

  const list: Array<unknown> = nodes ?? (node ? [node] : [])

  return (
    <SchemaRendererErrorBoundary fallback={fallback}>
      <div className={twMerge('flex flex-col gap-3', className)}>
        {list.filter(Boolean).map((n, idx) =>
          renderNode(n, [`${isValidUIComponent(n) ? n.type : 'invalid'}:${idx}`])
        )}
      </div>
    </SchemaRendererErrorBoundary>
  )
}

SchemaRenderer.displayName = 'SchemaRenderer'
