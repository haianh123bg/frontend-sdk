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
  headerRight?: React.ReactNode
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
  headerRight,
  renderOption,
  side = 'bottom',
  align = 'start',
  sideOffset = 8,
  autoPosition = true,
}) => {
  const selectedValue = value ?? ''
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [resolvedSide, setResolvedSide] = React.useState<'top' | 'bottom'>(side)
  const [positionStyle, setPositionStyle] = React.useState<React.CSSProperties>({})

  React.useEffect(() => {
    setResolvedSide(side)
  }, [side])

  React.useLayoutEffect(() => {
    if (!autoPosition) return
    if (typeof window === 'undefined') return
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const margin = 8

      const anchorEl = el.offsetParent instanceof HTMLElement ? el.offsetParent : el.parentElement
      const anchorRect = anchorEl?.getBoundingClientRect()

      let tx = 0
      let ty = 0
      const rawTransform = el.style.transform || ''
      const m = rawTransform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/)
      if (m) {
        tx = Number(m[1])
        ty = Number(m[2])
      }

      const baseRect = {
        top: rect.top - ty,
        bottom: rect.bottom - ty,
        left: rect.left - tx,
        right: rect.right - tx,
        width: rect.width,
        height: rect.height,
      }

      const spaceAbove = anchorRect ? anchorRect.top - sideOffset - margin : baseRect.top - margin
      const spaceBelow = anchorRect
        ? window.innerHeight - (anchorRect.bottom + sideOffset) - margin
        : window.innerHeight - baseRect.bottom - margin

      const shouldFlip =
        resolvedSide === 'bottom'
          ? baseRect.height > spaceBelow && spaceAbove > spaceBelow
          : baseRect.height > spaceAbove && spaceBelow > spaceAbove

      if (shouldFlip) {
        setResolvedSide(resolvedSide === 'bottom' ? 'top' : 'bottom')
        return
      }

      let dx = 0
      let dy = 0

      if (baseRect.left < margin) {
        dx = margin - baseRect.left
      } else if (baseRect.right > window.innerWidth - margin) {
        dx = window.innerWidth - margin - baseRect.right
      }

      if (resolvedSide === 'bottom' && baseRect.bottom > window.innerHeight - margin) {
        dy = window.innerHeight - margin - baseRect.bottom
      } else if (resolvedSide === 'top' && baseRect.top < margin) {
        dy = margin - baseRect.top
      }

      if (dx !== 0 || dy !== 0) {
        setPositionStyle({ transform: `translate(${dx}px, ${dy}px)` })
      } else {
        setPositionStyle({})
      }
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [autoPosition, resolvedSide, align, options, sideOffset, value])

  const basePositionClasses = clsx(
    'absolute z-50 min-w-[180px]',
    resolvedSide === 'bottom' ? 'top-full' : 'bottom-full',
    align === 'end' ? 'right-0' : 'left-0'
  )

  const offsetStyle: React.CSSProperties =
    resolvedSide === 'bottom' ? { marginTop: sideOffset } : { marginBottom: sideOffset }

  return (
    <div
      ref={containerRef}
      className={twMerge(basePositionClasses, className)}
      style={{ ...offsetStyle, ...positionStyle }}
    >
      <div className="rounded-2xl border border-slate-200 bg-surface text-sm shadow-lg">
        <div className="flex w-full items-center justify-between rounded-t-2xl px-4 py-2 text-xs text-text-muted">
          <span className="truncate">{label}</span>
          <div className="flex items-center gap-2">
            {headerRight}
            <span className="text-[10px]">▲</span>
          </div>
        </div>
        <div className="pt-1">
          {options.map((option) => {
            const isSelected = option.value === selectedValue

            if (renderOption) {
              return (
                <div key={option.value} className="mx-1 my-0.5 overflow-hidden rounded-xl">
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
                    'mx-1 my-0.5 flex w-full items-center rounded-xl px-4 py-1.5 text-left text-sm',
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
