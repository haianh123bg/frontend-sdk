import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Scroll } from '../../atoms/Scroll/Scroll'
import { Button } from '../../atoms/Button/Button'
import type { KanbanBoardProps, KanbanItem, KanbanSchema } from '../../../kanban/types'
import { KanbanCard } from './KanbanCard'
import { SortableKanbanCard } from './SortableKanbanCard'

export interface KanbanColumnProps {
  columnKey: string
  title: string
  items: KanbanItem[]
  schema: KanbanSchema
  mappings: KanbanBoardProps['mappings']
  onAddClick?: () => void
  onCardClick?: (item: KanbanItem) => void
  renderCard?: KanbanBoardProps['renderCard']
  virtualized?: boolean
  virtualRowHeight?: number
  virtualOverscan?: number
  visibleFields?: string[]
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  columnKey,
  title,
  items,
  schema,
  mappings,
  onAddClick,
  onCardClick,
  renderCard,
  virtualized,
  virtualRowHeight = 96,
  virtualOverscan = 8,
  visibleFields,
}) => {
  const parentRef = React.useRef<HTMLDivElement | null>(null)

  const { setNodeRef } = useDroppable({
    id: columnKey,
    data: {
      type: 'Column',
      columnKey,
    },
  })

  const rowVirtualizer = useVirtualizer({
    count: virtualized ? items.length : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => virtualRowHeight,
    overscan: virtualOverscan,
  })

  const virtualItems = virtualized ? rowVirtualizer.getVirtualItems() : []
  const totalSize = virtualized ? rowVirtualizer.getTotalSize() : 0
  const paddingTop = virtualized && virtualItems.length > 0 ? virtualItems[0].start : 0
  const paddingBottom =
    virtualized && virtualItems.length > 0
      ? totalSize - virtualItems[virtualItems.length - 1].end
      : 0

  return (
    <div
      ref={setNodeRef}
      className="flex h-full min-w-[280px] max-w-xs flex-1 flex-col rounded-2xl bg-surface p-3"
      role="list"
      aria-label={title}
      data-column-key={columnKey}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">{title}</h3>
          <span className="text-xs text-text-muted">{items.length}</span>
        </div>
        {onAddClick && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onAddClick}
            aria-label={`Add item to ${title}`}
          >
            +
          </Button>
        )}
      </div>
      <div className="flex-1">
        <Scroll ref={parentRef} direction="vertical" autoHide className="max-h-[70vh] space-y-2 pr-1">
          {items.length === 0 && (
            <div className="rounded-xl bg-surface-alt px-3 py-4 text-center text-xs text-text-muted">
              No items
            </div>
          )}
          {virtualized ? (
            <div style={{ height: totalSize }} className="relative w-full">
              {paddingTop > 0 && <div style={{ height: paddingTop }} aria-hidden />}
              {virtualItems.map((virtualRow) => {
                const item = items[virtualRow.index]
                return (
                  <div
                    key={item.id}
                    data-index={virtualRow.index}
                    style={{
                      position: 'absolute',
                      top: virtualRow.start,
                      left: 0,
                      right: 0,
                    }}
                  >
                    <KanbanCard
                      item={item}
                      schema={schema}
                      mappings={mappings}
                      renderCard={renderCard}
                      onClick={onCardClick ? () => onCardClick(item) : undefined}
                      visibleFields={visibleFields}
                    />
                  </div>
                )
              })}
              {paddingBottom > 0 && <div style={{ height: paddingBottom }} aria-hidden />}
            </div>
          ) : (
            <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <SortableKanbanCard
                    key={item.id}
                    item={item}
                    schema={schema}
                    mappings={mappings}
                    renderCard={renderCard}
                    onCardClick={onCardClick}
                    visibleFields={visibleFields}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </Scroll>
      </div>
    </div>
  )
}

KanbanColumn.displayName = 'KanbanColumn'
