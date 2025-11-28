// File: src/components/atoms/Switch/Switch.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  label?: string
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, defaultChecked = false, disabled, onChange, label, ...props }, ref) => {
    const dispatch = useDispatchAction()
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const isControlled = checked !== undefined
    const isOn = isControlled ? checked : internalChecked

    const toggle = () => {
      if (disabled) return
      const next = !isOn
      if (!isControlled) {
        setInternalChecked(next)
      }
      dispatch(EventType.UI_CLICK, { value: next }, { meta: { component: 'Switch' } })
      onChange?.(next)
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        onClick={toggle}
        className={twMerge(
          clsx(
            'inline-flex items-center rounded-full px-1 py-1 transition-all',
            isOn ? 'bg-primary-500' : 'bg-slate-300',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )
        )}
        {...props}
      >
        <span
          className={twMerge(
            clsx(
              'h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
              isOn ? 'translate-x-4' : 'translate-x-0'
            )
          )}
        />
        {label && <span className="ml-3 text-sm text-text-primary">{label}</span>}
      </button>
    )
  }
)

Switch.displayName = 'Switch'
