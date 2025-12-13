import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Plus } from 'lucide-react'
import { Icon } from '../../atoms/Icon/Icon'
import { Chip } from '../../atoms/Chip/Chip'
import { Input } from '../../atoms/Input/Input'
import { DatePicker } from '../../atoms/DatePicker/DatePicker'
import { DatetimePicker } from '../../atoms/DatetimePicker/DatetimePicker'
import { Select } from '../../atoms/Select/Select'
import { MenuDropdown } from '../../molecules/MenuDropdown/MenuDropdown'
import type { LucideIcon } from 'lucide-react'

export interface TableFilterFieldDefinition {
  id: string
  label: string
  icon?: LucideIcon
  type?: string
  options?: { label: string; value: string }[]
  meta?: Record<string, unknown>
}

export interface TableFilterInstance {
  fieldId: string
  operator?: string
  value?: unknown
}

type TableFilterOperatorValueType = 'none' | 'single' | 'multi' | 'range'

type TableFilterOperatorDefinition = {
  id: string
  label: string
  valueType?: TableFilterOperatorValueType
}

export type TableFilterToolbarI18n = {
  buttonLabel: string
  searchPlaceholder: string
  emptyLabel: string
  appliedFiltersLabel: string
  clearAllLabel: string
  yesLabel: string
  noLabel: string
  rangeFromPlaceholder: string
  rangeToPlaceholder: string
  rangeGtePrefix: string
  rangeLtePrefix: string
  rangeSeparator: string
  operators: {
    from: string
    to: string
    between: string
    empty: string
    notEmpty: string
    eq: string
    neq: string
    gt: string
    gte: string
    lt: string
    lte: string
    contains: string
    notContains: string
    startsWith: string
    endsWith: string
    is: string
    isNot: string
    in: string
    notIn: string
  }
}

type TableFilterToolbarI18nInput = Partial<Omit<TableFilterToolbarI18n, 'operators'>> & {
  operators?: Partial<TableFilterToolbarI18n['operators']>
}

export interface TableFilterToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  fields: TableFilterFieldDefinition[]
  filters: TableFilterInstance[]
  onFiltersChange: (filters: TableFilterInstance[]) => void
  i18n?: TableFilterToolbarI18nInput
  renderFieldEditor?: (params: {
    field: TableFilterFieldDefinition
    filter: TableFilterInstance
    onChange: (value: unknown) => void
  }) => React.ReactNode
  formatValue?: (field: TableFilterFieldDefinition, value: unknown) => string
}

const defaultI18n: TableFilterToolbarI18n = {
  buttonLabel: 'Bộ lọc',
  searchPlaceholder: 'Lọc theo...',
  emptyLabel: 'Không tìm thấy trường phù hợp',
  appliedFiltersLabel: 'bộ lọc đang áp dụng',
  clearAllLabel: 'Xoá tất cả',
  yesLabel: 'Có',
  noLabel: 'Không',
  rangeFromPlaceholder: 'Từ',
  rangeToPlaceholder: 'Đến',
  rangeGtePrefix: '>=',
  rangeLtePrefix: '<=',
  rangeSeparator: ' - ',
  operators: {
    from: 'Ngày bắt đầu',
    to: 'Ngày kết thúc',
    between: 'Trong khoảng',
    empty: 'Trống',
    notEmpty: 'Không trống',
    eq: 'Là',
    neq: 'Không phải là',
    gt: 'Lớn hơn',
    gte: 'Lớn hơn hoặc bằng',
    lt: 'Nhỏ hơn',
    lte: 'Nhỏ hơn hoặc bằng',
    contains: 'Chứa',
    notContains: 'Không chứa',
    startsWith: 'Bắt đầu bằng',
    endsWith: 'Kết thúc bằng',
    is: 'Là',
    isNot: 'Không phải là',
    in: 'Bao gồm',
    notIn: 'Không bao gồm',
  },
}

export const TableFilterToolbar = React.forwardRef<HTMLDivElement, TableFilterToolbarProps>(
  (
    {
      className,
      fields,
      filters,
      onFiltersChange,
      i18n: i18nProp,
      renderFieldEditor,
      formatValue,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const [activeFieldId, setActiveFieldId] = React.useState<string | null>(null)
    const [isAddMenuOpen, setIsAddMenuOpen] = React.useState(false)

    const i18n = React.useMemo<TableFilterToolbarI18n>(() => {
      return {
        ...defaultI18n,
        ...(i18nProp ?? {}),
        operators: {
          ...defaultI18n.operators,
          ...(i18nProp?.operators ?? {}),
        },
      }
    }, [i18nProp])

    const getType = (field: TableFilterFieldDefinition) => (field.type ?? '').toLowerCase()

    const getRecordMeta = (field: TableFilterFieldDefinition) =>
      ((field.meta ?? {}) as Record<string, unknown>)

    const isNonEmptyString = (value: unknown): value is string =>
      typeof value === 'string' && value.trim().length > 0

    const guessValueTypeFromOperator = (operatorId: string): TableFilterOperatorValueType => {
      if (operatorId === 'empty' || operatorId === 'not_empty') return 'none'
      if (operatorId === 'between') return 'range'
      if (operatorId === 'in' || operatorId === 'not_in') return 'multi'
      return 'single'
    }

    const getOperatorsFromMeta = (
      field: TableFilterFieldDefinition
    ): { operators?: TableFilterOperatorDefinition[]; defaultOperator?: string } => {
      const meta = getRecordMeta(field)
      const rawOperators = meta.operators
      const rawDefaultOperator = meta.defaultOperator

      const operators = Array.isArray(rawOperators)
        ? rawOperators
            .map((item): TableFilterOperatorDefinition | null => {
              if (!item || typeof item !== 'object') return null
              const record = item as Record<string, unknown>
              const id = record.id
              const label = record.label
              const valueType = record.valueType
              if (!isNonEmptyString(id) || !isNonEmptyString(label)) return null
              if (
                valueType !== undefined &&
                valueType !== 'none' &&
                valueType !== 'single' &&
                valueType !== 'multi' &&
                valueType !== 'range'
              ) {
                return { id, label, valueType: guessValueTypeFromOperator(id) }
              }
              return {
                id,
                label,
                valueType: (valueType as TableFilterOperatorValueType | undefined) ??
                  guessValueTypeFromOperator(id),
              }
            })
            .filter(Boolean) as TableFilterOperatorDefinition[]
        : undefined

      return {
        operators: operators?.length ? operators : undefined,
        defaultOperator: isNonEmptyString(rawDefaultOperator) ? rawDefaultOperator : undefined,
      }
    }

    const getOptionLabel = React.useCallback(
      (field: TableFilterFieldDefinition, value: unknown) => {
        if (!field.options?.length) return undefined
        if (Array.isArray(value)) {
          const values = value.filter((v): v is string => typeof v === 'string')
          const labels = values
            .map((v) => field.options?.find((o) => o.value === v)?.label ?? v)
            .filter(Boolean)
          return labels.join(', ')
        }
        if (typeof value === 'string') {
          return field.options.find((o) => o.value === value)?.label
        }
        return undefined
      },
      []
    )

    const defaultRenderFieldEditor = React.useCallback(
      ({ field, filter, onChange }: {
        field: TableFilterFieldDefinition
        filter: TableFilterInstance
        onChange: (value: unknown) => void
      }) => {
        const type = getType(field)
        const raw = filter.value

        if (type === 'number') {
          return (
            <Input
              type="number"
              value={raw === undefined || raw === null ? '' : String(raw)}
              onChange={(e) => {
                const nextText = e.target.value
                if (!nextText) {
                  onChange(undefined)
                  return
                }
                const nextNumber = Number(nextText)
                onChange(Number.isNaN(nextNumber) ? undefined : nextNumber)
              }}
            />
          )
        }

        if (type === 'date') {
          return (
            <DatePicker
              value={typeof raw === 'string' ? raw : ''}
              onValueChange={(v) => onChange(v || undefined)}
            />
          )
        }

        if (type === 'datetime') {
          return (
            <DatetimePicker
              value={typeof raw === 'string' ? raw : ''}
              onValueChange={(v) => onChange(v || undefined)}
            />
          )
        }

        if (type === 'number_range') {
          const value = (raw ?? {}) as { min?: number; max?: number }
          return (
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder={i18n.rangeFromPlaceholder}
                value={value.min === undefined || value.min === null ? '' : String(value.min)}
                onChange={(e) => {
                  const nextText = e.target.value
                  const nextMin = nextText ? Number(nextText) : undefined
                  onChange({ ...value, min: nextMin })
                }}
              />
              <Input
                type="number"
                placeholder={i18n.rangeToPlaceholder}
                value={value.max === undefined || value.max === null ? '' : String(value.max)}
                onChange={(e) => {
                  const nextText = e.target.value
                  const nextMax = nextText ? Number(nextText) : undefined
                  onChange({ ...value, max: nextMax })
                }}
              />
            </div>
          )
        }

        return (
          <Input
            value={raw === undefined || raw === null ? '' : String(raw)}
            onChange={(e) => onChange(e.target.value)}
          />
        )
      },
      []
    )

    const effectiveRenderFieldEditor = renderFieldEditor ?? defaultRenderFieldEditor

    const isMultiOptionsField = (field: TableFilterFieldDefinition) => {
      const type = getType(field)
      if (type.includes('multi')) return true
      const meta = (field.meta ?? {}) as Record<string, unknown>
      return meta.multiple === true
    }

    const getDefaultOperators = (field: TableFilterFieldDefinition): TableFilterOperatorDefinition[] => {
      const type = getType(field)
      const hasOptions = !!field.options?.length

      if (type === 'date' || type === 'datetime') {
        return [
          { id: 'from', label: i18n.operators.from, valueType: 'single' },
          { id: 'to', label: i18n.operators.to, valueType: 'single' },
          { id: 'between', label: i18n.operators.between, valueType: 'range' },
          { id: 'empty', label: i18n.operators.empty, valueType: 'none' },
          { id: 'not_empty', label: i18n.operators.notEmpty, valueType: 'none' },
        ]
      }

      if (type === 'number' || type === 'number_range') {
        return [
          { id: 'eq', label: i18n.operators.eq, valueType: 'single' },
          { id: 'neq', label: i18n.operators.neq, valueType: 'single' },
          { id: 'gt', label: i18n.operators.gt, valueType: 'single' },
          { id: 'gte', label: i18n.operators.gte, valueType: 'single' },
          { id: 'lt', label: i18n.operators.lt, valueType: 'single' },
          { id: 'lte', label: i18n.operators.lte, valueType: 'single' },
          { id: 'between', label: i18n.operators.between, valueType: 'range' },
          { id: 'empty', label: i18n.operators.empty, valueType: 'none' },
          { id: 'not_empty', label: i18n.operators.notEmpty, valueType: 'none' },
        ]
      }

      if (type === 'boolean') {
        return [
          { id: 'is', label: i18n.operators.is, valueType: 'single' },
          { id: 'is_not', label: i18n.operators.isNot, valueType: 'single' },
          { id: 'empty', label: i18n.operators.empty, valueType: 'none' },
          { id: 'not_empty', label: i18n.operators.notEmpty, valueType: 'none' },
        ]
      }

      if (hasOptions) {
        const isMulti = isMultiOptionsField(field)
        return isMulti
          ? [
              { id: 'in', label: i18n.operators.in, valueType: 'multi' },
              { id: 'not_in', label: i18n.operators.notIn, valueType: 'multi' },
              { id: 'empty', label: i18n.operators.empty, valueType: 'none' },
              { id: 'not_empty', label: i18n.operators.notEmpty, valueType: 'none' },
            ]
          : [
              { id: 'eq', label: i18n.operators.eq, valueType: 'single' },
              { id: 'neq', label: i18n.operators.neq, valueType: 'single' },
              { id: 'empty', label: i18n.operators.empty, valueType: 'none' },
              { id: 'not_empty', label: i18n.operators.notEmpty, valueType: 'none' },
            ]
      }

      return [
        { id: 'contains', label: i18n.operators.contains, valueType: 'single' },
        { id: 'not_contains', label: i18n.operators.notContains, valueType: 'single' },
        { id: 'starts_with', label: i18n.operators.startsWith, valueType: 'single' },
        { id: 'ends_with', label: i18n.operators.endsWith, valueType: 'single' },
        { id: 'eq', label: i18n.operators.eq, valueType: 'single' },
        { id: 'neq', label: i18n.operators.neq, valueType: 'single' },
        { id: 'empty', label: i18n.operators.empty, valueType: 'none' },
        { id: 'not_empty', label: i18n.operators.notEmpty, valueType: 'none' },
      ]
    }

    const getOperatorConfig = (field: TableFilterFieldDefinition) => {
      const metaConfig = getOperatorsFromMeta(field)
      const operators = metaConfig.operators ?? getDefaultOperators(field)
      const defaultOperator = metaConfig.defaultOperator ?? operators[0]?.id
      return { operators, defaultOperator }
    }

    const resolveOperatorId = (field: TableFilterFieldDefinition, filter: TableFilterInstance) => {
      const { operators, defaultOperator } = getOperatorConfig(field)
      const current = filter.operator
      if (current && operators.some((op) => op.id === current)) return current
      return defaultOperator
    }

    const getOperatorDef = (field: TableFilterFieldDefinition, operatorId: string | undefined) => {
      if (!operatorId) return undefined
      const { operators } = getOperatorConfig(field)
      const found = operators.find((op) => op.id === operatorId)
      return found
    }

    const normalizeValueForOperator = (
      field: TableFilterFieldDefinition,
      operatorId: string,
      rawValue: unknown
    ) => {
      const opDef = getOperatorDef(field, operatorId)
      const valueType = opDef?.valueType ?? guessValueTypeFromOperator(operatorId)
      const type = getType(field)
      const hasOptions = !!field.options?.length

      if (valueType === 'none') return undefined

      if (valueType === 'multi') {
        if (Array.isArray(rawValue) && rawValue.every((v) => typeof v === 'string')) return rawValue
        if (typeof rawValue === 'string' && rawValue) return [rawValue]
        return undefined
      }

      if (valueType === 'range') {
        if (rawValue && typeof rawValue === 'object') return rawValue
        if (type === 'date' || type === 'datetime') return { start: undefined, end: undefined }
        return { min: undefined, max: undefined }
      }

      if (type === 'number') {
        return typeof rawValue === 'number' ? rawValue : undefined
      }

      if (type === 'boolean') {
        return typeof rawValue === 'boolean' ? rawValue : undefined
      }

      if (type === 'date' || type === 'datetime') {
        return typeof rawValue === 'string' && rawValue ? rawValue : undefined
      }

      if (hasOptions) {
        return typeof rawValue === 'string' && rawValue ? rawValue : undefined
      }

      return typeof rawValue === 'string' && rawValue ? rawValue : undefined
    }

    const formatDefaultValue = (params: {
      field: TableFilterFieldDefinition
      operatorId: string | undefined
      value: unknown
    }) => {
      const { field, operatorId, value } = params
      if (value === undefined || value === null) return ''

      const type = getType(field)
      const operatorDef = getOperatorDef(field, operatorId)
      const valueType =
        operatorDef?.valueType ?? (operatorId ? guessValueTypeFromOperator(operatorId) : 'single')

      if (valueType === 'multi' && Array.isArray(value)) {
        return getOptionLabel(field, value) ?? value.join(', ')
      }

      if (valueType === 'range' && value && typeof value === 'object') {
        if (type === 'date' || type === 'datetime') {
          const v = value as { start?: string; end?: string }
          const start = typeof v.start === 'string' ? v.start : ''
          const end = typeof v.end === 'string' ? v.end : ''
          if (!start && !end) return ''
          if (start && end) return `${start}${i18n.rangeSeparator}${end}`
          if (start) return `${i18n.rangeGtePrefix} ${start}`
          return `${i18n.rangeLtePrefix} ${end}`
        }

        const v = value as { min?: number; max?: number }
        const min = typeof v.min === 'number' && !Number.isNaN(v.min) ? v.min : undefined
        const max = typeof v.max === 'number' && !Number.isNaN(v.max) ? v.max : undefined
        if (min === undefined && max === undefined) return ''
        if (min !== undefined && max !== undefined) return `${min}${i18n.rangeSeparator}${max}`
        if (min !== undefined) return `${i18n.rangeGtePrefix} ${min}`
        return `${i18n.rangeLtePrefix} ${max}`
      }

      if (field.options?.length) {
        return getOptionLabel(field, value) ?? String(value)
      }

      if (typeof value === 'boolean') return value ? i18n.yesLabel : i18n.noLabel

      return String(value)
    }

    const shouldPreferCustomEditor = (field: TableFilterFieldDefinition) => {
      const meta = (field.meta ?? {}) as Record<string, unknown>
      return meta.preferCustomEditor === true
    }

    const renderOperatorSelect = (params: {
      field: TableFilterFieldDefinition
      filter: TableFilterInstance
      operatorId: string
    }) => {
      const { operators } = getOperatorConfig(params.field)
      const options = operators.map((op) => ({ label: op.label, value: op.id }))

      return (
        <div onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
          <Select
            options={options}
            value={params.operatorId}
            onValueChange={(v) => handleChangeOperator(params.filter.fieldId, v)}
            fullWidth={false}
            compact
            variant="ghost"
            className="min-w-[110px]"
          />
        </div>
      )
    }

    const renderValueEditorForOperator = (params: {
      field: TableFilterFieldDefinition
      filter: TableFilterInstance
      operatorId: string
      onChange: (value: unknown) => void
    }) => {
      if (shouldPreferCustomEditor(params.field)) {
        return effectiveRenderFieldEditor({
          field: params.field,
          filter: params.filter,
          onChange: params.onChange,
        })
      }

      const type = getType(params.field)
      const operatorDef = getOperatorDef(params.field, params.operatorId)
      const valueType =
        operatorDef?.valueType ?? (params.operatorId ? guessValueTypeFromOperator(params.operatorId) : 'single')

      if (valueType === 'none') return null

      const hasOptions = !!params.field.options?.length

      if (type === 'boolean') {
        const current = typeof params.filter.value === 'boolean' ? params.filter.value : undefined
        return (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={twMerge(
                clsx(
                  'rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-100',
                  current === true && 'bg-primary-50 font-medium'
                )
              )}
              onClick={() => params.onChange(true)}
            >
              {i18n.yesLabel}
            </button>
            <button
              type="button"
              className={twMerge(
                clsx(
                  'rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-100',
                  current === false && 'bg-primary-50 font-medium'
                )
              )}
              onClick={() => params.onChange(false)}
            >
              {i18n.noLabel}
            </button>
          </div>
        )
      }

      if (hasOptions) {
        const options = params.field.options ?? []

        if (valueType === 'multi') {
          const selected =
            Array.isArray(params.filter.value) &&
            params.filter.value.every((v) => typeof v === 'string')
              ? (params.filter.value as string[])
              : []

          return (
            <div className="max-h-64 overflow-auto">
              {options.map((o) => {
                const isSelected = selected.includes(o.value)
                return (
                  <button
                    key={o.value}
                    type="button"
                    className={twMerge(
                      clsx(
                        'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-left text-text-secondary',
                        'hover:bg-slate-100',
                        isSelected && 'bg-primary-50 font-medium'
                      )
                    )}
                    onClick={() => {
                      const next = isSelected
                        ? selected.filter((v) => v !== o.value)
                        : [...selected, o.value]
                      params.onChange(next.length ? next : undefined)
                    }}
                  >
                    <span className="truncate">{o.label}</span>
                    <span className={clsx('text-[11px]', isSelected ? 'opacity-100' : 'opacity-0')}>
                      ✓
                    </span>
                  </button>
                )
              })}
            </div>
          )
        }

        const selectedValue = typeof params.filter.value === 'string' ? params.filter.value : ''

        return (
          <div className="max-h-64 overflow-auto">
            {options.map((o) => {
              const isSelected = o.value === selectedValue
              return (
                <button
                  key={o.value}
                  type="button"
                  className={twMerge(
                    clsx(
                      'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-left text-text-secondary',
                      'hover:bg-slate-100',
                      isSelected && 'bg-primary-50 font-medium'
                    )
                  )}
                  onClick={() => {
                    params.onChange(o.value)
                    setActiveFieldId(null)
                  }}
                >
                  <span className="truncate">{o.label}</span>
                  <span className={clsx('text-[11px]', isSelected ? 'opacity-100' : 'opacity-0')}>
                    ✓
                  </span>
                </button>
              )
            })}
          </div>
        )
      }

      if (type === 'date') {
        if (valueType === 'range') {
          const value = (params.filter.value ?? {}) as { start?: string; end?: string }
          return (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <DatePicker
                value={typeof value.start === 'string' ? value.start : ''}
                inline
                onValueChange={(v) => params.onChange({ ...value, start: v || undefined })}
              />
              <DatePicker
                value={typeof value.end === 'string' ? value.end : ''}
                inline
                onValueChange={(v) => params.onChange({ ...value, end: v || undefined })}
              />
            </div>
          )
        }

        return (
          <DatePicker
            value={typeof params.filter.value === 'string' ? params.filter.value : ''}
            inline
            onValueChange={(v) => params.onChange(v || undefined)}
          />
        )
      }

      if (type === 'datetime') {
        if (valueType === 'range') {
          const value = (params.filter.value ?? {}) as { start?: string; end?: string }
          return (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <DatetimePicker
                value={typeof value.start === 'string' ? value.start : ''}
                inline
                onValueChange={(v) => params.onChange({ ...value, start: v || undefined })}
              />
              <DatetimePicker
                value={typeof value.end === 'string' ? value.end : ''}
                inline
                onValueChange={(v) => params.onChange({ ...value, end: v || undefined })}
              />
            </div>
          )
        }

        return (
          <DatetimePicker
            value={typeof params.filter.value === 'string' ? params.filter.value : ''}
            inline
            onValueChange={(v) => params.onChange(v || undefined)}
          />
        )
      }

      if (type === 'number' && valueType !== 'range') {
        const raw = params.filter.value
        return (
          <Input
            type="number"
            value={raw === undefined || raw === null ? '' : String(raw)}
            onChange={(e) => {
              const nextText = e.target.value
              if (!nextText) {
                params.onChange(undefined)
                return
              }
              const nextNumber = Number(nextText)
              params.onChange(Number.isNaN(nextNumber) ? undefined : nextNumber)
            }}
          />
        )
      }

      if (valueType === 'range') {
        const value = (params.filter.value ?? {}) as { min?: number; max?: number }
        return (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder={i18n.rangeFromPlaceholder}
              value={value.min === undefined || value.min === null ? '' : String(value.min)}
              onChange={(e) => {
                const nextText = e.target.value
                const nextMin = nextText ? Number(nextText) : undefined
                params.onChange({ ...value, min: nextMin })
              }}
            />
            <Input
              type="number"
              placeholder={i18n.rangeToPlaceholder}
              value={value.max === undefined || value.max === null ? '' : String(value.max)}
              onChange={(e) => {
                const nextText = e.target.value
                const nextMax = nextText ? Number(nextText) : undefined
                params.onChange({ ...value, max: nextMax })
              }}
            />
          </div>
        )
      }

      const raw = params.filter.value
      return (
        <Input
          value={raw === undefined || raw === null ? '' : String(raw)}
          onChange={(e) => params.onChange(e.target.value)}
        />
      )
    }

    const handleAddOrActivateField = (fieldId: string) => {
      const exists = filters.find((f) => f.fieldId === fieldId)
      if (!exists) {
        const field = fields.find((f) => f.id === fieldId)
        const operator = field ? getOperatorConfig(field).defaultOperator : undefined
        const next: TableFilterInstance = { fieldId, operator }
        onFiltersChange([...filters, next])
      }
      setActiveFieldId(fieldId)
    }

    const handleChangeValue = (fieldId: string, value: unknown) => {
      const next = filters.map((f) => (f.fieldId === fieldId ? { ...f, value } : f))
      onFiltersChange(next)
    }

    const handleChangeOperator = (fieldId: string, operator: string) => {
      const field = fields.find((f) => f.id === fieldId)
      const next = filters.map((f) => {
        if (f.fieldId !== fieldId) return f
        if (!field) return { ...f, operator }
        const nextValue = normalizeValueForOperator(field, operator, f.value)
        return { ...f, operator, value: nextValue }
      })
      onFiltersChange(next)
    }

    const ensureFilterHasResolvedOperator = (fieldId: string) => {
      const filter = filters.find((f) => f.fieldId === fieldId)
      const field = fields.find((f) => f.id === fieldId)
      if (!filter || !field) return
      const resolved = resolveOperatorId(field, filter)
      if (filter.operator !== resolved && resolved) {
        handleChangeOperator(fieldId, resolved)
      }
    }

    const handleRemoveFilter = (fieldId: string) => {
      const next = filters.filter((f) => f.fieldId !== fieldId)
      onFiltersChange(next)
      if (activeFieldId === fieldId) {
        setActiveFieldId(null)
      }
    }

    const handleClearAll = () => {
      if (!filters.length) return
      onFiltersChange([])
      setActiveFieldId(null)
    }

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!containerRef.current) return
        if (!containerRef.current.contains(event.target as Node)) {
          setActiveFieldId(null)
          setIsAddMenuOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const filteredFields = fields

    const chips = filters
      .map((filter) => {
        const field = fields.find((f) => f.id === filter.fieldId)
        if (!field) return null

        const rawValue = filter.value
        const operatorId = resolveOperatorId(field, filter)
        const operatorDef = getOperatorDef(field, operatorId)
        const operatorLabel = operatorDef?.label
        const operatorValueType =
          operatorDef?.valueType ?? (operatorId ? guessValueTypeFromOperator(operatorId) : 'single')

        const valueLabel =
          rawValue === undefined || rawValue === null
            ? ''
            : formatValue
            ? formatValue(field, rawValue)
            : formatDefaultValue({ field, operatorId, value: rawValue })

        const displayValueLabel =
          operatorLabel && operatorValueType === 'none'
            ? operatorLabel
            : operatorLabel && valueLabel
            ? `${operatorLabel} ${valueLabel}`
            : operatorLabel
            ? operatorLabel
            : valueLabel

        return {
          id: filter.fieldId,
          label: field.label,
          valueLabel: displayValueLabel,
          field,
          filter,
        }
      })
      .filter(Boolean) as {
      id: string
      label: string
      valueLabel: string
      field: TableFilterFieldDefinition
      filter: TableFilterInstance
    }[]

    return (
      <div
        ref={(node) => {
          containerRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className={twMerge(
          clsx('flex flex-wrap items-center gap-2 text-xs text-text-secondary', className)
        )}
        {...props}
      >
        {chips.map((chip) => {
          const isOpen = activeFieldId === chip.id
          const hasValue = !!chip.valueLabel

          const operatorId = resolveOperatorId(chip.field, chip.filter)
          const operatorDef = getOperatorDef(chip.field, operatorId)
          const valueType =
            operatorDef?.valueType ?? (operatorId ? guessValueTypeFromOperator(operatorId) : 'single')

          return (
            <div key={chip.id} className="relative inline-block">
              <Chip
                size="sm"
                variant={hasValue ? 'primary' : 'outline'}
                label={
                  chip.valueLabel ? `${chip.label}: ${chip.valueLabel}` : chip.label
                }
                startIcon={
                  chip.field.icon ? (
                    <Icon icon={chip.field.icon} size="sm" variant="muted" />
                  ) : undefined
                }
                onClick={() => {
                  ensureFilterHasResolvedOperator(chip.id)
                  setActiveFieldId((current) => (current === chip.id ? null : chip.id))
                }}
                onDelete={() => handleRemoveFilter(chip.id)}
              />
              {isOpen && (
                <MenuDropdown
                  label={chip.label}
                  options={[{ value: chip.id }]}
                  value={chip.id}
                  headerRight={renderOperatorSelect({
                    field: chip.field,
                    filter: chip.filter,
                    operatorId: operatorId ?? '',
                  })}
                  renderOption={() => (
                    <div className="px-2 py-2 text-xs text-text-secondary space-y-2">
                      {valueType !== 'none' && (
                        <div>
                          {renderValueEditorForOperator({
                            field: chip.field,
                            filter: chip.filter,
                            operatorId: operatorId ?? '',
                            onChange: (next) => handleChangeValue(chip.id, next),
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  side="bottom"
                  align="start"
                  sideOffset={4}
                />
              )}
            </div>
          )
        })}

        <div className="flex items-center gap-2">
          <div className="relative inline-block">
            <Chip
              label={i18n.buttonLabel}
              startIcon={<Icon icon={Plus} size="sm" />}
              className="inline-flex items-center gap-1"
              onClick={() => setIsAddMenuOpen((open) => !open)}
            />
            {isAddMenuOpen && (
              <MenuDropdown
                label={i18n.buttonLabel}
                options={filteredFields.map((field) => ({
                  label: field.label,
                  value: field.id,
                }))}
                value={activeFieldId ?? ''}
                side="bottom"
                align="start"
                sideOffset={4}
                renderOption={(option, state) => {
                  const field = filteredFields.find((f) => f.id === option.value)
                  if (!field) return null
                  const isApplied = filters.some((f) => f.fieldId === field.id)
                  return (
                    <button
                      type="button"
                      className={twMerge(
                        'flex w-full items-center gap-2 px-3 py-1.5 text-left text-text-secondary',
                        !option.disabled &&
                          (state.selected || isApplied
                            ? 'cursor-pointer bg-primary-50 hover:bg-primary-100 font-medium'
                            : 'cursor-pointer hover:bg-slate-100'),
                        option.disabled && 'cursor-not-allowed text-text-muted'
                      )}
                      onClick={() => {
                        handleAddOrActivateField(field.id)
                        setIsAddMenuOpen(false)
                      }}
                    >
                      {field.icon && <Icon icon={field.icon} size="sm" />}
                      <span>{field.label}</span>
                    </button>
                  )
                }}
              />
            )}
          </div>

          {filters.length > 0 && (
            <div className="flex items-center gap-2 text-[11px] text-text-muted">
              <span>
                {filters.length} {i18n.appliedFiltersLabel}
              </span>
              <button
                type="button"
                onClick={handleClearAll}
                className="font-medium text-primary-600 hover:underline"
              >
                {i18n.clearAllLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

TableFilterToolbar.displayName = 'TableFilterToolbar'
