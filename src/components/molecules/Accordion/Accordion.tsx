// File: src/components/molecules/Accordion/Accordion.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface AccordionItem {
  id: string
  title: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: AccordionItem[]
  defaultOpenIds?: string[]
  multiple?: boolean
  onChange?: (openIds: string[]) => void
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, items, defaultOpenIds = [], multiple = false, onChange, ...props }, ref) => {
    const dispatch = useDispatchAction()
    const [openIds, setOpenIds] = React.useState<string[]>(defaultOpenIds)

    const toggleItem = (id: string, disabled?: boolean) => {
      if (disabled) return
      setOpenIds((prev) => {
        let next: string[]
        if (prev.includes(id)) {
          next = prev.filter((itemId) => itemId !== id)
        } else {
          next = multiple ? [...prev, id] : [id]
        }
        dispatch(EventType.UI_CLICK, { id, open: next.includes(id) }, { meta: { component: 'Accordion' } })
        onChange?.(next)
        return next
      })
    }

    return (
      <div
        ref={ref}
        className={twMerge(clsx('flex flex-col divide-y divide-slate-200 rounded-2xl bg-surface', className))}
        {...props}
      >
        {items.map((item) => {
          const isOpen = openIds.includes(item.id)
          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => toggleItem(item.id, item.disabled)}
                className={twMerge(
                  clsx(
                    'flex w-full items-center justify-between px-5 py-4 text-left transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    item.disabled && 'cursor-not-allowed opacity-50'
                  )
                )}
              >
                <span className="text-sm font-medium text-text-primary">{item.title}</span>
                <span className={twMerge(clsx('text-text-muted transition-transform', isOpen && 'rotate-180'))}>
                  ▼
                </span>
              </button>
              <div
                className={twMerge(
                  clsx(
                    'px-5 pb-4 text-sm text-text-secondary transition-all duration-200',
                    isOpen ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
                  )
                )}
              >
                {item.content}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'
