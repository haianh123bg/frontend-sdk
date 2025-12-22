import * as React from 'react'
import { CornerPanel } from '../../molecules/CornerPanel/CornerPanel'
import type { KanbanItem, KanbanSchema, KanbanFieldSchema } from '../../../kanban/types'
import { KanbanItemDetail } from './KanbanItemDetail'

export interface KanbanDetailModalProps {
  open: boolean
  mode?: 'create' | 'edit'
  item: KanbanItem | null
  schema: KanbanSchema
  onClose: () => void
  onPatch?: (id: string, patch: Record<string, any>) => void
  onSubmit?: (values: Record<string, any>) => Promise<any> | any
  onCancel?: () => void
  onAddProperty?: () => void
  onFieldClick?: (field: KanbanFieldSchema) => void
  onReorder?: (oldIndex: number, newIndex: number) => void
}

export const KanbanDetailModal: React.FC<KanbanDetailModalProps> = ({
  open,
  mode = 'edit',
  item,
  schema,
  onClose,
  onPatch,
  onSubmit,
  onCancel,
  onAddProperty,
  onFieldClick,
  onReorder,
}) => {
  if (!item) return null

  return (
    <CornerPanel
      open={open}
      onClose={onClose}
      title={mode === 'create' ? 'Tạo task' : undefined}
      position="top-right"
      size="lg"
      animation="slide-in"
      fullHeight
      noBorder
      className="p-5"
    >
      <KanbanItemDetail
        mode={mode}
        item={item}
        schema={schema}
        onPatch={onPatch}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onAddProperty={onAddProperty}
        onFieldClick={onFieldClick}
        onReorder={onReorder}
      />
    </CornerPanel>
  )
}

KanbanDetailModal.displayName = 'KanbanDetailModal'
