import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface IframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  containerClassName?: string
  aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2'
  showLoading?: boolean
  loadingOverlay?: React.ReactNode
  errorFallback?: React.ReactNode
}

export const Iframe = React.forwardRef<HTMLIFrameElement, IframeProps>(
  (
    {
      containerClassName,
      className,
      src,
      srcDoc,
      title = 'Embedded content',
      loading = 'lazy',
      referrerPolicy,
      sandbox,
      allow,
      allowFullScreen,
      aspectRatio,
      showLoading = false,
      loadingOverlay,
      errorFallback,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)

    React.useEffect(() => {
      setIsLoaded(false)
      setHasError(false)
    }, [src, srcDoc])

    const aspectRatioClasses = {
      '1/1': 'aspect-square',
      '16/9': 'aspect-video',
      '4/3': 'aspect-[4/3]',
      '3/2': 'aspect-[3/2]',
    }

    const effectiveLoadingOverlay =
      loadingOverlay ?? (
        <div className="flex items-center justify-center">
          <div
            className={twMerge(
              clsx(
                'h-6 w-6 animate-spin rounded-full border-2 border-primary-500 border-t-transparent'
              )
            )}
            role="status"
            aria-label="Loading"
          />
        </div>
      )

    const effectiveErrorFallback =
      errorFallback ?? (
        <div className="flex items-center justify-center text-sm text-text-muted">Không thể tải nội dung</div>
      )

    return (
      <div
        className={twMerge(
          clsx(
            'relative w-full overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200',
            aspectRatio && aspectRatioClasses[aspectRatio],
            containerClassName
          )
        )}
      >
        <iframe
          ref={ref}
          src={src}
          srcDoc={srcDoc}
          title={title}
          loading={loading}
          referrerPolicy={referrerPolicy}
          sandbox={sandbox}
          allow={allow}
          allowFullScreen={allowFullScreen}
          className={twMerge(
            clsx(
              'absolute inset-0 h-full w-full bg-slate-100',
              className
            )
          )}
          onLoad={(e) => {
            setIsLoaded(true)
            setHasError(false)
            onLoad?.(e)
          }}
          onError={(e) => {
            setHasError(true)
            onError?.(e)
          }}
          {...props}
        />

        {showLoading && !hasError && !isLoaded && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center bg-white/60 backdrop-blur-[1px]">
            {effectiveLoadingOverlay}
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 grid place-items-center bg-white/60 backdrop-blur-[1px]">
            {effectiveErrorFallback}
          </div>
        )}
      </div>
    )
  }
)

Iframe.displayName = 'Iframe'
