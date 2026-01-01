import * as React from 'react'
import { m, type MotionStyle, type HTMLMotionProps } from 'framer-motion'
import { clsx } from 'clsx'
import { useMagneticHover } from '../hooks/useMagneticHover'

export interface MagneticCardProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode
  strength?: number
}

export const MagneticCard = React.forwardRef<HTMLDivElement, MagneticCardProps>(
  ({ className, children, strength, style, ...rest }, ref) => {
    const { springX, springY, eventHandlers } = useMagneticHover({ strength })
    const motionStyle = React.useMemo<MotionStyle>(
      () => ({
        ...(style as MotionStyle | undefined),
        x: springX,
        y: springY,
      }),
      [style, springX, springY]
    )

    return (
      <m.div
        ref={ref}
        className={clsx(
          'group relative rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_25px_60px_rgba(249,115,22,0.12)] transition-colors hover:border-orange-200',
          className
        )}
        style={motionStyle}
        {...eventHandlers}
        {...rest}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-100/40 to-rose-100/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="relative z-10">{children as React.ReactNode}</div>
      </m.div>
    )
  }
)

MagneticCard.displayName = 'MagneticCard'
