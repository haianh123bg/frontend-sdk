// File: src/components/organisms/Kanban/KanbanBoard.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { Scroll } from '../../atoms/Scroll/Scroll'
import { Button } from '../../atoms/Button/Button'
import { EmptyState } from '../../molecules/EmptyState/EmptyState'
import { Modal } from '../../molecules/Modal/Modal'
import { KanbanBoardToolbar } from '../../molecules/KanbanBoardToolbar/KanbanBoardToolbar'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import { generateId } from '../../../utils/id'
import { useKanbanData } from '../../../kanban/hooks/useKanbanData'
import { useKanbanAiControl } from '../../../kanban/hooks/useKanbanAiControl'
import type { KanbanBoardProps, KanbanItem } from '../../../kanban/types'
import { TaskForm } from '../../../kanban/TaskForm'
import { KanbanColumn } from './KanbanColumn'
import { KanbanDetailModal } from './KanbanDetailModal'

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

  const totalItems = React.useMemo(
    () => visibleColumns.reduce((sum, col) => sum + col.itemIds.length, 0),
    [visibleColumns]
  )

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
        <KanbanBoardToolbar
          title="Board"
          locale={locale}
          count={totalItems}
          actions={
            permissions?.canCreate && onCreate ? (
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
            ) : null
          }
        />

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
        <KanbanDetailModal
          open={!!selectedItem}
          item={selectedItem}
          schema={schema}
          onClose={handleCloseModal}
          onPatch={(id, patch) => {
            const prevState = state
            updateItemLocal(id, patch)
            if (!onUpdate) return
            Promise.resolve(onUpdate(id, patch)).catch(() => {
              replaceState(prevState)
            })
          }}
        />
      </div>
    </DndContext>
  )
}

KanbanBoard.displayName = 'KanbanBoard'
