// File: src/components/organisms/Kanban/KanbanBoard.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Scroll } from '../../atoms/Scroll/Scroll'
import { Card } from '../../atoms/Card/Card'
import { Avatar } from '../../atoms/Avatar/Avatar'
import { Tag } from '../../atoms/Tag/Tag'
import { Button } from '../../atoms/Button/Button'
import { EmptyState } from '../../molecules/EmptyState/EmptyState'
import { Modal } from '../../molecules/Modal/Modal'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import { generateId } from '../../../utils/id'
import { useKanbanData } from '../../../kanban/hooks/useKanbanData'
import { useKanbanAiControl } from '../../../kanban/hooks/useKanbanAiControl'
import type { KanbanBoardProps, KanbanItem, KanbanSchema } from '../../../kanban/types'
import { TaskForm } from '../../../kanban/TaskForm'

interface KanbanCardProps {
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

const KanbanCard: React.FC<KanbanCardProps> = ({ item, schema, mappings, onClick, renderCard }) => {
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
              <span key={name} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5">
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

interface SortableKanbanCardProps {
  item: KanbanItem
  schema: KanbanSchema
  mappings: KanbanBoardProps['mappings']
  renderCard?: KanbanBoardProps['renderCard']
  onCardClick?: (item: KanbanItem) => void
}

const SortableKanbanCard: React.FC<SortableKanbanCardProps> = ({
  item,
  schema,
  mappings,
  renderCard,
  onCardClick,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <KanbanCard
        item={item}
        schema={schema}
        mappings={mappings}
        renderCard={renderCard}
        onClick={onCardClick ? () => onCardClick(item) : undefined}
      />
    </div>
  )
}

interface KanbanColumnProps {
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
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
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
}) => {
  const parentRef = React.useRef<HTMLDivElement | null>(null)

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
    virtualized && virtualItems.length > 0 ? totalSize - virtualItems[virtualItems.length - 1].end : 0

  return (
    <div
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
        <Scroll
          ref={parentRef}
          direction="vertical"
          autoHide
          className="max-h-[70vh] space-y-2 pr-1"
        >
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
                    />
                  </div>
                )
              })}
              {paddingBottom > 0 && <div style={{ height: paddingBottom }} aria-hidden />}
            </div>
          ) : (
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <SortableKanbanCard
                    key={item.id}
                    item={item}
                    schema={schema}
                    mappings={mappings}
                    renderCard={renderCard}
                    onCardClick={onCardClick}
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

interface DetailModalProps {
  open: boolean
  item: KanbanItem | null
  schema: KanbanSchema
  onClose: () => void
}

const DetailModal: React.FC<DetailModalProps> = ({ open, item, schema, onClose }) => {
  if (!item) return null

  const fields = schema.fields

  return (
    <Modal open={open} onClose={onClose} title={String(item.data.title ?? item.data.name ?? item.id)} size="lg">
      <div className="space-y-4">
        {fields.map((field) => {
          const value = item.data[field.name]
          return (
            <div key={field.name} className="flex items-start justify-between gap-4 text-sm">
              <div className="w-1/3 text-xs font-medium uppercase tracking-wide text-text-secondary">
                {field.label ?? field.name}
              </div>
              <div className="w-2/3 text-sm text-text-primary break-words">
                {value == null || value === '' ? (
                  <span className="text-text-muted">—</span>
                ) : (
                  <span>{String(value)}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  schema,
  mappings,
  columns,
  items,
  onCreate,
  onUpdate,
  onMove,
  onBulkAction,
  onLoadMore,
  realtime,
  renderCard,
  renderColumnHeader,
  pageSize,
  virtualization,
  permissions,
  locale,
  className,
  style,
  orientation = 'horizontal',
  instanceId,
}) => {
  const dispatch = useDispatchAction()

  const autoInstanceIdRef = React.useRef<string | null>(null)
  if (!autoInstanceIdRef.current) {
    autoInstanceIdRef.current = generateId()
  }
  const effectiveInstanceId = instanceId ?? autoInstanceIdRef.current

  // Đánh dấu một số callback chưa được wiring đầy đủ để tránh cảnh báo TS/ESLint
  void onUpdate
  void onBulkAction
  void onLoadMore
  void realtime

  const { state, getItemById, moveItemLocal, addItemLocal, updateItemLocal, removeItemLocal, replaceState } =
    useKanbanData({
      schema,
      mappings,
      items,
      columns,
      pageSize,
    })

  useKanbanAiControl({
    instanceId: effectiveInstanceId,
    moveItemLocal,
    updateItemLocal,
    addItemLocal,
    removeItemLocal,
  })

  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null)
  const [formMode, setFormMode] = React.useState<'create' | 'edit' | null>(null)
  const [activeColumnKey, setActiveColumnKey] = React.useState<string | null>(null)

  const selectedItem = selectedItemId ? getItemById(selectedItemId) ?? null : null

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (!over || active.id === over.id) return

      if (permissions && permissions.canMove === false) return

      const activeId = String(active.id)
      const overId = String(over.id)

      const findLocation = (id: string) => {
        for (const column of state.columns) {
          const index = column.itemIds.indexOf(id)
          if (index !== -1) {
            return { columnKey: column.key, index }
          }
        }
        return null
      }

      const fromLoc = findLocation(activeId)
      const toLoc = findLocation(overId)

      if (!fromLoc || !toLoc) return

      dispatch(
        'KANBAN.CARD_MOVE',
        {
          id: activeId,
          from: { columnKey: fromLoc.columnKey, index: fromLoc.index },
          to: { columnKey: toLoc.columnKey, index: toLoc.index },
          instanceId: effectiveInstanceId,
        },
        { meta: { component: 'KanbanBoard', instanceId: effectiveInstanceId } }
      )

      const prevState = state

      moveItemLocal(
        activeId,
        { columnKey: fromLoc.columnKey },
        { columnKey: toLoc.columnKey },
        toLoc.index
      )

      if (!onMove) return

      Promise.resolve(
        onMove(
          activeId,
          { columnKey: fromLoc.columnKey },
          { columnKey: toLoc.columnKey },
          toLoc.index
        )
      ).catch(() => {
        replaceState(prevState)
      })
    },
    [onMove, moveItemLocal, replaceState, state, permissions]
  )

  const handleCardClick = (item: KanbanItem) => {
    dispatch(
      EventType.UI_CLICK,
      { component: 'KanbanBoard', action: 'open_detail', id: item.id, instanceId: effectiveInstanceId },
      { meta: { component: 'KanbanBoard', instanceId: effectiveInstanceId } }
    )
    setSelectedItemId(item.id)
  }

  const handleCloseModal = () => {
    setSelectedItemId(null)
    setFormMode(null)
    setActiveColumnKey(null)
  }

  const getCreateInitialValues = React.useCallback(
    (columnKey?: string | null) => {
      const values: Record<string, any> = {}

      schema.fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          values[field.name] = field.defaultValue
        }
      })

      const effectiveMappings = mappings ?? schema.defaultMappings ?? {}
      const columnField = effectiveMappings.columnKey
      if (columnField && columnKey) {
        values[columnField] = columnKey
      }

      return values
    },
    [schema, mappings]
  )

  const orientationClasses =
    orientation === 'horizontal'
      ? 'flex w-full gap-4'
      : 'flex w-full flex-col gap-4'

  const visibleColumns = state.columns.filter((col) => col.config.visible !== false)

  const hasItems = visibleColumns.some((col) => col.itemIds.length > 0)

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        className={twMerge(
          clsx('flex h-full w-full flex-col rounded-2xl bg-surface-alt p-3', className)
        )}
        style={style}
        role="region"
        aria-label="Kanban Board"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-text-primary">Board</h2>
            {locale && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase text-text-muted">
                {locale}
              </span>
            )}
          </div>
          {permissions?.canCreate && onCreate && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                dispatch(
                  EventType.UI_CLICK,
                  { component: 'KanbanBoard', action: 'create', instanceId: effectiveInstanceId },
                  { meta: { component: 'KanbanBoard', instanceId: effectiveInstanceId } }
                )
                setFormMode('create')
                setActiveColumnKey(null)
              }}
            >
              Thêm task
            </Button>
          )}
        </div>

        {!hasItems && (
          <EmptyState
            title="Không có task nào"
            description="Hãy bắt đầu bằng cách tạo task mới hoặc đồng bộ dữ liệu từ backend."
          />
        )}

        {hasItems && (
          <Scroll
            direction={orientation === 'horizontal' ? 'horizontal' : 'vertical'}
            autoHide
            className="-m-1 flex-1 p-1"
          >
            <div className={orientationClasses}>
              {visibleColumns.map((columnState) => {
                const columnItems: KanbanItem[] = columnState.itemIds
                  .map((id) => state.itemsById[id])
                  .filter(Boolean)

                const baseTitle = columnState.config.label ?? columnState.config.value
                const columnHeader = renderColumnHeader
                  ? renderColumnHeader(columnState.config, () => <span>{baseTitle}</span>)
                  : baseTitle

                return (
                  <div key={columnState.key} className="flex flex-col">
                    <KanbanColumn
                      columnKey={columnState.key}
                      title={String(columnHeader)}
                      items={columnItems}
                      schema={schema}
                      mappings={mappings}
                      onAddClick={
                        permissions?.canCreate && onCreate
                          ? () => {
                              setFormMode('create')
                              setActiveColumnKey(columnState.key)
                            }
                          : undefined
                      }
                      onCardClick={handleCardClick}
                      renderCard={renderCard}
                      virtualized={virtualization}
                    />
                  </div>
                )
              })}
            </div>
          </Scroll>
        )}
        {formMode === 'create' && (
          <Modal open onClose={handleCloseModal} title="Tạo task" size="lg">
            <TaskForm
              schema={schema}
              mappings={mappings}
              permissions={permissions}
              mode="create"
              initialValues={getCreateInitialValues(activeColumnKey)}
              onSubmit={async (values) => {
                let payload = values
                if (onCreate) {
                  const created = await onCreate(values)
                  if (created) {
                    payload = created
                  }
                }
                addItemLocal(payload)
                handleCloseModal()
              }}
              onCancel={handleCloseModal}
            />
          </Modal>
        )}
        <DetailModal
          open={!!selectedItem}
          item={selectedItem}
          schema={schema}
          onClose={handleCloseModal}
        />
      </div>
    </DndContext>
  )
}

KanbanBoard.displayName = 'KanbanBoard'
