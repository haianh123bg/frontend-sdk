// File: src/components/molecules/MenuDropdown/MenuDropdown.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface MenuDropdownOption {
  label?: string
  value: string
  disabled?: boolean
}

export interface MenuDropdownRenderState {
  selected: boolean
}

export interface MenuDropdownProps {
  label: string
  options: MenuDropdownOption[]
  value?: string
  onChange?: (value: string) => void
  className?: string
  /**
   * Tuỳ biến render cho từng option. Nếu truyền renderOption, component sẽ
   * giao toàn quyền render + handle click cho caller (onChange sẽ không được dùng tự động).
   */
  renderOption?: (option: MenuDropdownOption, state: MenuDropdownRenderState) => React.ReactNode
  /**
   * Vị trí ưu tiên theo chiều dọc: top hoặc bottom (mặc định bottom).
   */
  side?: 'top' | 'bottom'
  /**
   * Căn theo chiều ngang: start (trái) hoặc end (phải). Mặc định start.
   */
  align?: 'start' | 'end'
  /**
   * Khoảng cách theo chiều dọc giữa trigger và dropdown (px).
   */
  sideOffset?: number
  /**
   * Tự động điều chỉnh để dropdown không tràn khỏi viewport.
   */
  autoPosition?: boolean
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  renderOption,
  side = 'bottom',
  align = 'start',
  sideOffset = 8,
  autoPosition = true,
}) => {
  const selectedValue = value ?? ''
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [positionStyle, setPositionStyle] = React.useState<React.CSSProperties>({})

  React.useLayoutEffect(() => {
    if (!autoPosition) return
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const margin = 8
    let dx = 0
    let dy = 0

    if (rect.left < margin) {
      dx = margin - rect.left
    } else if (rect.right > window.innerWidth - margin) {
      dx = window.innerWidth - margin - rect.right
    }

    if (side === 'bottom' && rect.bottom > window.innerHeight - margin) {
      dy = window.innerHeight - margin - rect.bottom
    } else if (side === 'top' && rect.top < margin) {
      dy = margin - rect.top
    }

    if (dx !== 0 || dy !== 0) {
      setPositionStyle({ transform: `translate(${dx}px, ${dy}px)` })
    } else {
      setPositionStyle({})
    }
  }, [autoPosition, side, align, options, value])

  const basePositionClasses = clsx(
    'absolute z-50 min-w-[180px]',
    side === 'bottom' ? 'top-full' : 'bottom-full',
    align === 'end' ? 'right-0' : 'left-0'
  )

  const offsetStyle: React.CSSProperties =
    side === 'bottom' ? { marginTop: sideOffset } : { marginBottom: sideOffset }

  return (
    <div
      ref={containerRef}
      className={twMerge(basePositionClasses, className)}
      style={{ ...offsetStyle, ...positionStyle }}
    >
      <div className="rounded-2xl bg-surface text-sm shadow-lg">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-2xl px-4 py-2 text-xs text-text-muted"
        >
          <span>{label}</span>
          <span className="text-[10px]">▲</span>
        </button>
        <div className="pt-1">
          {options.map((option) => {
            const isSelected = option.value === selectedValue

            if (renderOption) {
              return (
                <div key={option.value} className="px-1 py-0.5">
                  {renderOption(option, { selected: isSelected })}
                </div>
              )
            }

            return (
              <button
                key={option.value}
                type="button"
                disabled={option.disabled}
                onClick={() => {
                  if (option.disabled) return
                  onChange?.(option.value)
                }}
                className={twMerge(
                  clsx(
                    'flex w-full items-center px-4 py-1.5 text-left text-sm',
                    !option.disabled && 'cursor-pointer hover:bg-slate-50',
                    option.disabled && 'cursor-not-allowed text-text-muted',
                    isSelected && 'font-medium text-text-primary'
                  )
                )}
              >
                {option.label ?? option.value}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

MenuDropdown.displayName = 'MenuDropdown'
