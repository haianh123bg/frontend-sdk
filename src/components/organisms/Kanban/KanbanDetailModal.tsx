import * as React from 'react'
import { CornerPanel } from '../../molecules/CornerPanel/CornerPanel'
import { Input } from '../../atoms/Input/Input'
import { Textarea } from '../../atoms/Textarea/Textarea'
import { Select } from '../../atoms/Select/Select'
import { DatePicker } from '../../atoms/DatePicker/DatePicker'
import { DatetimePicker } from '../../atoms/DatetimePicker/DatetimePicker'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Button } from '../../atoms/Button/Button'
import { TiptapEditor } from '../../atoms/TiptapEditor/TiptapEditor'
import type { KanbanItem, KanbanSchema, KanbanFieldSchema } from '../../../kanban/types'

export interface KanbanDetailModalProps {
  open: boolean
  item: KanbanItem | null
  schema: KanbanSchema
  onClose: () => void
  onPatch?: (id: string, patch: Record<string, any>) => void
}

export const KanbanDetailModal: React.FC<KanbanDetailModalProps> = ({
  open,
  item,
  schema,
  onClose,
  onPatch,
}) => {
  if (!item) return null

  const fields = schema.fields

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

  React.useEffect(() => {
    if (!open) return
    setCommentText('')
    setComments([])
  }, [open, item.id])

  const titleValue = String(item.data.title ?? item.data.name ?? item.id)

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
        <Checkbox
          checked={!!value}
          onChange={(e) => handlePatch({ [field.name]: e.target.checked })}
        />
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
    <CornerPanel
      open={open}
      onClose={onClose}
      position="top-right"
      size="lg"
      animation="slide-in"
      fullHeight
      noBorder
      className="p-5"
    >
      <div className="text-text-primary">
        <div className="mb-4">
          <input
            value={titleValue}
            onChange={(e) => handlePatch({ title: e.target.value })}
            className={
              'w-full bg-transparent text-2xl font-semibold text-text-primary outline-none ' +
              'placeholder:text-text-muted'
            }
            placeholder="Tiêu đề..."
          />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">Properties</div>
          <div className="space-y-2">
            {fields.map((field) => (
              <div key={field.name} className="grid grid-cols-[140px_1fr] items-start gap-3">
                <div className="pt-2 text-xs text-text-muted">{field.label ?? field.name}</div>
                <div>
                  {field.type === 'boolean' || field.type === 'enum' || field.type === 'date' || field.type === 'datetime' || field.type === 'text' || field.type === 'richtext' || field.type === 'number' ? (
                    renderFieldEditor(field)
                  ) : (
                    renderFieldEditor(field)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

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
          <TiptapEditor
            value={typeof item.data.canvas === 'string' ? item.data.canvas : ''}
            onValueChange={(html) => handlePatch({ canvas: html })}
          />
        </div>
      </div>
    </CornerPanel>
  )
}

KanbanDetailModal.displayName = 'KanbanDetailModal'
