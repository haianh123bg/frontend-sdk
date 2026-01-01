import { useMemo } from 'react'
import type { Variants } from 'framer-motion'
import { motionDurations, motionEasings } from '../tokens'

export interface StaggerOptions {
  stagger?: number
  delayChildren?: number
  duration?: keyof typeof motionDurations
}

export const useStaggerChildren = ({
  stagger = 0.08,
  delayChildren = 0,
  duration = 'normal',
}: StaggerOptions = {}) => {
  return useMemo(() => {
    const container: Variants = {
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren,
        },
      },
    }

    const item: Variants = {
      hidden: { opacity: 0, y: 12 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: motionDurations[duration],
          ease: motionEasings.standard,
        },
      },
    }

    return { container, item }
  }, [stagger, delayChildren, duration])
}
