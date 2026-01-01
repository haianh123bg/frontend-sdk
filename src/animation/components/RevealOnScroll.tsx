import * as React from 'react'
import { m, useInView, type HTMLMotionProps } from 'framer-motion'
import { motionDurations, motionEasings } from '../tokens'
import { clsx } from 'clsx'

export interface RevealOnScrollProps extends HTMLMotionProps<'div'> {
  once?: boolean
  amount?: 'some' | 'all' | number
  offsetY?: number
  delay?: number
  duration?: keyof typeof motionDurations
}

export const RevealOnScroll = React.forwardRef<HTMLDivElement, RevealOnScrollProps>(
  (
    {
      once = true,
      amount = 'some',
      offsetY = 16,
      delay = 0,
      duration = 'normal',
      className,
      children,
      ...rest
    },
    forwardedRef
  ) => {
    const localRef = React.useRef<HTMLDivElement | null>(null)
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node
        if (typeof forwardedRef === 'function') forwardedRef(node)
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      },
      [forwardedRef]
    )

    const inView = useInView(localRef, { once, amount })

    return (
      <m.div
        ref={mergedRef}
        className={clsx('will-change-transform', className)}
        initial={{ opacity: 0, y: offsetY }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: offsetY }}
        transition={{
          duration: motionDurations[duration],
          ease: motionEasings.standard,
          delay,
        }}
        {...rest}
      >
        {children}
      </m.div>
    )
  }
)

RevealOnScroll.displayName = 'RevealOnScroll'
