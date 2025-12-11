import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Check } from 'lucide-react'

export interface StepItem {
  title: string
  description?: string
}

type StepsBaseProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>

export type StepsVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface StepsProps extends StepsBaseProps {
  items: StepItem[]
  current: number
  onChange?: (current: number) => void
  direction?: 'horizontal' | 'vertical'
  variant?: StepsVariant
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    { className, items, current, onChange, direction = 'horizontal', variant = 'primary', ...props },
    ref
  ) => {
    const variantClasses: Record<NonNullable<StepsProps['variant']>, { completed: string; current: string }> = {
      primary: {
        completed: 'border-primary-600 bg-primary-600 text-white',
        current: 'border-primary-600 bg-white text-primary-600',
      },
      success: {
        completed: 'border-green-600 bg-green-600 text-white',
        current: 'border-green-600 bg-white text-green-600',
      },
      warning: {
        completed: 'border-amber-500 bg-amber-500 text-white',
        current: 'border-amber-500 bg-white text-amber-600',
      },
      danger: {
        completed: 'border-red-600 bg-red-600 text-white',
        current: 'border-red-600 bg-white text-red-600',
      },
      info: {
        completed: 'border-blue-600 bg-blue-600 text-white',
        current: 'border-blue-600 bg-white text-blue-600',
      },
    }

    const colors = variantClasses[variant]

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex w-full',
            direction === 'vertical' ? 'flex-col' : 'flex-row items-start space-x-4',
            className
          )
        )}
        {...props}
      >
        {items.map((item, index) => {
          const isCompleted = index < current
          const isCurrent = index === current
          const isWaiting = index > current

          return (
            <div
              key={index}
              className={clsx(
                'flex flex-1 group',
                direction === 'vertical' ? 'relative flex-row' : 'flex-col items-center text-center'
              )}
            >
              {direction === 'vertical' && index > 0 && (
                <div className="absolute left-4 top-0 bottom-1/2 w-[2px] -translate-x-1/2 bg-slate-200" />
              )}

              {direction === 'vertical' && index < items.length - 1 && (
                <div className="absolute left-4 top-1/2 bottom-0 w-[2px] -translate-x-1/2 bg-slate-200" />
              )}
              {/* Connector Line (Horizontal) */}
              {direction === 'horizontal' && index !== 0 && (
                <div
                  className={clsx(
                    'absolute top-5 left-[calc(-50%+20px)] right-[calc(50%+20px)] h-[2px] w-[calc(100%-40px)]',
                    // Complex connector logic omitted for simplicity, using simplified layout
                    'hidden' // Simplified for this basic implementation, full connector logic needs absolute positioning relative to container
                  )}
                />
              )}

              <div
                className={clsx(
                  'relative flex items-center',
                  direction === 'vertical' ? 'pb-8' : ''
                )}
              >
                <div
                  className={twMerge(
                    clsx(
                      'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors duration-300',
                      isCompleted && colors.completed,
                      isCurrent && !isCompleted && colors.current,
                      isWaiting && 'border-slate-300 bg-slate-50 text-slate-400'
                    )
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                
              </div>

              <div
                className={clsx(
                  'mt-2',
                  direction === 'vertical' ? 'ml-4 mt-0' : ''
                )}
              >
                <div
                  className={clsx(
                    'text-sm font-medium',
                    isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-500'
                  )}
                >
                  {item.title}
                </div>
                {item.description && (
                  <div className="mt-0.5 text-xs text-slate-500">{item.description}</div>
                )}
              </div>
              
              {/* Connector for Horizontal (Simulated with CSS Grid/Flex usually, but here using pseudo logic) */}
              {direction === 'horizontal' && index !== items.length - 1 && (
                  <div className={clsx(
                      "hidden md:block h-[2px] flex-1 bg-slate-200 mx-4 mt-4 self-start"
                  )}></div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)

Steps.displayName = 'Steps'
