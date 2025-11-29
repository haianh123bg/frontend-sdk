import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  description?: React.ReactNode
  closable?: boolean
  onClose?: () => void
  icon?: boolean
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, description, closable, onClose, icon = true, children, ...props }, ref) => {
    const [visible, setVisible] = React.useState(true)

    if (!visible) return null

    const variants = {
      info: 'bg-blue-50 text-blue-800 border-blue-200',
      success: 'bg-green-50 text-green-800 border-green-200',
      warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      error: 'bg-red-50 text-red-800 border-red-200',
    }

    const icons = {
      info: Info,
      success: CheckCircle2,
      warning: AlertTriangle,
      error: AlertCircle,
    }

    const IconComponent = icons[variant]

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation()
      setVisible(false)
      onClose?.()
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'relative flex w-full items-start rounded-lg border p-4 text-sm',
            variants[variant],
            className
          )
        )}
        role="alert"
        {...props}
      >
        {icon && (
          <div className="mr-3 mt-0.5 flex-shrink-0">
            <IconComponent className="h-5 w-5" />
          </div>
        )}
        <div className="flex-1">
          {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
          <div className="opacity-90">{description || children}</div>
        </div>
        {closable && (
          <button
            onClick={handleClose}
            className={clsx(
              'ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 focus:ring-2 focus:ring-offset-2 opacity-70 hover:opacity-100 transition-opacity',
              variant === 'info' && 'text-blue-600 hover:bg-blue-100 focus:ring-blue-400',
              variant === 'success' && 'text-green-600 hover:bg-green-100 focus:ring-green-400',
              variant === 'warning' && 'text-yellow-600 hover:bg-yellow-100 focus:ring-yellow-400',
              variant === 'error' && 'text-red-600 hover:bg-red-100 focus:ring-red-400'
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'
