// File: src/components/molecules/ImageList/ImageList.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Grid } from '../../atoms/Grid/Grid'
import { Image, type ImageProps } from '../../atoms/Image/Image'

export interface ImageListItem {
  id?: string
  src: string
  alt?: string
  title?: React.ReactNode
  subtitle?: React.ReactNode
}

export interface ImageListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ImageListItem[]
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  aspectRatio?: ImageProps['aspectRatio']
  objectFit?: ImageProps['objectFit']
  renderItem?: (item: ImageListItem, index: number) => React.ReactNode
}

export const ImageList = React.forwardRef<HTMLDivElement, ImageListProps>(
  (
    {
      className,
      items,
      cols = 3,
      gap = 'md',
      aspectRatio = '3/2',
      objectFit = 'cover',
      renderItem,
      ...props
    },
    ref
  ) => {
    if (!items || items.length === 0) return null

    return (
      <Grid
        ref={ref}
        cols={cols}
        gap={gap}
        className={twMerge(clsx('w-full', className))}
        {...props}
      >
        {items.map((item, index) => {
          if (renderItem) {
            return <React.Fragment key={item.id ?? item.src ?? index}>{renderItem(item, index)}</React.Fragment>
          }

          const key = item.id ?? item.src ?? index

          return (
            <div key={key} className="flex flex-col gap-2">
              <Image
                src={item.src}
                alt={item.alt ?? (typeof item.title === 'string' ? item.title : '')}
                aspectRatio={aspectRatio}
                objectFit={objectFit}
                className="w-full"
              />
              {(item.title || item.subtitle) && (
                <div className="space-y-0.5 text-xs">
                  {item.title && (
                    <div className="font-medium text-text-primary truncate">{item.title}</div>
                  )}
                  {item.subtitle && (
                    <div className="text-text-secondary line-clamp-2">{item.subtitle}</div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </Grid>
    )
  }
)

ImageList.displayName = 'ImageList'
