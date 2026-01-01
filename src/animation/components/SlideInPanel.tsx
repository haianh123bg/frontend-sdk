import * as React from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

export type SlideDirection = 'left' | 'right' | 'top' | 'bottom'

export interface SlideInPanelProps {
  open: boolean
  direction?: SlideDirection
  width?: number | string
  height?: number | string
  overlayOpacity?: number
  onClose?: () => void
  children?: React.ReactNode
  className?: string
}

const directionVariants: Record<SlideDirection, { hidden: any; visible: any }> = {
  left: {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  },
  right: {
    hidden: { x: '100%' },
    visible: { x: 0 },
  },
  top: {
    hidden: { y: '-100%' },
    visible: { y: 0 },
  },
  bottom: {
    hidden: { y: '100%' },
    visible: { y: 0 },
  },
}

export const SlideInPanel: React.FC<SlideInPanelProps> = ({
  open,
  direction = 'right',
  width = 420,
  height = '100%',
  overlayOpacity = 0.4,
  onClose,
  className,
  children,
}) => {
  const style: React.CSSProperties =
    direction === 'left' || direction === 'right'
      ? { width }
      : { height }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[60] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-slate-950"
            style={{ opacity: overlayOpacity }}
            onClick={onClose}
          />

          <m.div
            className={clsx(
              'relative ml-auto flex h-full flex-col overflow-hidden bg-white shadow-2xl',
              direction === 'left' && 'ml-0 mr-auto',
              direction === 'top' && 'mx-auto',
              direction === 'bottom' && 'mx-auto',
              className
            )}
            style={style}
            initial={directionVariants[direction].hidden}
            animate={directionVariants[direction].visible}
            exit={directionVariants[direction].hidden}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          >
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

SlideInPanel.displayName = 'SlideInPanel'
