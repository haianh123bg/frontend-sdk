// File: src/components/molecules/SplitPane/SplitPane.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
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
    const [containerSize, setContainerSize] = React.useState(0)

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    React.useLayoutEffect(() => {
      const el = containerRef.current
      if (!el) return

      const updateSize = () => {
        const rect = el.getBoundingClientRect()
        setContainerSize(direction === 'horizontal' ? rect.width : rect.height)
      }

      updateSize()

      if (typeof ResizeObserver === 'undefined') {
        window.addEventListener('resize', updateSize)
        return () => {
          window.removeEventListener('resize', updateSize)
        }
      }

      const ro = new ResizeObserver(() => updateSize())
      ro.observe(el)

      return () => {
        ro.disconnect()
      }
    }, [direction])

    const [primary, secondary] = React.Children.toArray(children)

    const isHorizontal = direction === 'horizontal'

    const normalizedRatio = Math.min(Math.max(initialRatio, 0), 1)
    const primaryDefaultSize = normalizedRatio * 100

    let minPrimaryPct = containerSize > 0 ? (minPrimary / containerSize) * 100 : 0
    let minSecondaryPct = containerSize > 0 ? (minSecondary / containerSize) * 100 : 0
    minPrimaryPct = Math.min(Math.max(minPrimaryPct, 0), 100)
    minSecondaryPct = Math.min(Math.max(minSecondaryPct, 0), 100)
    if (minPrimaryPct + minSecondaryPct > 100) {
      minPrimaryPct = 0
      minSecondaryPct = 0
    }

    const handleLayout = React.useCallback(
      (sizes: number[]) => {
        const nextRatio = (sizes?.[0] ?? primaryDefaultSize) / 100
        onResize?.(nextRatio)
        dispatch(
          EventType.UI_CHANGE,
          { component: 'SplitPane', ratio: nextRatio },
          { meta: { component: 'SplitPane' } }
        )
      },
      [dispatch, onResize, primaryDefaultSize]
    )

    return (
      <div
        ref={containerRef}
        className={twMerge(
          clsx(
            'overflow-hidden rounded-2xl bg-surface',
            className
          )
        )}
        {...props}
      >
        <PanelGroup
          direction={direction}
          className={clsx('flex h-full w-full', isHorizontal ? 'flex-row' : 'flex-col')}
          onLayout={handleLayout}
        >
          <Panel defaultSize={primaryDefaultSize} minSize={minPrimaryPct}>
            <div className={clsx('h-full w-full overflow-hidden', !isHorizontal && 'w-full')}>{primary}</div>
          </Panel>
          <PanelResizeHandle
            className={clsx(
              'flex items-center justify-center transition-colors',
              isHorizontal
                ? 'w-1 cursor-col-resize hover:bg-primary-100'
                : 'h-1 cursor-row-resize hover:bg-primary-100'
            )}
          >
            <span
              className="block rounded-full bg-slate-300"
              style={isHorizontal ? { width: 2, height: '70%' } : { height: 2, width: '70%' }}
            />
          </PanelResizeHandle>
          <Panel defaultSize={100 - primaryDefaultSize} minSize={minSecondaryPct}>
            <div className={clsx('h-full w-full overflow-hidden', !isHorizontal && 'w-full')}>{secondary}</div>
          </Panel>
        </PanelGroup>
      </div>
    )
  }
)

SplitPane.displayName = 'SplitPane'
