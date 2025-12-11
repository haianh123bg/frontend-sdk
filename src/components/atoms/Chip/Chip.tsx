import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { X } from 'lucide-react'

export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
export type ChipSize = 'sm' | 'md' | 'lg'

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant
  size?: ChipSize
  label?: React.ReactNode
  /** Icon nằm bên trái nội dung. */
  startIcon?: React.ReactNode
  /** Icon nằm bên phải nội dung (trước nút xoá). */
  endIcon?: React.ReactNode
  /** Sự kiện xoá chip. */
  onDelete?: (e: React.MouseEvent) => void
  disabled?: boolean
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    { label, startIcon, endIcon, onDelete, children, className, variant = 'outline', size = 'sm', disabled, ...rest },
    ref
  ) => {
    const variants: Record<ChipVariant, string> = {
      // Chip trung tính
      default:
        'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-800',
      // Active filter: nền xanh nhạt, text đồng điệu và đậm hơn nền
      primary:
        'bg-primary-100 text-primary-700 hover:bg-primary-150 hover:text-primary-800',
      // Trạng thái success / warning / danger / info: hover sáng hơn một tone, text đậm hơn nền
      success:
        'bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800',
      warning:
        'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800',
      danger:
        'bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800',
      info:
        'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800',
      // Inactive filter hoặc chip "ghost": nền trong suốt, text xám; hover nền xám rất nhẹ và text đậm hơn một chút
      outline:
        'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-700',
    }

    const sizes: Record<ChipSize, string> = {
      sm: 'px-3 py-1 text-xs gap-1',
      md: 'px-3.5 py-1.5 text-sm gap-1.5',
      lg: 'px-4 py-2 text-base gap-2',
    }

    const renderIcon = (icon?: React.ReactNode) => {
      if (!icon) return null
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon as React.ReactElement, {
          className: twMerge((icon as React.ReactElement).props.className, 'text-current'),
        })
      }
      return icon
    }

    return (
      <span
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center rounded-full font-medium transition-colors cursor-pointer select-none',
            disabled && 'opacity-50 pointer-events-none',
            variants[variant],
            sizes[size],
            className
          )
        )}
        {...rest}
      >
        {startIcon && (
          <span className="mr-1 flex items-center">
            {renderIcon(startIcon)}
          </span>
        )}
        {label ?? children}
        {endIcon && (
          <span className="ml-1 flex items-center">
            {renderIcon(endIcon)}
          </span>
        )}
        {onDelete && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(e)
            }}
            className="ml-1 rounded-full p-0.5 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-1"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    )
  }
)

Chip.displayName = 'Chip'
