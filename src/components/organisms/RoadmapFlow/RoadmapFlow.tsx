// File: src/components/organisms/RoadmapFlow/RoadmapFlow.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  type Edge,
  type Node,
  type NodeProps,
  applyEdgeChanges,
  applyNodeChanges,
  type EdgeChange,
  type NodeChange,
} from 'reactflow'

export type RoadmapFlowNodeStatus = 'completed' | 'in-progress' | 'todo' | 'optional'

export interface RoadmapFlowNode {
  id: string
  label: string
  description?: string
  status?: RoadmapFlowNodeStatus
  href?: string
  column: number
  row: number
}

export interface RoadmapFlowEdge {
  from: string
  to: string
  dashed?: boolean
}

export interface RoadmapFlowDto {
  title?: string
  description?: string
  nodes: RoadmapFlowNode[]
  edges: RoadmapFlowEdge[]
}

export interface RoadmapFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  config: RoadmapFlowDto
  onNodeClick?: (node: RoadmapFlowNode) => void
}
export interface RoadmapFlowNodeData extends RoadmapFlowNode {
  statusClasses: ReturnType<typeof getStatusClasses>
  onClick?: (node: RoadmapFlowNode) => void
}

const COLUMN_GAP = 260
const ROW_GAP = 96
const PADDING_X = 40
const PADDING_Y = 40

const getStatusClasses = (status: RoadmapFlowNodeStatus | undefined) => {
  switch (status) {
    case 'completed':
      return {
        border: 'border-emerald-400',
        bg: 'bg-amber-100',
        dot: 'bg-emerald-500',
      }
    case 'in-progress':
      return {
        border: 'border-sky-400',
        bg: 'bg-amber-50',
        dot: 'bg-sky-500',
      }
    case 'optional':
      return {
        border: 'border-dashed border-slate-300',
        bg: 'bg-surface',
        dot: 'bg-slate-400',
      }
    case 'todo':
    default:
      return {
        border: 'border-slate-300',
        bg: 'bg-amber-50',
        dot: 'bg-slate-300',
      }
  }
}

const handleStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 9999,
  background: 'transparent',
  border: 'none',
}

const RoadmapFlowNodeComponent: React.FC<NodeProps<RoadmapFlowNodeData>> = ({ data }) => {
  const clickable = !!(data.onClick || data.href)

  const commonContent = (
    <div
      className={twMerge(
        clsx(
          'flex items-center gap-2 rounded-xl px-3 py-2 text-sm shadow-sm transition-colors',
          'border-2',
          data.statusClasses.border,
          data.statusClasses.bg,
          clickable && 'cursor-pointer hover:bg-amber-200/70'
        )
      )}
    >
      <span
        className={twMerge(
          clsx('h-3 w-3 flex-shrink-0 rounded-full border border-white', data.statusClasses.dot)
        )}
      />
      <span className="text-xs font-medium text-slate-900">{data.label}</span>
    </div>
  )

  const handleClick = () => {
    data.onClick?.(data)
  }

  const Wrapper: React.ComponentType<
    React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>
  > = (data.href ? 'a' : 'button') as any

  const wrapperProps: any = data.href
    ? {
        href: data.href,
        target: '_blank',
        rel: 'noreferrer',
        type: undefined,
      }
    : {
        type: 'button',
      }

  return (
    <Wrapper
      {...wrapperProps}
      onClick={handleClick}
      className="relative inline-flex items-stretch"
    >
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
        isConnectable={false}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyle}
        isConnectable={false}
      />
      {commonContent}
    </Wrapper>
  )
}

const nodeTypes = {
  roadmapNode: RoadmapFlowNodeComponent,
}

export const RoadmapFlow: React.FC<RoadmapFlowProps> = ({ config, onNodeClick, className, ...rest }) => {
  const initialNodes = React.useMemo<Node<RoadmapFlowNodeData>[]>(() => {
    return config.nodes.map((node) => ({
      id: node.id,
      type: 'roadmapNode',
      position: {
        x: PADDING_X + node.column * COLUMN_GAP,
        y: PADDING_Y + node.row * ROW_GAP,
      },
      data: {
        ...node,
        statusClasses: getStatusClasses(node.status),
        onClick: onNodeClick,
      },
    }))
  }, [config.nodes, onNodeClick])

  const initialEdges = React.useMemo<Edge[]>(() => {
    return config.edges.map((edge, index) => ({
      id: `${edge.from}-${edge.to}-${index}`,
      source: edge.from,
      target: edge.to,
      type: 'smoothstep',
      animated: !edge.dashed,
      style: edge.dashed ? { strokeDasharray: '4 4' } : undefined,
    }))
  }, [config.edges])

  const [nodes, setNodes] = React.useState<Node<RoadmapFlowNodeData>[]>(initialNodes)
  const [edges, setEdges] = React.useState<Edge[]>(initialEdges)

  React.useEffect(() => {
    setNodes(initialNodes)
  }, [initialNodes])

  React.useEffect(() => {
    setEdges(initialEdges)
  }, [initialEdges])

  const onNodesChange = React.useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange = React.useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  const containerClass = twMerge(
    clsx('relative w-full h-[560px] overflow-hidden rounded-2xl bg-surface-alt p-4', className)
  )

  return (
    <div className={containerClass} {...rest}>
      {config.title && (
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-text-primary">{config.title}</h2>
          {config.description && (
            <p className="mt-1 text-sm text-text-secondary">{config.description}</p>
          )}
        </div>
      )}

      <div className="h-[480px] rounded-xl bg-surface shadow-inner">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          nodesConnectable={false}
          elementsSelectable={false}
          panOnScroll
          panOnDrag
          zoomOnScroll
        >
          <Background gap={24} size={1} color="#e5e7eb" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  )
}

RoadmapFlow.displayName = 'RoadmapFlow'
