import * as React from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export interface MagneticHoverOptions {
  strength?: number
  spring?: Parameters<typeof useSpring>[1]
}

export const useMagneticHover = ({ strength = 0.25, spring }: MagneticHoverOptions = {}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = spring ?? { stiffness: 300, damping: 20, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handlePointerMove = React.useCallback<React.PointerEventHandler<HTMLDivElement>>(
    (event) => {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
      const offsetX = event.clientX - (rect.left + rect.width / 2)
      const offsetY = event.clientY - (rect.top + rect.height / 2)
      x.set(offsetX * strength)
      y.set(offsetY * strength)
    },
    [strength, x, y]
  )

  const reset = React.useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return {
    springX,
    springY,
    eventHandlers: {
      onPointerMove: handlePointerMove,
      onPointerLeave: reset,
    } as const,
  }
}
