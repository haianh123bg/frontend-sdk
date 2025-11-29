// File: src/components/molecules/Popover/Popover.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const PopoverContext = React.createContext<PopoverContextValue | undefined>(undefined)

export const usePopover = () => {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error('usePopover must be used within a Popover')
  }
  return context
}

export interface PopoverProps {
  children: React.ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Popover: React.FC<PopoverProps> = ({ children, defaultOpen = false, onOpenChange }) => {
  const [open, setOpen] = React.useState(defaultOpen)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleOpenChange(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <PopoverContext.Provider value={{ open, setOpen: handleOpenChange }}>
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PopoverTrigger = React.forwardRef<HTMLDivElement, PopoverTriggerProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { setOpen, open } = usePopover()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e)
      setOpen(!open)
    }

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={twMerge(clsx('inline-flex cursor-pointer', className))}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverTrigger.displayName = 'PopoverTrigger'

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, align = 'center', side = 'bottom', ...props }, ref) => {
    const { open } = usePopover()

    if (!open) return null

    const sideClasses: Record<string, string> = {
      top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
      bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
      left: 'right-full mr-2 top-1/2 -translate-y-1/2',
      right: 'left-full ml-2 top-1/2 -translate-y-1/2',
    }

    const alignClasses: Record<string, string> = {
      start: side === 'top' || side === 'bottom' ? 'left-0 translate-x-0' : 'top-0 translate-y-0',
      center: '',
      end: side === 'top' || side === 'bottom' ? 'right-0 translate-x-0' : 'bottom-0 translate-y-0',
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'absolute z-50 min-w-[12rem] rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 shadow-md',
            'animate-in fade-in-0 zoom-in-95',
            sideClasses[side],
            alignClasses[align],
            className
          )
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverContent.displayName = 'PopoverContent'
