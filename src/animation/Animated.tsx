import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { animationPresets, type AnimationPresetName } from './presets'

export interface AnimatedProps extends HTMLMotionProps<'div'> {
  preset?: AnimationPresetName
}

export const Animated = React.forwardRef<HTMLDivElement, AnimatedProps>(
  ({ preset = 'fade', className, transition, variants, ...props }, ref) => {
    const presetConfig = animationPresets[preset]

    return (
      <motion.div
        ref={ref}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants ?? presetConfig.variants}
        transition={transition ?? presetConfig.transition}
        className={twMerge(clsx(presetConfig.className, className))}
        {...props}
      />
    )
  }
)

Animated.displayName = 'Animated'
