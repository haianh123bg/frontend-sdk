import * as React from 'react'
import type { SortingState } from '@tanstack/react-table'
import type { TableColumn } from './Table'
import type { TableFilterFieldDefinition, TableFilterInstance } from './TableFilterToolbar'

const SORT_FIELD_PREFIX = '__sort__:'

const toSortFieldId = (columnId: string) => `${SORT_FIELD_PREFIX}${columnId}`

const isSortFieldId = (fieldId: string) => fieldId.startsWith(SORT_FIELD_PREFIX)

const fromSortFieldId = (fieldId: string) => fieldId.slice(SORT_FIELD_PREFIX.length)

type UseTableFilterToolbarBindingParams<T> = {
  columns: TableColumn<T>[]
  filterFields: TableFilterFieldDefinition[]
  filterInstances: TableFilterInstance[]
  onFilterInstancesChange: (next: TableFilterInstance[]) => void
  sorting: SortingState
  onSortingChange: (next: SortingState) => void
  sortOperatorLabels?: {
    asc?: string
    desc?: string
  }
}

type UseTableFilterToolbarBindingResult = {
  fields: TableFilterFieldDefinition[]
  filters: TableFilterInstance[]
  onFiltersChange: (next: TableFilterInstance[]) => void
}

export const useTableFilterToolbarBinding = <T,>(
  params: UseTableFilterToolbarBindingParams<T>
): UseTableFilterToolbarBindingResult => {
  const {
    columns,
    filterFields,
    filterInstances,
    onFilterInstancesChange,
    sorting,
    onSortingChange,
    sortOperatorLabels,
  } = params

  const sortLabelAsc = sortOperatorLabels?.asc ?? 'ASC'
  const sortLabelDesc = sortOperatorLabels?.desc ?? 'DESC'

  const sortFields = React.useMemo<TableFilterFieldDefinition[]>(() => {
    return columns
      .filter((c) => !!c.sortable)
      .map((c) => {
        const columnId = typeof c.key === 'string' ? c.key : String(c.key)
        const id = toSortFieldId(columnId)
        return {
          id,
          label: c.label,
          meta: {
            chipGroup: 'sort',
            operators: [
              { id: 'asc', label: sortLabelAsc, valueType: 'none' },
              { id: 'desc', label: sortLabelDesc, valueType: 'none' },
            ],
            defaultOperator: 'asc',
          },
        } satisfies TableFilterFieldDefinition
      })
  }, [columns, sortLabelAsc, sortLabelDesc])

  const sortInstances = React.useMemo<TableFilterInstance[]>(() => {
    return (sorting ?? []).map((s) => ({
      fieldId: toSortFieldId(s.id),
      operator: s.desc ? 'desc' : 'asc',
      value: undefined,
    }))
  }, [sorting])

  const fields = React.useMemo(() => [...filterFields, ...sortFields], [filterFields, sortFields])
  const filters = React.useMemo(
    () => [...filterInstances, ...sortInstances],
    [filterInstances, sortInstances]
  )

  const onFiltersChange = React.useCallback(
    (nextCombined: TableFilterInstance[]) => {
      const nextFilterInstances: TableFilterInstance[] = []
      const nextSortInstances: TableFilterInstance[] = []

      nextCombined.forEach((f) => {
        if (isSortFieldId(f.fieldId)) nextSortInstances.push(f)
        else nextFilterInstances.push(f)
      })

      onFilterInstancesChange(nextFilterInstances)

      const nextSorting: SortingState = nextSortInstances
        .filter((f) => (f.operator === 'asc' || f.operator === 'desc') && isSortFieldId(f.fieldId))
        .map((f) => ({ id: fromSortFieldId(f.fieldId), desc: f.operator === 'desc' }))

      onSortingChange(nextSorting)
    },
    [onFilterInstancesChange, onSortingChange]
  )

  return { fields, filters, onFiltersChange }
}
