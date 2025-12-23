import * as React from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { MenuDropdownOption, MenuDropdownRenderState } from './MenuDropdown'

export interface MenuDropdownPortalProps {
  anchorRef: React.RefObject<HTMLElement | null>
  open: boolean
  label: string
  options: MenuDropdownOption[]
  value?: string
  onChange?: (value: string) => void
  onDismiss?: () => void
  className?: string
  headerRight?: React.ReactNode
  renderOption?: (option: MenuDropdownOption, state: MenuDropdownRenderState) => React.ReactNode
  side?: 'top' | 'bottom'
  align?: 'start' | 'end'
  sideOffset?: number
  autoFlip?: boolean
}

export const MenuDropdownPortal: React.FC<MenuDropdownPortalProps> = ({
  anchorRef,
  open,
  label,
  options,
  value,
  onChange,
  onDismiss,
  className,
  headerRight,
  renderOption,
  side = 'bottom',
  align = 'start',
  sideOffset = 8,
  autoFlip = true,
}) => {
  const selectedValue = value ?? ''
  const floatingRef = React.useRef<HTMLDivElement | null>(null)
  const [resolvedSide, setResolvedSide] = React.useState<'top' | 'bottom'>(side)
  const [style, setStyle] = React.useState<React.CSSProperties>({ left: -9999, top: -9999 })

  React.useEffect(() => {
    setResolvedSide(side)
  }, [side])

  React.useLayoutEffect(() => {
    if (!open) return
    if (typeof window === 'undefined') return
    const anchor = anchorRef.current
    const floating = floatingRef.current
    if (!anchor || !floating) return

    const update = () => {
      const margin = 8
      const anchorRect = anchor.getBoundingClientRect()
      const floatingRect = floating.getBoundingClientRect()

      const spaceAbove = anchorRect.top - sideOffset - margin
      const spaceBelow = window.innerHeight - (anchorRect.bottom + sideOffset) - margin

      let nextSide: 'top' | 'bottom' = resolvedSide
      if (autoFlip) {
        if (resolvedSide === 'bottom') {
          if (floatingRect.height > spaceBelow && spaceAbove > spaceBelow) nextSide = 'top'
        } else {
          if (floatingRect.height > spaceAbove && spaceBelow > spaceAbove) nextSide = 'bottom'
        }
      }

      if (nextSide !== resolvedSide) {
        setResolvedSide(nextSide)
        return
      }

      const rawX = align === 'end' ? anchorRect.right - floatingRect.width : anchorRect.left
      const rawY =
        resolvedSide === 'bottom'
          ? anchorRect.bottom + sideOffset
          : anchorRect.top - sideOffset - floatingRect.height

      const x = Math.min(Math.max(rawX, margin), window.innerWidth - margin - floatingRect.width)
      const y = Math.min(Math.max(rawY, margin), window.innerHeight - margin - floatingRect.height)

      setStyle({ left: x, top: y })
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [align, anchorRef, autoFlip, open, resolvedSide, sideOffset])

  React.useEffect(() => {
    if (!open) return
    if (typeof document === 'undefined') return

    const handler = (event: MouseEvent) => {
      const target = event.target as Node
      if (floatingRef.current?.contains(target)) return
      if (anchorRef.current?.contains(target)) return
      onDismiss?.()
    }

    document.addEventListener('mousedown', handler, true)
    return () => document.removeEventListener('mousedown', handler, true)
  }, [anchorRef, onDismiss, open])

  if (!open) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={floatingRef}
      className={twMerge(clsx('fixed z-50 min-w-[180px]'), className)}
      style={style}
    >
      <div className="rounded-2xl border border-slate-200 bg-surface text-sm shadow-lg">
        <div className="flex w-full min-w-0 items-center justify-between gap-2 rounded-t-2xl px-4 py-2 text-xs text-text-muted">
          <span className="min-w-0 truncate">{label}</span>
          <div className="flex shrink-0 items-center gap-2">
            {headerRight}
            <span className="text-[10px]">▲</span>
          </div>
        </div>
        <div className="pt-1">
          {options.map((option) => {
            const isSelected = option.value === selectedValue

            if (renderOption) {
              return (
                <div key={option.value} className="mx-1 my-0.5 rounded-xl">
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
    </div>,
    document.body
  )
}

MenuDropdownPortal.displayName = 'MenuDropdownPortal'
