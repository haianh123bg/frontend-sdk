import type { Transition, Variants } from 'framer-motion'
import type { AnimationPreset } from './types'

const defaultTransition: Transition = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1],
}

export const animationPresets = {
  fade: {
    variants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    } satisfies Variants,
    transition: defaultTransition,
  } as AnimationPreset,
  fadeUp: {
    variants: {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 8 },
    } satisfies Variants,
    transition: defaultTransition,
  } as AnimationPreset,
  scale: {
    variants: {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
    } satisfies Variants,
    transition: defaultTransition,
  } as AnimationPreset,
  slideInRight: {
    variants: {
      initial: { opacity: 0, x: 16 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 16 },
    } satisfies Variants,
    transition: defaultTransition,
  } as AnimationPreset,
  slideUp: {
    variants: {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 16 },
    } satisfies Variants,
    transition: defaultTransition,
  } as AnimationPreset,
} as const

export type AnimationPresetName = keyof typeof animationPresets
