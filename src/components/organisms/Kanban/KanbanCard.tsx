import * as React from 'react'
import { Card } from '../../atoms/Card/Card'
import { Avatar } from '../../atoms/Avatar/Avatar'
import { Tag } from '../../atoms/Tag/Tag'
import type { KanbanBoardProps, KanbanItem, KanbanSchema } from '../../../kanban/types'

export interface KanbanCardProps {
  item: KanbanItem
  schema: KanbanSchema
  mappings: KanbanBoardProps['mappings']
  onClick?: () => void
  renderCard?: KanbanBoardProps['renderCard']
}

const getFieldLabel = (schema: KanbanSchema, name: string): string => {
  const field = schema.fields.find((f) => f.name === name)
  return field?.label || name
}

const getFieldValue = (item: KanbanItem, name: string): any => {
  return item.data?.[name]
}

const renderMetaValue = (schema: KanbanSchema, name: string, value: any): React.ReactNode => {
  if (value == null) return null
  const field = schema.fields.find((f) => f.name === name)
  if (!field) return String(value)

  if (field.type === 'date' || field.type === 'datetime') {
    const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value
    if (Number.isNaN(date?.getTime?.())) return String(value)
    return date.toLocaleDateString()
  }

  if (field.type === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  if (field.type === 'enum') {
    return String(value)
  }

  return String(value)
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ item, schema, mappings, onClick, renderCard }) => {
  const effectiveMappings = mappings ?? schema.defaultMappings ?? {}
  const titleField = effectiveMappings.cardTitle
  const subtitleField = effectiveMappings.cardSubtitle
  const metaFields = effectiveMappings.cardMeta ?? []
  const avatarField = effectiveMappings.cardAvatar
  const tagsField = effectiveMappings.cardTags

  const computedTitle =
    (titleField && getFieldValue(item, titleField)) ??
    item.data.title ??
    item.data.name ??
    item.id

  const computedSubtitle = subtitleField ? getFieldValue(item, subtitleField) : undefined

  const renderAvatar = () => {
    if (!avatarField) return null
    const avatarValue = getFieldValue(item, avatarField)
    if (!avatarValue) return null

    if (typeof avatarValue === 'string') {
      return <Avatar src={avatarValue} alt={String(computedTitle)} size="sm" />
    }

    if (typeof avatarValue === 'object' && avatarValue) {
      const src = (avatarValue as any).avatar || (avatarValue as any).avatarUrl
      const name = (avatarValue as any).name || (avatarValue as any).email
      if (src || name) {
        return <Avatar src={src} alt={name} size="sm" />
      }
    }

    return null
  }

  const renderTags = () => {
    if (!tagsField) return null

    const value = getFieldValue(item, Array.isArray(tagsField) ? tagsField[0] : tagsField)

    if (!value) return null

    const tags = Array.isArray(value) ? value : [value]

    if (tags.length === 0) return null

    return (
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <Tag key={`${item.id}-tag-${index}`} size="sm" variant="outline">
            {String(tag)}
          </Tag>
        ))}
      </div>
    )
  }

  const defaultRender = () => (
    <Card
      padding="sm"
      compact
      className="flex w-full cursor-pointer flex-col gap-2 rounded-2xl bg-surface-alt hover:bg-primary-50"
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        {renderAvatar() && <div className="mt-0.5 flex-shrink-0">{renderAvatar()}</div>}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-sm font-medium text-text-primary">{String(computedTitle)}</p>
          </div>
          {computedSubtitle && (
            <p className="truncate text-xs text-text-secondary">{String(computedSubtitle)}</p>
          )}
        </div>
      </div>
      {metaFields.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-text-muted">
          {metaFields.map((name) => {
            const value = getFieldValue(item, name)
            if (value == null || value === '') return null
            return (
              <span
                key={name}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5"
              >
                <span className="font-medium text-[10px] uppercase text-text-secondary">
                  {getFieldLabel(schema, name)}
                </span>
                <span>{renderMetaValue(schema, name, value)}</span>
              </span>
            )
          })}
        </div>
      )}
      {renderTags()}
    </Card>
  )

  if (renderCard) {
    return renderCard(item.data, defaultRender)
  }

  return defaultRender()
}

KanbanCard.displayName = 'KanbanCard'
