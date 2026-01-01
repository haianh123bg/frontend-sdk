import * as React from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'

export interface MotionProviderProps {
  children: React.ReactNode
  /**
   * Custom feature bundle cho LazyMotion. Dùng domAnimation mặc định để giữ bundle size nhỏ nhất.
   * Có thể truyền domMax (layout animation) khi cần.
   */
  features?: Parameters<typeof LazyMotion>[0]['features']
  strict?: boolean
}

export const MotionProvider: React.FC<MotionProviderProps> = ({
  children,
  features = domAnimation,
  strict,
}) => {
  return (
    <LazyMotion features={features} strict={strict}>
      {children}
    </LazyMotion>
  )
}
