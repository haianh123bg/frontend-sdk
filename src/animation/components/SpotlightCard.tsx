import * as React from 'react'
import { m, type HTMLMotionProps } from 'framer-motion'
import { clsx } from 'clsx'
import { useSpotlight } from '../hooks/useSpotlight'

export interface SpotlightCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ className, children, style, ...rest }, forwardedRef) => {
    const localRef = React.useRef<HTMLDivElement | null>(null)

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node
        if (!forwardedRef) return
        if (typeof forwardedRef === 'function') forwardedRef(node)
        else forwardedRef.current = node
      },
      [forwardedRef]
    )

    const { gradient, handlePointerMove, handlePointerLeave } = useSpotlight()

    return (
      <m.div
        ref={setRefs}
        className={clsx(
          'group relative overflow-hidden rounded-3xl border border-amber-100 bg-white/80 p-6 shadow-[0_25px_50px_rgba(0,0,0,0.08)] backdrop-blur-lg',
          className
        )}
        style={style}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => handlePointerLeave(localRef.current)}
        {...rest}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ backgroundImage: gradient.get() }}
        />
        <div className="relative z-10 text-slate-900">{children}</div>
      </m.div>
    )
  }
)

SpotlightCard.displayName = 'SpotlightCard'
