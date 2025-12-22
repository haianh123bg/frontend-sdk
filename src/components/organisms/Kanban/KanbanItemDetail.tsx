import * as React from 'react'
import { GripVertical, Plus } from 'lucide-react'
import { TitleInput } from '../../atoms/TitleInput/TitleInput'
import { Input } from '../../atoms/Input/Input'
import { Textarea } from '../../atoms/Textarea/Textarea'
import { Select } from '../../atoms/Select/Select'
import { DatePicker } from '../../atoms/DatePicker/DatePicker'
import { DatetimePicker } from '../../atoms/DatetimePicker/DatetimePicker'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Button } from '../../atoms/Button/Button'
import { SimpleEditor } from '../../../@/components/tiptap-templates/simple/simple-editor'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { KanbanItem, KanbanSchema, KanbanFieldSchema } from '../../../kanban/types'

export interface KanbanItemDetailProps {
  mode?: 'create' | 'edit'
  item: KanbanItem
  schema: KanbanSchema
  onPatch?: (id: string, patch: Record<string, any>) => void
  onSubmit?: (values: Record<string, any>) => Promise<any> | any
  onCancel?: () => void
  onAddProperty?: () => void
  onFieldClick?: (field: KanbanFieldSchema) => void
  onReorder?: (oldIndex: number, newIndex: number) => void
  className?: string
}

interface SortableFieldProps {
  field: KanbanFieldSchema
  children: React.ReactNode
  onFieldClick?: (field: KanbanFieldSchema) => void
}

const SortableField = ({ field, children, onFieldClick }: SortableFieldProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.name
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    ...(isDragging ? { zIndex: 50 } : {})
  }

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div
        className="absolute -left-5 top-2 flex h-6 w-6 cursor-grab items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={14} className="text-slate-400" />
      </div>

      <div className="grid grid-cols-[140px_1fr] items-start gap-3">
        <div className="pt-2 text-xs text-text-muted">
          <span
            onClick={() => onFieldClick?.(field)}
            className="cursor-pointer hover:text-primary hover:underline decoration-dashed underline-offset-4"
            title="Nhấn để cấu hình thuộc tính"
          >
            {field.label ?? field.name}
          </span>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export const KanbanItemDetail: React.FC<KanbanItemDetailProps> = ({
  mode = 'edit',
  item,
  schema,
  onPatch,
  onSubmit,
  onCancel,
  onAddProperty,
  onFieldClick,
  onReorder,
  className
}) => {
  const fields = schema.fields

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = fields.findIndex((f) => f.name === String(active.id))
    const newIndex = fields.findIndex((f) => f.name === String(over.id))
    if (oldIndex !== -1 && newIndex !== -1) {
      onReorder?.(oldIndex, newIndex)
    }
  }

  const getDisplayValue = (field: KanbanFieldSchema, value: any): string => {
    if (value == null || value === '') return 'Trống'
    if (field.type === 'boolean') return value ? 'Yes' : 'No'
    if (field.type === 'date' || field.type === 'datetime') {
      const dt = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value
      if (Number.isNaN(dt?.getTime?.())) return String(value)
      return dt.toLocaleString()
    }
    if (Array.isArray(value)) return value.map(String).join(', ')
    return String(value)
  }

  const handlePatch = (patch: Record<string, any>) => {
    onPatch?.(item.id, patch)
  }

  const [commentText, setCommentText] = React.useState('')
  const [comments, setComments] = React.useState<string[]>([])

  // Reset state when item changes
  React.useEffect(() => {
    setCommentText('')
    setComments([])
  }, [item.id])

  const titleValue =
    mode === 'create'
      ? String(item.data.title ?? item.data.name ?? '')
      : String(item.data.title ?? item.data.name ?? item.id)

  const renderFieldEditor = (field: KanbanFieldSchema) => {
    const value = item.data[field.name]

    if (field.name === 'id') {
      return <span className="text-xs text-text-muted">{getDisplayValue(field, value)}</span>
    }

    if (field.type === 'enum') {
      const options = (field.enumValues ?? []).map((v) => ({ label: v, value: v }))
      return (
        <Select
          options={options}
          value={typeof value === 'string' ? value : ''}
          onValueChange={(v) => handlePatch({ [field.name]: v })}
          placeholder="Chọn..."
          compact
        />
      )
    }

    if (field.type === 'boolean') {
      return (
        <div className="pt-2">
          <Checkbox
            checked={!!value}
            onChange={(e) => handlePatch({ [field.name]: e.target.checked })}
          />
        </div>
      )
    }

    if (field.type === 'date') {
      return (
        <DatePicker
          value={typeof value === 'string' ? value : ''}
          onValueChange={(v) => handlePatch({ [field.name]: v || undefined })}
        />
      )
    }

    if (field.type === 'datetime') {
      return (
        <DatetimePicker
          value={typeof value === 'string' ? value : ''}
          onValueChange={(v) => handlePatch({ [field.name]: v || undefined })}
        />
      )
    }

    if (field.type === 'text' || field.type === 'richtext') {
      return (
        <Textarea
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => handlePatch({ [field.name]: e.target.value })}
          placeholder="Nhập..."
          resize="vertical"
        />
      )
    }

    if (field.type === 'number') {
      return (
        <Input
          type="number"
          value={value == null ? '' : String(value)}
          onChange={(e) => {
            const raw = e.target.value
            handlePatch({ [field.name]: raw === '' ? undefined : Number(raw) })
          }}
          placeholder="0"
        />
      )
    }

    return (
      <Input
        value={typeof value === 'string' ? value : value == null ? '' : String(value)}
        onChange={(e) => handlePatch({ [field.name]: e.target.value })}
        placeholder="Nhập..."
      />
    )
  }

  return (
    <div className={className}>
      <div className="text-text-primary">
        <div className="mb-4">
          <TitleInput
            value={titleValue}
            onChange={(e) => handlePatch({ title: e.target.value })}
            placeholder="Tiêu đề..."
          />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">Properties</div>
          <div className="space-y-2 pl-6">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={fields.map((f) => f.name)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {fields.map((field) => (
                    <SortableField key={field.name} field={field} onFieldClick={onFieldClick}>
                      {renderFieldEditor(field)}
                    </SortableField>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {onAddProperty && (
              <div className="mt-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="justify-start text-text-secondary hover:text-primary"
                  icon={<Plus size={16} />}
                  onClick={onAddProperty}
                >
                  Thêm thuộc tính
                </Button>
              </div>
            )}
          </div>
        </div>

        {mode !== 'create' && (
          <>
            <div className="mt-6 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">Bình luận</div>
              <div className="space-y-2">
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Thêm bình luận..."
                  resize="vertical"
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      const next = commentText.trim()
                      if (!next) return
                      setComments((prev) => [next, ...prev])
                      setCommentText('')
                    }}
                  >
                    Gửi
                  </Button>
                </div>
                {comments.length > 0 && (
                  <div className="space-y-2">
                    {comments.map((c, idx) => (
                      <div key={idx} className="rounded-xl bg-surface-alt px-3 py-2 text-sm text-text-primary">
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">Canvas</div>
              <SimpleEditor
                value={typeof item.data.canvas === 'string' ? item.data.canvas : ''}
                onValueChange={(html) => handlePatch({ canvas: html })}
              />
            </div>
          </>
        )}

        {mode === 'create' && onSubmit && (
          <div className="mt-6 flex justify-end gap-2 pt-4 border-t border-slate-100">
            {onCancel && (
              <Button type="button" variant="secondary" onClick={onCancel}>
                Hủy
              </Button>
            )}
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                onSubmit(item.data)
              }}
            >
              Tạo task
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

KanbanItemDetail.displayName = 'KanbanItemDetail'
