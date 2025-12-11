import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type LucideIcon, Plus, X } from 'lucide-react'
import { Icon } from '../../atoms/Icon/Icon'
import { Tooltip, type TooltipProps } from '../Tooltip/Tooltip'

export interface SpeedDialActionItem {
  icon: LucideIcon
  label: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type SpeedDialPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right'

export interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: SpeedDialActionItem[]
  position?: SpeedDialPosition
  direction?: SpeedDialDirection
  icon?: LucideIcon
  openIcon?: LucideIcon
}

export const SpeedDial = React.forwardRef<HTMLDivElement, SpeedDialProps>(
  (
    {
      actions,
      position = 'bottom-right',
      direction = 'up',
      icon = Plus,
      openIcon = X,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const placementClasses: Record<SpeedDialPosition, string> = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'top-right': 'top-6 right-6',
      'top-left': 'top-6 left-6',
    }

    const tooltipPosition: TooltipProps['position'] =
      position === 'bottom-right' || position === 'top-right' ? 'left' : 'right'

    const handleToggle = () => {
      setOpen((prev) => !prev)
    }

    const handleActionClick =
      (actionOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        actionOnClick?.(event)
        setOpen(false)
      }

    const TriggerIcon = open ? openIcon : icon

    const stackDirectionClasses: Record<SpeedDialDirection, string> = {
      up: 'flex-col-reverse items-center',
      down: 'flex-col items-center',
      left: 'flex-row-reverse items-center',
      right: 'flex-row items-center',
    }

    const isVertical = direction === 'up' || direction === 'down'

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'fixed z-40 flex',
            stackDirectionClasses[direction],
            isVertical ? 'space-y-3' : 'space-x-3',
            placementClasses[position],
            className
          )
        )}
        {...props}
      >
        {open && (
          <div
            className={clsx(
              'flex',
              isVertical ? 'flex-col space-y-3' : 'flex-row space-x-3'
            )}
          >
            {actions.map((action, index) => (
              <Tooltip
                key={action.label + index}
                content={action.label}
                position={tooltipPosition}
              >
                {React.cloneElement(
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-surface shadow-lg ring-1 ring-slate-200 text-text-primary hover:bg-slate-50 transition-colors"
                  >
                    <Icon icon={action.icon} variant="default" size="md" />
                  </button>,
                  {
                    onClick: handleActionClick(action.onClick),
                  }
                )}
              </Tooltip>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={handleToggle}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-xl hover:bg-primary-600 active:bg-primary-700 transition-colors"
        >
          <TriggerIcon className="h-6 w-6" />
        </button>
      </div>
    )
  }
)

SpeedDial.displayName = 'SpeedDial'
