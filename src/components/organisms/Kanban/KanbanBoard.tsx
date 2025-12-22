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
  DragOverlay,
  type DragStartEvent,
  defaultDropAnimationSideEffects,
  type DropAnimation,
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable'
import { 
  Layout, 
  Database, 
  Filter, 
  ArrowUpDown, 
  Layers, 
  Palette, 
  Check, 
  Columns,
  Workflow,
  Plus
} from 'lucide-react'
import { Scroll } from '../../atoms/Scroll/Scroll'
import { Button } from '../../atoms/Button/Button'
import { EmptyState } from '../../molecules/EmptyState/EmptyState'
import { KanbanBoardToolbar } from '../../molecules/KanbanBoardToolbar/KanbanBoardToolbar'
import { ViewToolbar } from '../../molecules/ViewToolbar/ViewToolbar'
import { TableFilterToolbar, type TableFilterFieldDefinition, type TableFilterInstance } from '../Table/TableFilterToolbar'
import { ViewSettingsPanel, type ViewSettingsMenuItem } from '../ViewSettings/ViewSettingsPanel'
import { PropertyBuilderPanel, type FieldConfig } from '../PropertyBuilder/PropertyBuilderPanel'
import { FieldSettingsPanel } from '../FieldSettings/FieldSettingsPanel'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import { generateId } from '../../../utils/id'
import { useKanbanData } from '../../../kanban/hooks/useKanbanData'
import { useKanbanAiControl } from '../../../kanban/hooks/useKanbanAiControl'
import type { KanbanBoardProps, KanbanItem, KanbanFieldSchema } from '../../../kanban/types'
import { KanbanColumn } from './KanbanColumn'
import { KanbanDetailModal } from './KanbanDetailModal'
import { KanbanCard } from './KanbanCard'

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
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
  selectedId,
  onSelectionChange,
  disableDetailModal,
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

  const [internalSelectedItemId, setInternalSelectedItemId] = React.useState<string | null>(null)
  
  // Ưu tiên dùng props selectedId nếu có (controlled mode), ngược lại dùng internal state
  const effectiveSelectedItemId = selectedId !== undefined ? selectedId : internalSelectedItemId

  const [formMode, setFormMode] = React.useState<'create' | 'edit' | null>(null)
  const [activeColumnKey, setActiveColumnKey] = React.useState<string | null>(null)
  const [activeDragItemId, setActiveDragItemId] = React.useState<string | null>(null)
  const [createDraft, setCreateDraft] = React.useState<Record<string, any> | null>(null)
  
  // Field Management State
  const [showPropertyBuilder, setShowPropertyBuilder] = React.useState(false)
  const [propertyBuilderEditField, setPropertyBuilderEditField] = React.useState<FieldConfig | null>(null)
  const [fieldSettingsFieldName, setFieldSettingsFieldName] = React.useState<string | null>(null)
  // Initialize local fields from schema.fields
  const [localFields, setLocalFields] = React.useState<KanbanFieldSchema[]>(() => [...schema.fields])

  // Sync if schema prop changes deeply (optional, careful with loops)
  // React.useEffect(() => { setLocalFields(schema.fields) }, [schema.fields])

  const effectiveSchema = React.useMemo(() => {
    return {
      ...schema,
      fields: localFields
    }
  }, [schema, localFields])

  const activeFieldForSettings = React.useMemo(() => {
    if (!fieldSettingsFieldName) return null

    const field = localFields.find((f) => f.name === fieldSettingsFieldName)
    if (!field) return null

    return {
      name: field.name,
      label: field.label ?? field.name,
      type: String(field.type)
    }
  }, [fieldSettingsFieldName, localFields])

  const handleReorderFields = (oldIndex: number, newIndex: number) => {
    setLocalFields((prev) => arrayMove(prev, oldIndex, newIndex))
  }

  const handleRenameField = (name: string, newLabel: string) => {
    setLocalFields(prev => prev.map(f => f.name === name ? { ...f, label: newLabel } : f))
  }

  const handleDeleteField = (name: string) => {
    setLocalFields((prev) => prev.filter((f) => f.name !== name))
    setVisibleFieldNames((prev) => prev.filter((f) => f !== name))
    setFieldSettingsFieldName((prev) => (prev === name ? null : prev))
    setPropertyBuilderEditField((prev) => (prev?.name === name ? null : prev))
  }

  const handleDuplicateField = (name: string) => {
    const copyName = `${name}_copy_${Date.now()}`
    setLocalFields((prev) => {
      const idx = prev.findIndex((f) => f.name === name)
      if (idx === -1) return prev
      const field = prev[idx]
      const newField = {
        ...field,
        name: copyName,
        label: `${field.label || field.name} (Copy)`
      }
      const newFields = [...prev]
      newFields.splice(idx + 1, 0, newField)
      return newFields
    })
    setVisibleFieldNames((prev) => (prev.includes(copyName) ? prev : [...prev, copyName]))
  }

  // View Control State
  const [showFilter, setShowFilter] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)
  const [filters, setFilters] = React.useState<TableFilterInstance[]>([])
  
  const [visibleFieldNames, setVisibleFieldNames] = React.useState<string[]>(() => {
    return mappings?.cardMeta ?? schema.defaultMappings?.cardMeta ?? []
  })

  // Basic client-side filtering logic
  const filteredItems = React.useMemo(() => {
    if (!filters.length) return items

    return items.filter((item) => {
      return filters.every((filter) => {
        const itemValue = item[filter.fieldId]
        const filterValue = filter.value

        if (filter.operator === 'empty') {
           return itemValue == null || itemValue === ''
        }
        if (filter.operator === 'not_empty') {
           return itemValue != null && itemValue !== ''
        }

        if (filterValue === undefined || filterValue === null) return true

        if (Array.isArray(filterValue)) { // Multi select (in, not_in)
            if (!itemValue) return false
            if (filter.operator === 'not_in') {
                return !filterValue.includes(itemValue)
            }
            return filterValue.includes(itemValue)
        }

        if (typeof itemValue === 'string') {
          const sItem = itemValue.toLowerCase()
          const sFilter = String(filterValue).toLowerCase()
          
          switch (filter.operator) {
            case 'contains': return sItem.includes(sFilter)
            case 'not_contains': return !sItem.includes(sFilter)
            case 'starts_with': return sItem.startsWith(sFilter)
            case 'ends_with': return sItem.endsWith(sFilter)
            case 'eq': return sItem === sFilter
            case 'neq': return sItem !== sFilter
            default: return sItem.includes(sFilter)
          }
        }
        
        // Number, boolean, etc.
        if (filter.operator === 'eq') return itemValue === filterValue
        if (filter.operator === 'neq') return itemValue !== filterValue
        if (filter.operator === 'gt') return Number(itemValue) > Number(filterValue)
        if (filter.operator === 'gte') return Number(itemValue) >= Number(filterValue)
        if (filter.operator === 'lt') return Number(itemValue) < Number(filterValue)
        if (filter.operator === 'lte') return Number(itemValue) <= Number(filterValue)

        return itemValue == filterValue
      })
    })
  }, [items, filters, effectiveSchema.fields])

  const { state, getItemById, moveItemLocal, addItemLocal, updateItemLocal, removeItemLocal, replaceState } =
    useKanbanData({
      schema: effectiveSchema,
      mappings,
      items: filteredItems,
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

  const selectedItem = effectiveSelectedItemId ? getItemById(effectiveSelectedItemId) ?? null : null

  const toggleFieldVisibility = React.useCallback((fieldName: string) => {
    setVisibleFieldNames(prev => {
      if (prev.includes(fieldName)) {
        return prev.filter(f => f !== fieldName)
      }
      return [...prev, fieldName]
    })
  }, [])

  const filterFields: TableFilterFieldDefinition[] = React.useMemo(() => {
    return effectiveSchema.fields.map(f => ({
      id: f.name,
      label: f.label || f.name,
      type: f.type,
      options: f.enumValues?.map(v => ({ label: v, value: v }))
    }))
  }, [effectiveSchema.fields])

  const settingsItems: ViewSettingsMenuItem[] = React.useMemo(() => [
    {
      id: 'view_settings_group',
      label: 'Xem cài đặt',
      type: 'group',
      children: [
        {
          id: 'layout',
          label: 'Bố cục',
          icon: <Layout size={16} />,
          description: 'Điều chỉnh cách hiển thị',
          children: [
             { id: 'board', label: 'Board', icon: <Columns size={16} /> },
             { id: 'list', label: 'List', icon: <Layers size={16} /> },
          ]
        },
        {
          id: 'properties',
          label: 'Chế độ hiển thị thuộc tính',
          icon: <Database size={16} />,
          description: 'Chọn các trường thông tin hiển thị trên card',
          children: effectiveSchema.fields.map(field => ({
            id: field.name,
            label: field.label || field.name,
            icon: visibleFieldNames.includes(field.name) ? <Check size={16} className="text-primary" /> : <div className="w-4 h-4" />,
            onClick: () => toggleFieldVisibility(field.name)
          }))
        },
        {
          id: 'filter',
          label: 'Bộ lọc',
          icon: <Filter size={16} />,
          onClick: () => {
             setShowSettings(false)
             setShowFilter(true)
          }
        },
        {
          id: 'sort',
          label: 'Sắp xếp',
          icon: <ArrowUpDown size={16} />,
        },
        {
          id: 'group',
          label: 'Nhóm',
          icon: <Layers size={16} />,
        },
        {
          id: 'sub_group',
          label: 'Nhóm con',
          icon: <Layers size={16} className="opacity-70" />,
        },
        {
          id: 'conditional_color',
          label: 'Màu có điều kiện',
          icon: <Palette size={16} />,
        }
      ]
    },
    {
      id: 'data_source_group',
      label: 'Cài đặt nguồn dữ liệu',
      type: 'group',
      children: [
        {
          id: 'edit_properties',
          label: 'Chỉnh sửa thuộc tính',
          icon: <Database size={16} />,
        },
        {
          id: 'automation',
          label: 'Tự động hóa',
          icon: <Workflow size={16} />,
        }
      ]
    }
  ], [effectiveSchema.fields, visibleFieldNames, toggleFieldVisibility])

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

  const handleDragStart = React.useCallback((event: DragStartEvent) => {
    setActiveDragItemId(String(event.active.id))
  }, [])

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      
      setActiveDragItemId(null)

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
      let toLoc = findLocation(overId)

      if (!toLoc) {
        const overColumn = state.columns.find((c) => c.key === overId)
        if (overColumn) {
          toLoc = { columnKey: overColumn.key, index: overColumn.itemIds.length }
        }
      }

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
    if (onSelectionChange) {
      onSelectionChange(item.id)
    } else {
      setInternalSelectedItemId(item.id)
    }
  }

  const handleCloseModal = () => {
    if (onSelectionChange) {
      onSelectionChange(null)
    } else {
      setInternalSelectedItemId(null)
    }
    setFormMode(null)
    setActiveColumnKey(null)
    setCreateDraft(null)
    setShowPropertyBuilder(false)
    setPropertyBuilderEditField(null)
    setFieldSettingsFieldName(null)
  }

  const getCreateInitialValues = React.useCallback(
    (columnKey?: string | null) => {
      const values: Record<string, any> = {}

      effectiveSchema.fields.forEach((field) => {
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
    [effectiveSchema.fields, schema, mappings]
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
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        className={twMerge(
          clsx('flex h-full w-full flex-col rounded-2xl bg-surface-alt p-3', className)
        )}
        style={style}
        role="region"
        aria-label="Kanban Board"
      >
        <ViewToolbar
          onFilterClick={() => setShowFilter((prev) => !prev)}
          filterActive={showFilter || filters.length > 0}
          onSettingsClick={() => setShowSettings(true)}
          settingsActive={showSettings}
          extraActions={
            permissions?.canCreate && onCreate ? (
              <Button
                size="sm"
                variant="primary"
                aria-label="Thêm task"
                title="Thêm task"
                className="px-2"
                onClick={() => {
                  dispatch(
                    EventType.UI_CLICK,
                    { component: 'KanbanBoard', action: 'create', instanceId: effectiveInstanceId },
                    { meta: { component: 'KanbanBoard', instanceId: effectiveInstanceId } }
                  )
                  if (onSelectionChange) {
                    onSelectionChange(null)
                  } else {
                    setInternalSelectedItemId(null)
                  }
                  setFormMode('create')
                  setActiveColumnKey(null)
                  setCreateDraft(getCreateInitialValues(null))
                }}
              >
                <Plus size={16} />
              </Button>
            ) : null
          }
        />

        {showFilter && (
          <div className="mb-3 border-b border-slate-200 pb-3">
            <TableFilterToolbar
              fields={filterFields}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        )}

        <KanbanBoardToolbar
          title="Board"
          locale={locale}
          count={totalItems}
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
                      schema={effectiveSchema}
                      mappings={mappings}
                      onAddClick={
                        permissions?.canCreate && onCreate
                          ? () => {
                              if (onSelectionChange) {
                                onSelectionChange(null)
                              } else {
                                setInternalSelectedItemId(null)
                              }
                              setFormMode('create')
                              setActiveColumnKey(columnState.key)
                              setCreateDraft(getCreateInitialValues(columnState.key))
                            }
                          : undefined
                      }
                      onCardClick={handleCardClick}
                      renderCard={renderCard}
                      virtualized={virtualization}
                      visibleFields={visibleFieldNames}
                    />
                  </div>
                )
              })}
            </div>
          </Scroll>
        )}
        <KanbanDetailModal
          open={formMode === 'create' && !!createDraft}
          mode="create"
          item={createDraft ? ({ id: '__draft__', data: createDraft } as KanbanItem) : null}
          schema={effectiveSchema}
          onClose={handleCloseModal}
          onCancel={handleCloseModal}
          onSubmit={async (values: Record<string, any>) => {
            if (!onCreate) return
            let payload = values
            const created = await onCreate(values)
            if (created) {
              payload = created
            }
            addItemLocal(payload)
            handleCloseModal()
          }}
          onPatch={(_id, patch) => {
            setCreateDraft((prev) => ({
              ...(prev ?? getCreateInitialValues(activeColumnKey)),
              ...patch,
            }))
          }}
          onAddProperty={() => {
            setPropertyBuilderEditField(null)
            setShowPropertyBuilder(true)
          }}
          onFieldClick={(field) => {
            if (!field?.name) return
            setFieldSettingsFieldName(String(field.name))
          }}
          onReorder={handleReorderFields}
        />
        {!disableDetailModal && (
          <KanbanDetailModal
            open={!!selectedItem}
            mode="edit"
            item={selectedItem}
            schema={effectiveSchema}
            onClose={handleCloseModal}
            onPatch={(id, patch) => {
              const prevState = state
              updateItemLocal(id, patch)
              if (!onUpdate) return
              Promise.resolve(onUpdate(id, patch)).catch(() => {
                replaceState(prevState)
              })
            }}
            onAddProperty={() => {
              setPropertyBuilderEditField(null)
              setShowPropertyBuilder(true)
            }}
            onFieldClick={(field) => {
              if (!field?.name) return
              setFieldSettingsFieldName(String(field.name))
            }}
            onReorder={handleReorderFields}
          />
        )}
        
        <ViewSettingsPanel 
          items={settingsItems} 
          open={showSettings} 
          onClose={() => setShowSettings(false)} 
        />

        <PropertyBuilderPanel
          open={showPropertyBuilder}
          onClose={() => {
            setShowPropertyBuilder(false)
            setPropertyBuilderEditField(null)
          }}
          editField={propertyBuilderEditField}
          onAdd={(field) => {
            setLocalFields((prev) => {
              if (prev.some((f) => f.name === field.name)) return prev
              return [
                ...prev,
                {
                  name: field.name,
                  label: field.label,
                  type: field.type,
                  enumValues: field.enumValues
                }
              ]
            })
            setVisibleFieldNames((prev) => (prev.includes(field.name) ? prev : [...prev, field.name]))
          }}
          onUpdate={(field) => {
            setLocalFields((prev) =>
              prev.map((f) =>
                f.name === field.name
                  ? { ...f, label: field.label, type: field.type, enumValues: field.enumValues }
                  : f
              )
            )
          }}
        />

        <FieldSettingsPanel
          open={!!activeFieldForSettings}
          field={activeFieldForSettings}
          onClose={() => setFieldSettingsFieldName(null)}
          onRename={handleRenameField}
          onDelete={handleDeleteField}
          onDuplicate={handleDuplicateField}
          onEditType={(name) => {
            const field = localFields.find((f) => f.name === name)
            if (!field) return

            setPropertyBuilderEditField({
              name: field.name,
              label: field.label ?? field.name,
              type: String(field.type),
              enumValues: field.enumValues
            })
            setShowPropertyBuilder(true)
          }}
        />
      </div>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeDragItemId && getItemById(activeDragItemId) ? (
          <KanbanCard
            item={getItemById(activeDragItemId)!}
            schema={effectiveSchema}
            mappings={mappings}
            renderCard={renderCard}
            visibleFields={visibleFieldNames}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

KanbanBoard.displayName = 'KanbanBoard'
