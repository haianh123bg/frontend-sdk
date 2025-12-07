// File: src/components/molecules/SplitPane/SplitPane.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface SplitPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  initialRatio?: number // between 0 and 1
  minPrimary?: number
  minSecondary?: number
  onResize?: (ratio: number) => void
}

export const SplitPane = React.forwardRef<HTMLDivElement, SplitPaneProps>(
  (
    {
      className,
      direction = 'horizontal',
      initialRatio = 0.5,
      minPrimary = 120,
      minSecondary = 120,
      onResize,
      children,
      ...props
    },
    ref
  ) => {
    const dispatch = useDispatchAction()
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const [ratio, setRatio] = React.useState(initialRatio)

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    const handleMouseMove = React.useCallback(
      (event: MouseEvent) => {
        const container = containerRef.current
        if (!container) return
        const rect = container.getBoundingClientRect()
        let nextRatio = ratio
        if (direction === 'horizontal') {
          const x = event.clientX - rect.left
          nextRatio = Math.min(Math.max(x / rect.width, 0), 1)
          const primaryWidth = rect.width * nextRatio
          const secondaryWidth = rect.width * (1 - nextRatio)
          if (primaryWidth < minPrimary || secondaryWidth < minSecondary) return
        } else {
          const y = event.clientY - rect.top
          nextRatio = Math.min(Math.max(y / rect.height, 0), 1)
          const primaryHeight = rect.height * nextRatio
          const secondaryHeight = rect.height * (1 - nextRatio)
          if (primaryHeight < minPrimary || secondaryHeight < minSecondary) return
        }
        setRatio(nextRatio)
        onResize?.(nextRatio)
        dispatch(
          EventType.UI_CHANGE,
          { component: 'SplitPane', ratio: nextRatio },
          { meta: { component: 'SplitPane' } }
        )
      },
      [direction, minPrimary, minSecondary, onResize, ratio, dispatch]
    )

    const stopDragging = React.useCallback(() => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', stopDragging)
    }, [handleMouseMove])

    const startDragging = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', stopDragging)
    }

    const [primary, secondary] = React.Children.toArray(children)

    const isHorizontal = direction === 'horizontal'
    const primaryStyle = isHorizontal ? { width: `${ratio * 100}%` } : { height: `${ratio * 100}%` }
    const secondaryStyle = isHorizontal
      ? { width: `${(1 - ratio) * 100}%` }
      : { height: `${(1 - ratio) * 100}%` }

    return (
      <div
        ref={containerRef}
        className={twMerge(
          clsx(
            'flex overflow-hidden rounded-2xl border border-slate-200 bg-surface',
            isHorizontal ? 'flex-row' : 'flex-col',
            className
          )
        )}
        {...props}
      >
        <div className={clsx('flex-1 overflow-auto', !isHorizontal && 'w-full')} style={primaryStyle}>
          {primary}
        </div>
        <div
          role="separator"
          aria-orientation={direction}
          onMouseDown={startDragging}
          className={clsx(
            'flex items-center justify-center transition-colors',
            isHorizontal
              ? 'w-1 cursor-col-resize hover:bg-primary-100'
              : 'h-1 cursor-row-resize hover:bg-primary-100'
          )}
        >
          <span className="block rounded-full bg-slate-300" style={isHorizontal ? { width: 2, height: '70%' } : { height: 2, width: '70%' }} />
        </div>
        <div className={clsx('flex-1 overflow-auto', !isHorizontal && 'w-full')} style={secondaryStyle}>
          {secondary}
        </div>
      </div>
    )
  }
)

SplitPane.displayName = 'SplitPane'
