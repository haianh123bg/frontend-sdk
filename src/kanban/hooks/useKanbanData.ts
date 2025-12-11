// File: src/kanban/hooks/useKanbanData.ts
import * as React from 'react'
import type {
  KanbanBoardState,
  KanbanColumnConfig,
  KanbanColumnState,
  KanbanFieldMappings,
  KanbanItem,
  KanbanSchema,
  MoveLocation,
} from '../types'

export interface UseKanbanDataOptions {
  schema: KanbanSchema
  mappings?: KanbanFieldMappings
  items: Record<string, any>[]
  columns?: KanbanColumnConfig[]
  pageSize?: number
}

export interface UseKanbanDataResult {
  state: KanbanBoardState
  columnKeyField: string
  idField: string
  columnConfigs: KanbanColumnConfig[]
  getItemById: (id: string) => KanbanItem | undefined
  moveItemLocal: (id: string, from: MoveLocation, to: MoveLocation, position: number) => void
  updateItemLocal: (id: string, patch: any) => void
  addItemLocal: (item: Record<string, any>) => void
  removeItemLocal: (id: string) => void
  replaceState: (next: KanbanBoardState) => void
}

const DEFAULT_ID_FIELD = 'id'
const DEFAULT_COLUMN_FIELD = 'status'

const buildInitialState = (
  schema: KanbanSchema,
  mappings: KanbanFieldMappings | undefined,
  items: Record<string, any>[],
  columnsProp?: KanbanColumnConfig[],
  pageSize?: number
): {
  state: KanbanBoardState
  columnKeyField: string
  idField: string
  columnConfigs: KanbanColumnConfig[]
} => {
  const effectiveMappings = mappings ?? schema.defaultMappings ?? {}
  const idField = effectiveMappings.idField || DEFAULT_ID_FIELD
  const columnKeyField = effectiveMappings.columnKey || DEFAULT_COLUMN_FIELD

  const itemsById: Record<string, KanbanItem> = {}

  const getId = (raw: Record<string, any>): string => {
    const value = raw[idField] ?? raw[DEFAULT_ID_FIELD]
    return typeof value === 'string' || typeof value === 'number' ? String(value) : JSON.stringify(value)
  }

  const columnValueSet = new Set<string>()

  items.forEach((raw) => {
    const id = getId(raw)
    const item: KanbanItem = { id, data: raw }
    itemsById[id] = item

    const columnValue = raw[columnKeyField]
    if (columnValue != null) {
      columnValueSet.add(String(columnValue))
    }
  })

  let columnConfigs: KanbanColumnConfig[]

  if (columnsProp && columnsProp.length > 0) {
    columnConfigs = [...columnsProp].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  } else {
    const columnField = schema.fields.find((f) => f.name === columnKeyField)
    const enumValues = columnField?.enumValues

    if (enumValues && enumValues.length > 0) {
      columnConfigs = enumValues.map((value, index) => ({
        id: value,
        value,
        label: columnField?.label ? `${columnField.label}: ${value}` : value,
        order: index,
        visible: true,
      }))
    } else {
      const values = Array.from(columnValueSet)
      columnConfigs = values.map((value, index) => ({
        id: value,
        value,
        label: value,
        order: index,
        visible: true,
      }))
    }
  }

  const columns: KanbanColumnState[] = columnConfigs.map((config) => {
    const columnItems = items.filter((raw) => String(raw[columnKeyField]) === config.value)
    const itemIds = columnItems.map((raw) => getId(raw))
    const limit = pageSize && pageSize > 0 ? pageSize : undefined
    const visibleItemIds = limit ? itemIds.slice(0, limit) : itemIds

    return {
      key: config.value,
      config,
      itemIds: visibleItemIds,
      totalCount: itemIds.length,
      hasMore: limit ? itemIds.length > limit : false,
      loadingMore: false,
    }
  })

  return {
    state: {
      itemsById,
      columns,
    },
    columnKeyField,
    idField,
    columnConfigs,
  }
}

export const useKanbanData = (options: UseKanbanDataOptions): UseKanbanDataResult => {
  const { schema, mappings, items, columns, pageSize } = options

  const [{ state, columnKeyField, idField, columnConfigs }, setSnapshot] = React.useState(() =>
    buildInitialState(schema, mappings, items, columns, pageSize)
  )

  React.useEffect(() => {
    setSnapshot(buildInitialState(schema, mappings, items, columns, pageSize))
  }, [schema, mappings, items, columns, pageSize])

  const getItemById = React.useCallback(
    (id: string): KanbanItem | undefined => {
      return state.itemsById[id]
    },
    [state.itemsById]
  )

  const updateColumns = React.useCallback(
    (updater: (prev: KanbanBoardState) => KanbanBoardState) => {
      setSnapshot((prev) => {
        const nextState = updater(prev.state)
        return {
          ...prev,
          state: nextState,
        }
      })
    },
    []
  )

  const moveItemLocal = React.useCallback(
    (id: string, from: MoveLocation, to: MoveLocation, position: number) => {
      updateColumns((prev) => {
        if (from.columnKey === to.columnKey) {
          const targetIndex = prev.columns.findIndex((c) => c.key === from.columnKey)
          if (targetIndex === -1) return prev

          const column = prev.columns[targetIndex]
          const currentIndex = column.itemIds.indexOf(id)
          if (currentIndex === -1) return prev

          const nextItemIds = [...column.itemIds]
          nextItemIds.splice(currentIndex, 1)
          const safePosition = Math.max(0, Math.min(position, nextItemIds.length))
          nextItemIds.splice(safePosition, 0, id)

          const nextColumns = [...prev.columns]
          nextColumns[targetIndex] = {
            ...column,
            itemIds: nextItemIds,
          }

          return {
            ...prev,
            columns: nextColumns,
          }
        }

        const fromIndex = prev.columns.findIndex((c) => c.key === from.columnKey)
        const toIndex = prev.columns.findIndex((c) => c.key === to.columnKey)
        if (fromIndex === -1 || toIndex === -1) return prev

        const fromColumn = prev.columns[fromIndex]
        const toColumn = prev.columns[toIndex]

        if (!fromColumn.itemIds.includes(id)) return prev

        const fromIds = fromColumn.itemIds.filter((x) => x !== id)
        const toIds = [...toColumn.itemIds]
        const safePosition = Math.max(0, Math.min(position, toIds.length))
        toIds.splice(safePosition, 0, id)

        const nextColumns = [...prev.columns]
        nextColumns[fromIndex] = {
          ...fromColumn,
          itemIds: fromIds,
          totalCount: Math.max(0, fromColumn.totalCount - 1),
        }
        nextColumns[toIndex] = {
          ...toColumn,
          itemIds: toIds,
          totalCount: toColumn.totalCount + 1,
        }

        return {
          ...prev,
          columns: nextColumns,
        }
      })
    },
    [updateColumns]
  )

  const updateItemLocal = React.useCallback(
    (id: string, patch: any) => {
      updateColumns((prev) => {
        const existing = prev.itemsById[id]
        if (!existing) return prev

        const nextItem: KanbanItem = {
          id,
          data: {
            ...existing.data,
            ...patch,
          },
        }

        return {
          ...prev,
          itemsById: {
            ...prev.itemsById,
            [id]: nextItem,
          },
        }
      })
    },
    [updateColumns]
  )

  const addItemLocal = React.useCallback(
    (raw: Record<string, any>) => {
      const effectiveMappings = mappings ?? schema.defaultMappings ?? {}
      const field = effectiveMappings.idField || DEFAULT_ID_FIELD
      const value = raw[field] ?? raw[DEFAULT_ID_FIELD]
      const id = typeof value === 'string' || typeof value === 'number' ? String(value) : JSON.stringify(value)

      const columnField = effectiveMappings.columnKey || DEFAULT_COLUMN_FIELD
      const columnValue = raw[columnField]
      const columnKey = columnValue != null ? String(columnValue) : ''

      updateColumns((prev) => {
        const nextItem: KanbanItem = {
          id,
          data: raw,
        }

        const nextItemsById: Record<string, KanbanItem> = {
          ...prev.itemsById,
          [id]: nextItem,
        }

        const index = prev.columns.findIndex((c) => c.key === columnKey)
        if (index === -1) {
          return {
            ...prev,
            itemsById: nextItemsById,
          }
        }

        const column = prev.columns[index]
        const nextColumns = [...prev.columns]
        nextColumns[index] = {
          ...column,
          itemIds: [id, ...column.itemIds],
          totalCount: column.totalCount + 1,
        }

        return {
          ...prev,
          itemsById: nextItemsById,
          columns: nextColumns,
        }
      })
    },
    [mappings, schema, updateColumns]
  )

  const removeItemLocal = React.useCallback(
    (id: string) => {
      updateColumns((prev) => {
        if (!prev.itemsById[id]) return prev

        const nextItemsById = { ...prev.itemsById }
        delete nextItemsById[id]

        const nextColumns = prev.columns.map((column) => {
          if (!column.itemIds.includes(id)) return column

          const nextIds = column.itemIds.filter((x) => x !== id)
          return {
            ...column,
            itemIds: nextIds,
            totalCount: Math.max(0, column.totalCount - 1),
          }
        })

        return {
          ...prev,
          itemsById: nextItemsById,
          columns: nextColumns,
        }
      })
    },
    [updateColumns]
  )

  const replaceState = React.useCallback((next: KanbanBoardState) => {
    setSnapshot((prev) => ({
      ...prev,
      state: next,
    }))
  }, [])

  return {
    state,
    columnKeyField,
    idField,
    columnConfigs,
    getItemById,
    moveItemLocal,
    updateItemLocal,
    addItemLocal,
    removeItemLocal,
    replaceState,
  }
}
