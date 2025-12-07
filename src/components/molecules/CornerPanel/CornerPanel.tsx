// File: src/components/molecules/CornerPanel/CornerPanel.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface CornerPanelProps {
  /**
   * Bật/tắt panel. Khi false component sẽ không render gì.
   */
  open: boolean
  /**
   * Callback khi bấm nút đóng.
   */
  onClose?: () => void
  /**
   * Tiêu đề hiển thị phía trên nội dung.
   */
  title?: React.ReactNode
  /**
   * Nội dung panel, có thể là bất cứ ReactNode nào (form, button, v.v.).
   */
  children: React.ReactNode
  /**
   * Vị trí neo panel trong viewport.
   * Mặc định: bottom-right.
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: 'sm' | 'md' | 'lg'
  animation?: 'slide-in' | 'slide-up' | 'none'
  fullHeight?: boolean
  noBorder?: boolean
  className?: string
}

export const CornerPanel = React.forwardRef<HTMLDivElement, CornerPanelProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      position = 'bottom-right',
      size = 'md',
      animation = 'slide-in',
      fullHeight = true,
      noBorder = true,
      className,
    },
    ref
  ) => {
    if (!open) return null

    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    const positionClasses: Record<NonNullable<CornerPanelProps['position']>, string> = {
      'top-left': 'top-6 left-6',
      'top-right': 'top-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'bottom-right': 'bottom-6 right-6',
    }

    const sizeClasses: Record<NonNullable<CornerPanelProps['size']>, string> = {
      sm: 'max-w-xs',
      md: 'max-w-sm',
      lg: 'max-w-md',
    }

    const getAnimationClasses = (): string => {
      if (animation === 'none') {
        return 'opacity-100'
      }

      if (animation === 'slide-in') {
        if (!mounted) {
          if (position === 'top-right' || position === 'bottom-right') {
            return 'translate-x-4 opacity-0'
          }
          return '-translate-x-4 opacity-0'
        }
        return 'translate-x-0 opacity-100'
      }

      if (animation === 'slide-up') {
        if (!mounted) {
          if (position === 'bottom-left' || position === 'bottom-right') {
            return 'translate-y-4 opacity-0'
          }
          return '-translate-y-4 opacity-0'
        }
        return 'translate-y-0 opacity-100'
      }

      return 'opacity-100'
    }

    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div
          ref={ref}
          className={twMerge(
            clsx(
              'pointer-events-auto absolute',
              'w-full',
              'bg-surface shadow-xl',
              'p-4',
              'flex flex-col gap-3',
              'transition-transform transition-opacity duration-200',
              !noBorder && 'rounded-2xl border border-slate-200',
              noBorder && 'rounded-none border-none',
              fullHeight && 'h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto',
              sizeClasses[size],
              getAnimationClasses(),
              positionClasses[position],
              className
            )
          )}
        >
          {(title || onClose) && (
            <div className="flex items-start justify-between gap-2">
              {title && (
                <div className="text-sm font-semibold text-text-primary">{title}</div>
              )}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-1 text-slate-500 hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          )}
          <div className="text-sm text-text-secondary">{children}</div>
        </div>
      </div>
    )
  }
)

CornerPanel.displayName = 'CornerPanel'
