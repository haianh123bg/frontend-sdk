// File: src/components/atoms/Image/Image.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
  aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none'
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt = '', fallback, aspectRatio, objectFit = 'cover', onError, ...props }, ref) => {
    const [imgSrc, setImgSrc] = React.useState(src)
    const [hasError, setHasError] = React.useState(false)

    React.useEffect(() => {
      setImgSrc(src)
      setHasError(false)
    }, [src])

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (!hasError) {
        setHasError(true)
        if (fallback) {
          setImgSrc(fallback)
        }
      }
      onError?.(e)
    }

    const aspectRatioClasses = {
      '1/1': 'aspect-square',
      '16/9': 'aspect-video',
      '4/3': 'aspect-[4/3]',
      '3/2': 'aspect-[3/2]',
    }

    const objectFitClasses = {
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      none: 'object-none',
    }

    return (
      <img
        ref={ref}
        src={imgSrc}
        alt={alt}
        className={twMerge(
          clsx(
            'rounded-xl bg-slate-100',
            aspectRatio && aspectRatioClasses[aspectRatio],
            objectFitClasses[objectFit],
            className
          )
        )}
        onError={handleError}
        {...props}
      />
    )
  }
)

Image.displayName = 'Image'
