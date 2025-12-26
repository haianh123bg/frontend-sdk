// File: src/components/molecules/Modal/Modal.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, children, size = 'md', className }, ref) => {
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
      return () => {
        document.body.style.overflow = 'unset'
      }
    }, [open])

    if (!open) return null

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    }

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-1"
        onClick={onClose}
      >
        <div
          ref={ref}
          className={twMerge(
            clsx(
              'relative w-full rounded-2xl bg-surface',
              'max-h-[90vh] overflow-hidden',
              'flex flex-col',
              sizeClasses[size],
              className
            )
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="flex items-center justify-between p-4 pb-4">
              <h3 className="text-xl font-bold text-text-primary">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <div className={twMerge(clsx('min-h-0 flex-1 overflow-y-auto p-6', title && 'pt-0'))}>{children}</div>
        </div>
      </div>
    )
  }
)

Modal.displayName = 'Modal'
