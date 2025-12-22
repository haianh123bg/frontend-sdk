import * as React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { KanbanBoardProps, KanbanItem, KanbanSchema } from '../../../kanban/types'
import { KanbanCard } from './KanbanCard'

export interface SortableKanbanCardProps {
  item: KanbanItem
  schema: KanbanSchema
  mappings: KanbanBoardProps['mappings']
  renderCard?: KanbanBoardProps['renderCard']
  onCardClick?: (item: KanbanItem) => void
  visibleFields?: string[]
}

export const SortableKanbanCard: React.FC<SortableKanbanCardProps> = ({
  item,
  schema,
  mappings,
  renderCard,
  onCardClick,
  visibleFields,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
}

SortableKanbanCard.displayName = 'SortableKanbanCard'
