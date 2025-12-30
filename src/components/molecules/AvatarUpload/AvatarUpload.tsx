import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { Icon } from '../../atoms/Icon/Icon'
import { ImageUp, RefreshCcw, X } from 'lucide-react'

export type AvatarUploadShape = 'circle' | 'square' | 'rect'
export type AvatarUploadSize = 'sm' | 'md' | 'lg'

export interface AvatarUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onBlur' | 'onChange'> {
  name?: string
  value?: File | string | null
  defaultValue?: File | string | null
  onValueChange?: (value: File | string | null) => void
  onChange?: (value: File | string | null) => void
  onBlur?: React.FocusEventHandler<HTMLButtonElement>
  disabled?: boolean
  accept?: string
  shape?: AvatarUploadShape
  size?: AvatarUploadSize
  alt?: string
  placeholder?: React.ReactNode
  allowClear?: boolean
  allowReplace?: boolean
}

export const AvatarUpload = React.forwardRef<HTMLDivElement, AvatarUploadProps>(
  (
    {
      className,
      name,
      value,
      defaultValue,
      onValueChange,
      onChange,
      disabled = false,
      accept = 'image/*',
      shape = 'circle',
      size = 'md',
      alt,
      placeholder,
      allowClear = true,
      allowReplace = true,
      onBlur,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<File | string | null>(defaultValue ?? null)
    const resolvedValue = isControlled ? (value ?? null) : internalValue

    const [objectUrl, setObjectUrl] = React.useState<string | null>(null)

    React.useEffect(() => {
      if (!(resolvedValue instanceof File)) {
        setObjectUrl(null)
        return
      }

      const url = URL.createObjectURL(resolvedValue)
      setObjectUrl(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    }, [resolvedValue])

    const src = typeof resolvedValue === 'string' ? resolvedValue : objectUrl

    const setNextValue = (next: File | string | null) => {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
      onChange?.(next)
    }

    const pick = () => {
      if (disabled) return
      inputRef.current?.click()
    }

    const clear = () => {
      if (disabled) return
      setNextValue(null)
      if (inputRef.current) inputRef.current.value = ''
    }

    const handleSelected = (files: FileList | null) => {
      if (!files || files.length === 0) return
      const f = files[0]
      if (!f) return
      setNextValue(f)
      if (inputRef.current) inputRef.current.value = ''
    }

    const hasValue = !!src

    const sizeClasses: Record<AvatarUploadSize, string> = {
      sm: 'h-16 w-16',
      md: 'h-24 w-24',
      lg: 'h-32 w-32',
    }

    const rectSizeClasses: Record<AvatarUploadSize, string> = {
      sm: 'h-20 w-full',
      md: 'h-28 w-full',
      lg: 'h-36 w-full',
    }

    const frameClassName = twMerge(
      clsx(
        'relative flex items-center justify-center overflow-hidden bg-slate-100 text-sm font-medium text-slate-600 ring-1 ring-slate-200',
        shape === 'circle' && 'rounded-full',
        shape !== 'circle' && 'rounded-2xl',
        shape === 'rect' ? rectSizeClasses[size] : sizeClasses[size],
        !disabled && 'cursor-pointer',
        disabled && 'opacity-60'
      )
    )

    const resolvedPlaceholder =
      placeholder ?? (
        <Icon icon={ImageUp} size={size === 'sm' ? 'lg' : size === 'md' ? 'xl' : '2xl'} variant="muted" />
      )

    return (
      <div ref={ref} className={twMerge(clsx('relative inline-block', shape === 'rect' && 'w-full', className))} {...props}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleSelected(e.target.files)}
          disabled={disabled}
        />

        <button
          type="button"
          id={name}
          name={name}
          onClick={pick}
          onBlur={onBlur}
          disabled={disabled}
          className={frameClassName}
          aria-label={hasValue ? 'Replace image' : 'Upload image'}
        >
          {src ? (
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          ) : (
            <div className="flex items-center justify-center px-3 text-center">
              {typeof resolvedPlaceholder === 'string' ? (
                <span className="text-text-muted">{resolvedPlaceholder}</span>
              ) : (
                resolvedPlaceholder
              )}
            </div>
          )}
        </button>

        {(allowReplace || allowClear) && hasValue && !disabled && (
          <div className="absolute right-2 top-2 flex gap-1">
            {allowReplace && (
              <IconButton
                icon={RefreshCcw}
                size="xs"
                variant="muted"
                disableHover
                className="bg-white/90 ring-1 ring-slate-200 hover:bg-white"
                aria-label="Replace"
                onClick={(e) => {
                  e.stopPropagation()
                  pick()
                }}
              />
            )}
            {allowClear && (
              <IconButton
                icon={X}
                size="xs"
                variant="muted"
                disableHover
                className="bg-white/90 ring-1 ring-slate-200 hover:bg-white"
                aria-label="Remove"
                onClick={(e) => {
                  e.stopPropagation()
                  clear()
                }}
              />
            )}
          </div>
        )}
      </div>
    )
  }
)

AvatarUpload.displayName = 'AvatarUpload'
