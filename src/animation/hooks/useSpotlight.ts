import * as React from 'react'
import { useMotionValue, useMotionTemplate } from 'framer-motion'

export const useSpotlight = () => {
  const x = useMotionValue('50%')
  const y = useMotionValue('50%')

  const update = React.useCallback((event: React.PointerEvent<HTMLDivElement> | null, target?: HTMLElement | null) => {
    const el = (event?.currentTarget || target) as HTMLElement | null
    if (!el) return
    const rect = el.getBoundingClientRect()
    const clientX = event ? event.clientX : rect.left + rect.width / 2
    const clientY = event ? event.clientY : rect.top + rect.height / 2
    const offsetX = ((clientX - rect.left) / rect.width) * 100
    const offsetY = ((clientY - rect.top) / rect.height) * 100
    x.set(`${offsetX}%`)
    y.set(`${offsetY}%`)
  }, [x, y])

  const handlePointerMove = React.useCallback<React.PointerEventHandler<HTMLDivElement>>(
    (event) => update(event),
    [update]
  )

  const handlePointerLeave = React.useCallback((target?: HTMLElement | null) => update(null, target), [update])

  const gradient = useMotionTemplate`radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.85), rgba(255,255,255,0))`

  return { gradient, handlePointerMove, handlePointerLeave }
}
