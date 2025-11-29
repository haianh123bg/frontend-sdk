// File: src/components/atoms/Switch/Switch.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import { Icon } from '../Icon/Icon'
import { type LucideIcon } from 'lucide-react'

type SwitchVariant = 'primary' | 'success' | 'warning' | 'danger'
type SwitchSize = 'sm' | 'md' | 'lg'

const sizeStyles: Record<
  SwitchSize,
  {
    track: string
    knob: string
    solidKnob: string
    translateDefault: number
    translateSolid: number
  }
> = {
  sm: {
    track: 'h-6 w-12',
    knob: 'h-5 w-5 left-0.5 top-0.5',
    solidKnob: 'h-6 w-6 left-0 top-0',
    translateDefault: 24,
    translateSolid: 24,
  },
  md: {
    track: 'h-8 w-14',
    knob: 'h-6 w-6 left-1 top-1',
    solidKnob: 'h-8 w-8 left-0 top-0',
    translateDefault: 24,
    translateSolid: 24,
  },
  lg: {
    track: 'h-10 w-18',
    knob: 'h-8 w-8 left-1.5 top-1.5',
    solidKnob: 'h-10 w-10 left-0 top-0',
    translateDefault: 28,
    translateSolid: 32,
  },
}

const variantClasses: Record<SwitchVariant, string> = {
  primary: 'bg-primary-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
}

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  variant?: SwitchVariant
  size?: SwitchSize
  innerIcon?: LucideIcon
  innerStyle?: 'default' | 'solid'
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({
    className,
    checked,
    defaultChecked = false,
    disabled,
    onChange,
    label,
    variant = 'primary',
    size = 'md',
    innerIcon,
    innerStyle = 'default',
    ...props
  },
  ref) => {
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

    const currentSize = sizeStyles[size]
    return (
      <div className={clsx('inline-flex items-center gap-3', className)}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isOn}
          disabled={disabled}
          onClick={toggle}
          className={clsx(
            'relative rounded-full transition-colors duration-200',
            currentSize.track,
            isOn ? variantClasses[variant] : 'bg-slate-300',
            disabled && 'opacity-60 cursor-not-allowed'
          )}
          {...props}
        >
          <span
            className={clsx(
              'absolute rounded-full bg-white shadow-sm transition-transform duration-200 flex items-center justify-center overflow-hidden',
              innerStyle === 'solid' ? currentSize.solidKnob : currentSize.knob
            )}
            style={{
              transform: `translateX(${isOn ? (innerStyle === 'solid' ? currentSize.translateSolid : currentSize.translateDefault) : 0}px)`,
            }}
          >
            {innerIcon && <Icon icon={innerIcon} size="xs" variant="default" />}
          </span>
        </button>
        {label && <span className="text-sm font-medium text-text">{label}</span>}
      </div>
    )
  }
)

Switch.displayName = 'Switch'
