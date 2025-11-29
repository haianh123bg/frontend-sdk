import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'busy' | 'away'
  shape?: 'circle' | 'square'
}

function getInitials(name?: string) {
  if (!name) return ''
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, initials, size = 'md', status, shape = 'circle', ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false)

    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    }

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-lg',
    }

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-slate-400',
      busy: 'bg-red-500',
      away: 'bg-yellow-500',
    }

    // Calculate display content
    const showImage = src && !hasError
    const displayInitials = initials || getInitials(alt) || '?'

    return (
      <div className="relative inline-block">
        <div
          ref={ref}
          className={twMerge(
            clsx(
              'relative flex items-center justify-center overflow-hidden bg-slate-100 text-slate-600 font-medium uppercase',
              sizeClasses[size],
              shapeClasses[shape],
              className
            )
          )}
          {...props}
        >
          {showImage ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              onError={() => setHasError(true)}
            />
          ) : (
            <span>{displayInitials}</span>
          )}
        </div>
        {status && (
          <span
            className={clsx(
              'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
              statusColors[status],
              size === 'sm' ? 'h-2 w-2' : 'h-3 w-3'
            )}
          />
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className, max, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const total = childrenArray.length
    const visibleCount = max ? Math.min(max, total) : total
    const visibleChildren = childrenArray.slice(0, visibleCount)
    const remaining = total - visibleCount

    return (
      <div
        ref={ref}
        className={twMerge(clsx('flex -space-x-3 overflow-hidden p-1', className))}
        {...props}
      >
        {visibleChildren}
        {remaining > 0 && (
          <div
            className={clsx(
              'relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-medium text-slate-600 hover:bg-slate-200'
            )}
          >
            +{remaining}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'
