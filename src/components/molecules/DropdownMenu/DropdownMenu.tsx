import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownContext = React.createContext<DropdownContextValue | undefined>(undefined)

export const useDropdown = () => {
  const context = React.useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownMenu')
  }
  return context
}

export interface DropdownMenuProps {
  children: React.ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  defaultOpen = false,
  onOpenChange,
}) => {
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
    <DropdownContext.Provider value={{ open, setOpen: handleOpenChange }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export interface DropdownTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

export const DropdownTrigger = React.forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { setOpen, open } = useDropdown()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e)
      setOpen(!open)
    }

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={twMerge(clsx('cursor-pointer inline-flex', className))}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DropdownTrigger.displayName = 'DropdownTrigger'

export interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'right'
}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, className, align = 'left', ...props }, ref) => {
    const { open } = useDropdown()

    if (!open) return null

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md animate-in fade-in-0 zoom-in-95',
            align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right',
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
DropdownContent.displayName = 'DropdownContent'

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  danger?: boolean
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, className, disabled, danger, onClick, ...props }, ref) => {
    const { setOpen } = useDropdown()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      setOpen(false)
    }

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={twMerge(
          clsx(
            'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
            'hover:bg-slate-100 hover:text-slate-900',
            disabled && 'pointer-events-none opacity-50',
            danger && 'text-red-600 hover:bg-red-50 hover:text-red-700',
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
DropdownItem.displayName = 'DropdownItem'
