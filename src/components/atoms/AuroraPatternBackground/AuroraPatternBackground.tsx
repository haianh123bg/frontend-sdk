import * as React from 'react'
import { clsx } from 'clsx'

import './AuroraPatternBackground.css'

export interface AuroraPatternBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number | string
  rotate?: number | string
  inset?: number | string
  background?: string
  animate?: boolean
}

export const AuroraPatternBackground = React.forwardRef<HTMLDivElement, AuroraPatternBackgroundProps>(
  ({ className, style, duration, rotate, inset, background, animate = true, ...props }, ref) => {
    const mergedStyle: React.CSSProperties = {
      ...(style || {}),
      ...(duration !== undefined
        ? ({ ['--rai-aurora-duration' as any]: typeof duration === 'number' ? `${duration}s` : duration } as React.CSSProperties)
        : {}),
      ...(rotate !== undefined
        ? ({ ['--rai-aurora-rotate' as any]: typeof rotate === 'number' ? `${rotate}deg` : rotate } as React.CSSProperties)
        : {}),
      ...(inset !== undefined
        ? ({ ['--rai-aurora-inset' as any]: typeof inset === 'number' ? `${inset}%` : inset } as React.CSSProperties)
        : {}),
      ...(background !== undefined
        ? ({ ['--rai-aurora-bg' as any]: background } as React.CSSProperties)
        : {}),
    }

    return (
      <div
        ref={ref}
        className={clsx('rai-aurora-pattern-background', !animate && 'rai-aurora-pattern-background--no-animate', className)}
        style={mergedStyle}
        {...props}
      />
    )
  }
)

AuroraPatternBackground.displayName = 'AuroraPatternBackground'
