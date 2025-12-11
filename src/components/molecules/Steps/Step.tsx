import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Check } from 'lucide-react'

export type StepStatus = 'completed' | 'current' | 'waiting'

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
  title: string
  description?: string
  status?: StepStatus
  direction?: 'horizontal' | 'vertical'
  isLast?: boolean
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  (
    {
      className,
      index,
      title,
      description,
      status = 'waiting',
      direction = 'horizontal',
      isLast = false,
      ...props
    },
    ref
  ) => {
    const isCompleted = status === 'completed'
    const isCurrent = status === 'current'
    const isWaiting = status === 'waiting'

    return (
      <div
        ref={ref}
        className={clsx(
          'flex flex-1 group',
          direction === 'vertical' ? 'flex-row' : 'flex-col items-center text-center',
          className
        )}
        {...props}
      >
        <div className="relative flex items-center">
          <div
            className={twMerge(
              clsx(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors duration-300',
                isCompleted && 'border-primary-600 bg-primary-600 text-white',
                isCurrent && 'border-primary-600 bg-white text-primary-600',
                isWaiting && 'border-slate-300 bg-slate-50 text-slate-400'
              )
            )}
          >
            {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
          </div>

          {direction === 'vertical' && !isLast && (
            <div className="absolute left-4 top-8 h-full w-[2px] -translate-x-1/2 bg-slate-200" />
          )}
        </div>

        <div
          className={clsx('mt-2', direction === 'vertical' ? 'ml-4 mt-0 pb-8' : '')}
        >
          <div
            className={clsx(
              'text-sm font-medium',
              isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-500'
            )}
          >
            {title}
          </div>
          {description && (
            <div className="mt-0.5 text-xs text-slate-500">{description}</div>
          )}
        </div>

        {direction === 'horizontal' && !isLast && (
          <div className="hidden md:block h-[2px] flex-1 bg-slate-200 mx-4 mt-4 self-start" />
        )}
      </div>
    )
  }
)

Step.displayName = 'Step'
