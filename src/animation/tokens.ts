export const motionDurations = {
  instant: 0.12,
  fast: 0.24,
  normal: 0.36,
  slow: 0.55,
} as const

export const motionEasings = {
  standard: [0.2, 0.7, 0.4, 1] as const,
  emphasized: [0.4, 0, 0.2, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
} as const

export const motionSprings = {
  gentle: { type: 'spring', stiffness: 200, damping: 26 },
  snappy: { type: 'spring', stiffness: 320, damping: 25 },
  loose: { type: 'spring', stiffness: 140, damping: 20 },
} as const
