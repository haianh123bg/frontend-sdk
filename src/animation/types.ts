import type { Transition, Variants } from 'framer-motion'

export interface AnimationPreset {
  variants: Variants
  transition?: Transition
  className?: string
}

export type TransitionPhase = 'initial' | 'animate' | 'exit'
