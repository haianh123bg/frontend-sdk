import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Plus } from 'lucide-react'
import { Icon } from '../../atoms/Icon/Icon'
import { Chip } from '../../atoms/Chip/Chip'
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
  value?: unknown
}

export interface TableFilterToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  fields: TableFilterFieldDefinition[]
  filters: TableFilterInstance[]
  onFiltersChange: (filters: TableFilterInstance[]) => void
  renderFieldEditor: (params: {
    field: TableFilterFieldDefinition
    filter: TableFilterInstance
    onChange: (value: unknown) => void
  }) => React.ReactNode
  formatValue?: (field: TableFilterFieldDefinition, value: unknown) => string
  /**
   * Nhãn cho nút thêm bộ lọc (sẽ được prefix bằng dấu "+" ở UI).
   * Ví dụ: "Thêm bộ lọc" hoặc "Add filter".
   */
  buttonLabel?: string
  /** Placeholder cho ô search trong menu field. */
  searchPlaceholder?: string
  /** Text khi không tìm thấy field phù hợp trong menu. */
  emptyLabel?: string
  /** Phần text sau số lượng filter, ví dụ: "bộ lọc đang áp dụng" hoặc "filters applied". */
  appliedFiltersLabel?: string
  /** Nhãn nút "Xoá tất cả" filter. */
  clearAllLabel?: string
}

export const TableFilterToolbar = React.forwardRef<HTMLDivElement, TableFilterToolbarProps>(
  (
    {
      className,
      fields,
      filters,
      onFiltersChange,
      renderFieldEditor,
      formatValue,
      buttonLabel = 'Bộ lọc',
      searchPlaceholder = 'Lọc theo...',
      emptyLabel = 'Không tìm thấy trường phù hợp',
      appliedFiltersLabel = 'bộ lọc đang áp dụng',
      clearAllLabel = 'Xoá tất cả',
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const [activeFieldId, setActiveFieldId] = React.useState<string | null>(null)
    const [isAddMenuOpen, setIsAddMenuOpen] = React.useState(false)

    const handleAddOrActivateField = (fieldId: string) => {
      const exists = filters.find((f) => f.fieldId === fieldId)
      if (!exists) {
        const next: TableFilterInstance = { fieldId }
        onFiltersChange([...filters, next])
      }
      setActiveFieldId(fieldId)
    }

    const handleChangeValue = (fieldId: string, value: unknown) => {
      const next = filters.map((f) => (f.fieldId === fieldId ? { ...f, value } : f))
      onFiltersChange(next)
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

    const chips = React.useMemo(() => {
      return filters
        .map((filter) => {
          const field = fields.find((f) => f.id === filter.fieldId)
          if (!field) return null
          const rawValue = filter.value
          const valueLabel =
            rawValue === undefined || rawValue === null
              ? ''
              : formatValue
              ? formatValue(field, rawValue)
              : String(rawValue)

          return {
            id: filter.fieldId,
            label: field.label,
            valueLabel,
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
    }, [filters, fields, formatValue])

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
                onClick={() =>
                  setActiveFieldId((current) => (current === chip.id ? null : chip.id))
                }
                onDelete={() => handleRemoveFilter(chip.id)}
              />
              {isOpen && (
                <MenuDropdown
                  label={chip.label}
                  options={[{ value: chip.id }]}
                  value={chip.id}
                  renderOption={() => (
                    <div className="px-2 py-2 text-xs text-text-secondary">
                      {renderFieldEditor({
                        field: chip.field,
                        filter: chip.filter,
                        onChange: (next) => handleChangeValue(chip.id, next),
                      })}
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
              label={buttonLabel}
              startIcon={<Icon icon={Plus} size="sm" />}
              className="inline-flex items-center gap-1"
              onClick={() => setIsAddMenuOpen((open) => !open)}
            />
            {isAddMenuOpen && (
              <MenuDropdown
                label={buttonLabel}
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
                {filters.length} {appliedFiltersLabel}
              </span>
              <button
                type="button"
                onClick={handleClearAll}
                className="font-medium text-primary-600 hover:underline"
              >
                {clearAllLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

TableFilterToolbar.displayName = 'TableFilterToolbar'
