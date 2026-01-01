import { useMemo } from 'react'
import type { MotionProps, Transition } from 'framer-motion'
import { motionDurations, motionEasings } from '../tokens'

export interface FadeInOptions {
  offsetY?: number
  delay?: number
  duration?: keyof typeof motionDurations
}

export const useFadeIn = ({ offsetY = 12, delay = 0, duration = 'normal' }: FadeInOptions = {}) => {
  return useMemo<MotionProps>(() => {
    const transition: Transition = {
      duration: motionDurations[duration],
      ease: motionEasings.standard,
      delay,
    }

    return {
      initial: { opacity: 0, y: offsetY },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -offsetY / 2 },
      transition,
    }
  }, [offsetY, delay, duration])
}
