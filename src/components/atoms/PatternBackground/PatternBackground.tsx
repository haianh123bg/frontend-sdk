import * as React from 'react'
import { clsx } from 'clsx'

import './PatternBackground.css'

export type PatternBackgroundVariant =
  | 'checker'
  | 'dots'
  | 'grid'
  | 'diagonal-stripes'
  | 'crosshatch'
  | 'conic'
  | 'rings'
  | 'image'
  | 'image-scroll'
  | 'image-follow-scroll'

export interface PatternBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PatternBackgroundVariant
  color1?: string
  color2?: string
  size?: number | string
  offset?: number | string
  dotSize?: number | string
  lineSize?: number | string
  stripeSize?: number | string
  conicStep?: number | string
  image?: string
  imageUrl?: string
  imageSize?: number | string
  imageRepeat?: React.CSSProperties['backgroundRepeat']
  imagePosition?: React.CSSProperties['backgroundPosition']
  scrollDuration?: number | string
  scrollX?: number | string
  scrollY?: number | string
  animate?: boolean
  scrollContainerRef?: React.RefObject<HTMLElement | null>
  followFactor?: number
  followFactorX?: number
  followFactorY?: number
}

export const PatternBackground = React.forwardRef<HTMLDivElement, PatternBackgroundProps>(
  ({
    className,
    style,
    variant = 'checker',
    color1,
    color2,
    size,
    offset,
    dotSize,
    lineSize,
    stripeSize,
    conicStep,
    image,
    imageUrl,
    imageSize,
    imageRepeat,
    imagePosition,
    scrollDuration,
    scrollX,
    scrollY,
    animate = true,
    scrollContainerRef,
    followFactor = 0.3,
    followFactorX,
    followFactorY,
    ...props
  }, ref) => {
    const localRef = React.useRef<HTMLDivElement | null>(null)

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      },
      [ref]
    )

    const resolvedImage = image ?? (imageUrl ? `url(${JSON.stringify(imageUrl)})` : undefined)
    const resolvedFollowFactorX = followFactorX ?? followFactor
    const resolvedFollowFactorY = followFactorY ?? followFactor

    const mergedStyle: React.CSSProperties = {
      ...(style || {}),
      ...(color1 !== undefined ? ({ ['--rai-pattern-color1' as any]: color1 } as React.CSSProperties) : {}),
      ...(color2 !== undefined ? ({ ['--rai-pattern-color2' as any]: color2 } as React.CSSProperties) : {}),
      ...(size !== undefined
        ? ({ ['--rai-pattern-size' as any]: typeof size === 'number' ? `${size}px` : size } as React.CSSProperties)
        : {}),
      ...(offset !== undefined
        ? ({ ['--rai-pattern-offset' as any]: typeof offset === 'number' ? `${offset}px` : offset } as React.CSSProperties)
        : {}),
      ...(dotSize !== undefined
        ? ({ ['--rai-pattern-dot-size' as any]: typeof dotSize === 'number' ? `${dotSize}px` : dotSize } as React.CSSProperties)
        : {}),
      ...(lineSize !== undefined
        ? ({ ['--rai-pattern-line-size' as any]: typeof lineSize === 'number' ? `${lineSize}px` : lineSize } as React.CSSProperties)
        : {}),
      ...(stripeSize !== undefined
        ? ({ ['--rai-pattern-stripe-size' as any]: typeof stripeSize === 'number' ? `${stripeSize}px` : stripeSize } as React.CSSProperties)
        : {}),
      ...(conicStep !== undefined
        ? ({ ['--rai-pattern-conic-step' as any]: typeof conicStep === 'number' ? `${conicStep}deg` : conicStep } as React.CSSProperties)
        : {}),
      ...(resolvedImage !== undefined ? ({ ['--rai-pattern-image' as any]: resolvedImage } as React.CSSProperties) : {}),
      ...(imageSize !== undefined
        ? ({ ['--rai-pattern-image-size' as any]: typeof imageSize === 'number' ? `${imageSize}px` : imageSize } as React.CSSProperties)
        : {}),
      ...(imageRepeat !== undefined ? ({ ['--rai-pattern-image-repeat' as any]: imageRepeat } as React.CSSProperties) : {}),
      ...(imagePosition !== undefined ? ({ ['--rai-pattern-image-position' as any]: imagePosition } as React.CSSProperties) : {}),
      ...(scrollDuration !== undefined
        ? ({ ['--rai-pattern-scroll-duration' as any]: typeof scrollDuration === 'number' ? `${scrollDuration}s` : scrollDuration } as React.CSSProperties)
        : {}),
      ...(scrollX !== undefined
        ? ({ ['--rai-pattern-scroll-x' as any]: typeof scrollX === 'number' ? `${scrollX}px` : scrollX } as React.CSSProperties)
        : {}),
      ...(scrollY !== undefined
        ? ({ ['--rai-pattern-scroll-y' as any]: typeof scrollY === 'number' ? `${scrollY}px` : scrollY } as React.CSSProperties)
        : {}),
    }

    React.useEffect(() => {
      if (variant !== 'image-follow-scroll') return
      if (!animate) return

      const el = localRef.current
      if (!el) return

      const scrollEl = scrollContainerRef?.current
      const target: Window | HTMLElement = scrollEl ?? window

      let raf = 0 as number | 0

      const update = () => {
        const baseX = scrollEl ? scrollEl.scrollLeft : window.scrollX
        const baseY = scrollEl ? scrollEl.scrollTop : window.scrollY

        const x = baseX * resolvedFollowFactorX
        const y = baseY * resolvedFollowFactorY

        el.style.setProperty('--rai-pattern-follow-x', `${x}px`)
        el.style.setProperty('--rai-pattern-follow-y', `${y}px`)
      }

      const onScroll = () => {
        if (raf) return
        raf = requestAnimationFrame(() => {
          raf = 0
          update()
        })
      }

      update()
      target.addEventListener('scroll', onScroll, { passive: true } as any)

      return () => {
        target.removeEventListener('scroll', onScroll as any)
        if (raf) cancelAnimationFrame(raf)
      }
    }, [animate, resolvedFollowFactorX, resolvedFollowFactorY, scrollContainerRef, variant])

    return (
      <div
        ref={setRefs}
        className={clsx(
          'rai-pattern-background',
          `rai-pattern-background--${variant}`,
          !animate && 'rai-pattern-background--no-animate',
          className
        )}
        style={mergedStyle}
        {...props}
      />
    )
  }
)

PatternBackground.displayName = 'PatternBackground'
