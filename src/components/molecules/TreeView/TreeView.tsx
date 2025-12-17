import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ChevronDown, ChevronRight, File, Folder, FolderOpen } from 'lucide-react'
import { Icon } from '../../atoms/Icon/Icon'

export type TreeNodeType = 'folder' | 'file'

export interface TreeNode {
  id: string
  label: React.ReactNode
  children?: TreeNode[]
  type?: TreeNodeType
  icon?: React.ReactNode
  disabled?: boolean
  actions?: React.ReactNode
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items: TreeNode[]
  indent?: number
  selectedId?: string
  defaultSelectedId?: string
  onSelectedIdChange?: (id: string | undefined, node?: TreeNode) => void
  expandedIds?: string[]
  defaultExpandedIds?: string[]
  onExpandedIdsChange?: (ids: string[]) => void
  onNodeToggle?: (node: TreeNode, expanded: boolean) => void
  renderLabel?: (node: TreeNode) => React.ReactNode
  renderActions?: (node: TreeNode) => React.ReactNode
}

export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      items,
      indent = 16,
      selectedId: selectedIdProp,
      defaultSelectedId,
      onSelectedIdChange,
      expandedIds: expandedIdsProp,
      defaultExpandedIds,
      onExpandedIdsChange,
      onNodeToggle,
      renderLabel,
      renderActions,
      role,
      ...props
    },
    ref
  ) => {
    const isSelectedControlled = selectedIdProp !== undefined
    const [uncontrolledSelectedId, setUncontrolledSelectedId] = React.useState<string | undefined>(
      defaultSelectedId
    )

    const selectedId = selectedIdProp ?? uncontrolledSelectedId

    const isExpandedControlled = expandedIdsProp !== undefined
    const [uncontrolledExpandedIds, setUncontrolledExpandedIds] = React.useState<string[]>(
      defaultExpandedIds ?? []
    )

    const expandedIds = expandedIdsProp ?? uncontrolledExpandedIds

    const setSelectedId = (next: string | undefined, node?: TreeNode) => {
      if (!isSelectedControlled) {
        setUncontrolledSelectedId(next)
      }
      onSelectedIdChange?.(next, node)
    }

    const setExpandedIds = (next: string[]) => {
      if (!isExpandedControlled) {
        setUncontrolledExpandedIds(next)
      }
      onExpandedIdsChange?.(next)
    }

    const isExpanded = (id: string) => expandedIds.includes(id)

    const toggleExpanded = (node: TreeNode) => {
      const nextExpanded = !isExpanded(node.id)
      const nextIds = nextExpanded
        ? [...expandedIds, node.id]
        : expandedIds.filter((x) => x !== node.id)

      setExpandedIds(nextIds)
      onNodeToggle?.(node, nextExpanded)
    }

    const handleSelect = (node: TreeNode) => {
      if (node.disabled) return
      setSelectedId(node.id, node)
    }

    const getDefaultIcon = (node: TreeNode, expanded: boolean) => {
      if (node.icon) return node.icon

      const hasChildren = !!node.children?.length
      const isFolder = node.type === 'folder' || hasChildren

      if (isFolder) {
        return (
          <Icon
            icon={expanded ? FolderOpen : Folder}
            size="sm"
            variant={node.disabled ? 'muted' : 'default'}
          />
        )
      }

      return <Icon icon={File} size="sm" variant={node.disabled ? 'muted' : 'default'} />
    }

    const renderNodes = (nodes: TreeNode[], level: number) => {
      return nodes.map((node) => {
        const hasChildren = !!node.children?.length
        const expanded = hasChildren ? isExpanded(node.id) : false
        const isSelected = selectedId === node.id

        const caretIcon = expanded ? ChevronDown : ChevronRight

        return (
          <React.Fragment key={node.id}>
            <div
              role="treeitem"
              aria-expanded={hasChildren ? expanded : undefined}
              aria-selected={isSelected}
              tabIndex={node.disabled ? -1 : 0}
              onClick={() => handleSelect(node)}
              onKeyDown={(e) => {
                if (node.disabled) return

                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSelect(node)
                  return
                }

                if (e.key === 'ArrowRight' && hasChildren && !expanded) {
                  e.preventDefault()
                  toggleExpanded(node)
                  return
                }

                if (e.key === 'ArrowLeft' && hasChildren && expanded) {
                  e.preventDefault()
                  toggleExpanded(node)
                }
              }}
              className={twMerge(
                clsx(
                  'flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  node.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-surface-alt',
                  isSelected && !node.disabled && 'bg-primary-50 text-primary-700'
                )
              )}
              style={{ paddingLeft: level * indent }}
            >
              {hasChildren ? (
                <button
                  type="button"
                  disabled={node.disabled}
                  aria-label={expanded ? 'Collapse' : 'Expand'}
                  aria-expanded={expanded}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleExpanded(node)
                  }}
                  className={twMerge(
                    clsx(
                      'flex h-6 w-6 items-center justify-center rounded transition-colors',
                      node.disabled ? 'cursor-not-allowed' : 'hover:bg-surface'
                    )
                  )}
                >
                  <Icon icon={caretIcon} size="xs" variant="muted" />
                </button>
              ) : (
                <span className="h-6 w-6" />
              )}

              <span className="flex items-center">{getDefaultIcon(node, expanded)}</span>

              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className={clsx('truncate', node.disabled ? 'text-text-muted' : 'text-text-primary')}>
                  {renderLabel ? renderLabel(node) : node.label}
                </span>
              </div>

              {(renderActions || node.actions) && (
                <div className="flex items-center gap-1 text-text-muted">
                  {renderActions ? renderActions(node) : node.actions}
                </div>
              )}
            </div>

            {hasChildren && expanded && (
              <div role="group">{renderNodes(node.children ?? [], level + 1)}</div>
            )}
          </React.Fragment>
        )
      })
    }

    return (
      <div
        ref={ref}
        role={role ?? 'tree'}
        className={twMerge(clsx('w-full select-none space-y-0.5', className))}
        {...props}
      >
        {renderNodes(items, 0)}
      </div>
    )
  }
)

TreeView.displayName = 'TreeView'
