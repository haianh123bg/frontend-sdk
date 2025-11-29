// File: src/components/atoms/Scroll/Scroll.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Ẩn thanh scrollbar nhưng vẫn cho phép scroll.
   */
  autoHide?: boolean
  /**
   * Hướng scroll chính.
   */
  direction?: 'vertical' | 'horizontal' | 'both'
}

export const Scroll = React.forwardRef<HTMLDivElement, ScrollProps>(
  ({ className, autoHide = false, direction = 'vertical', children, ...rest }, ref) => {
    const overflowClasses =
      direction === 'vertical'
        ? 'overflow-y-auto overflow-x-hidden'
        : direction === 'horizontal'
        ? 'overflow-x-auto overflow-y-hidden'
        : 'overflow-auto'

    const autoHideClasses = autoHide
      ? // Ẩn scrollbar trên các trình duyệt phổ biến, vẫn scroll được
        '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
      : ''

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
      if (direction !== 'horizontal') return
      if (!event.currentTarget) return

      // Dùng wheel dọc để scroll ngang
      if (event.deltaY === 0) return
      event.preventDefault()
      event.currentTarget.scrollLeft += event.deltaY
    }

    return (
      <div
        ref={ref}
        className={twMerge(clsx('relative', overflowClasses, autoHideClasses, className))}
        onWheel={handleWheel}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

Scroll.displayName = 'Scroll'
