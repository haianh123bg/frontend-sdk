import * as React from 'react'
import { useScroll, useTransform, type MotionValue } from 'framer-motion'

export interface UseParallaxOptions {
  offset?: [number, number]
}

export const useParallax = (
  ref: React.RefObject<HTMLElement>,
  { offset = [-0.15, 0.15] }: UseParallaxOptions = {}
) => {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const translateY = useTransform(scrollYProgress, [0, 1], offset)

  return { translateY: translateY as MotionValue<number> }
}
