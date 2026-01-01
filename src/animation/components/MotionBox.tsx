import * as React from 'react'
import type { HTMLMotionProps } from 'framer-motion'
import { m } from 'framer-motion'

export type MotionBoxProps = HTMLMotionProps<'div'>

export const MotionBox = React.forwardRef<HTMLDivElement, MotionBoxProps>(({ children, ...props }, ref) => {
  return (
    <m.div ref={ref} {...props}>
      {children}
    </m.div>
  )
})

MotionBox.displayName = 'MotionBox'
