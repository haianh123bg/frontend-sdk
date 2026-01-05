import * as React from 'react'
import type { ChatKitState, ChatKitActionEvent } from './contracts'
import type { ComponentRegistry, UIComponent } from './types'
import { resolveBindings } from './bindings'
import { SchemaRenderer, type SchemaRendererProps } from './SchemaRenderer'

function resolveNode(node: UIComponent, state: ChatKitState | undefined): UIComponent {
  const resolvedProps = resolveBindings(node.props ?? undefined, state)

  if (node.type === 'form') {
    console.log('[BoundSchemaRenderer] Resolved Form Props:', resolvedProps)
  }

  let resolvedChildren: UIComponent[] | undefined = undefined

  if (Array.isArray(node.children)) {
    let changed = false
    const nextChildren = node.children.map((c) => {
      const next = resolveNode(c, state)
      if (next !== c) changed = true
      return next
    })
    resolvedChildren = changed ? nextChildren : node.children
  }

  if (resolvedProps === node.props && resolvedChildren === node.children) return node

  return {
    ...node,
    props: resolvedProps,
    children: resolvedChildren,
  }
}

export interface BoundSchemaRendererProps {
  node?: UIComponent | null
  nodes?: UIComponent[] | null
  registry?: ComponentRegistry
  conversationId?: string
  onAction?: (event: ChatKitActionEvent) => void
  className?: string
  fallback?: React.ReactNode
  unknownFallback?: SchemaRendererProps['unknownFallback']
  invalidFallback?: SchemaRendererProps['invalidFallback']
  maxDepth?: number
  state?: ChatKitState
}

export const BoundSchemaRenderer: React.FC<BoundSchemaRendererProps> = ({
  node,
  nodes,
  registry,
  conversationId,
  onAction,
  className,
  fallback,
  unknownFallback,
  invalidFallback,
  maxDepth,
  state,
}) => {
  const resolvedNode = React.useMemo(() => {
    if (!node) return node
    return resolveNode(node, state)
  }, [node, state])

  const resolvedNodes = React.useMemo(() => {
    if (!nodes) return nodes
    return nodes.map((n) => resolveNode(n, state))
  }, [nodes, state])

  return (
    <SchemaRenderer
      node={resolvedNode}
      nodes={resolvedNodes}
      registry={registry}
      conversationId={conversationId}
      onAction={onAction}
      className={className}
      fallback={fallback}
      unknownFallback={unknownFallback}
      invalidFallback={invalidFallback}
      maxDepth={maxDepth}
    />
  )
}

BoundSchemaRenderer.displayName = 'BoundSchemaRenderer'
