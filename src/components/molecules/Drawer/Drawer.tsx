// File: src/components/molecules/Drawer/Drawer.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  side?: 'left' | 'right'
  width?: number | string
  children: React.ReactNode
  className?: string
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ open, onClose, title, side = 'right', width = 420, children, className }, ref) => {
    const dispatch = useDispatchAction()

    React.useEffect(() => {
      if (!open) return
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          dispatch(EventType.UI_CLICK, { component: 'Drawer', action: 'escape' }, { meta: { component: 'Drawer' } })
          onClose()
        }
      }
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }, [open, onClose, dispatch])

    React.useEffect(() => {
      document.body.style.overflow = open ? 'hidden' : ''
      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    if (!open) return null

    const slideClass = side === 'right' ? 'translate-x-0' : '-translate-x-0'

    return (
      <div className="fixed inset-0 z-50 flex">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div
          ref={ref}
          className={twMerge(
            clsx(
              'relative ml-auto flex h-full max-h-screen flex-col bg-surface shadow-xl transition-transform',
              side === 'left' && 'ml-0 mr-auto',
              slideClass,
              className
            )
          )}
          style={{ width }}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-text-muted hover:bg-slate-100"
                aria-label="Close Drawer"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        </div>
      </div>
    )
  }
)

Drawer.displayName = 'Drawer'
