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

export interface SchemaRendererProps {
  node?: UIComponent | null
  nodes?: UIComponent[] | null
  registry?: ComponentRegistry
  conversationId?: string
  onAction?: (event: ChatKitActionEvent) => void
  className?: string
  fallback?: React.ReactNode
  unknownFallback?: (node: UIComponent, path: string[]) => React.ReactNode
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
}) => {
  const resolvedRegistry = React.useMemo(() => {
    return { ...defaultComponentRegistry, ...(registry ?? {}) }
  }, [registry])

  const renderNode = React.useCallback(
    (n: UIComponent, path: string[]): React.ReactNode => {
      const comp = resolvedRegistry[n.type]

      const children = Array.isArray(n.children) ? n.children : []
      const renderChildren = () => children.map((c, idx) => renderNode(c, [...path, `${c.type}:${idx}`]))

      if (!comp) {
        return unknownFallback ? (
          unknownFallback(n, path)
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs text-text-muted">
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

      return <React.Fragment key={n.key ?? n.id ?? path.join('/')}>{comp(props)}</React.Fragment>
    },
    [conversationId, onAction, resolvedRegistry, unknownFallback]
  )

  const list = nodes ?? (node ? [node] : [])

  return (
    <SchemaRendererErrorBoundary fallback={fallback}>
      <div className={twMerge('flex flex-col gap-3', className)}>
        {list.filter(Boolean).map((n, idx) => renderNode(n as UIComponent, [`${(n as UIComponent).type}:${idx}`]))}
      </div>
    </SchemaRendererErrorBoundary>
  )
}

SchemaRenderer.displayName = 'SchemaRenderer'
