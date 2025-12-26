import * as React from 'react'
import { Modal } from '../Modal/Modal'
import { Button } from '../../atoms/Button/Button'
import { Iframe } from '../../atoms/Iframe/Iframe'

export type MediaPreviewItemType = 'image' | 'video' | 'audio' | 'pdf' | 'iframe' | 'file'

export interface MediaPreviewItem {
  id?: string
  type: MediaPreviewItemType
  src: string
  title?: string
  mimeType?: string
  poster?: string
  downloadName?: string
}

export interface MediaPreviewProps {
  open: boolean
  onClose: () => void
  items: MediaPreviewItem[]
  initialIndex?: number
  index?: number
  onIndexChange?: (nextIndex: number) => void
  modalSize?: 'sm' | 'md' | 'lg' | 'xl'
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  open,
  onClose,
  items,
  initialIndex = 0,
  index,
  onIndexChange,
  modalSize = 'xl',
}) => {
  const isControlled = typeof index === 'number'
  const [internalIndex, setInternalIndex] = React.useState(() => clamp(initialIndex, 0, Math.max(0, items.length - 1)))

  React.useEffect(() => {
    if (!open) return
    if (isControlled) return
    setInternalIndex(clamp(initialIndex, 0, Math.max(0, items.length - 1)))
  }, [initialIndex, isControlled, items.length, open])

  const activeIndex = isControlled ? clamp(index as number, 0, Math.max(0, items.length - 1)) : internalIndex
  const active = items[activeIndex]

  const setActiveIndex = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, Math.max(0, items.length - 1))
      if (!isControlled) setInternalIndex(clamped)
      onIndexChange?.(clamped)
    },
    [isControlled, items.length, onIndexChange]
  )

  const canPrev = activeIndex > 0
  const canNext = activeIndex < items.length - 1

  const [zoom, setZoom] = React.useState(1)
  React.useEffect(() => {
    setZoom(1)
  }, [activeIndex, open])

  React.useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'ArrowLeft') {
        if (!canPrev) return
        e.preventDefault()
        setActiveIndex(activeIndex - 1)
        return
      }

      if (e.key === 'ArrowRight') {
        if (!canNext) return
        e.preventDefault()
        setActiveIndex(activeIndex + 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, canNext, canPrev, onClose, open, setActiveIndex])

  if (!open) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={active?.title ?? (items.length > 1 ? `${activeIndex + 1}/${items.length}` : undefined)}
      size={modalSize}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActiveIndex(activeIndex - 1)}
              disabled={!canPrev}
            >
              Trước
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActiveIndex(activeIndex + 1)}
              disabled={!canNext}
            >
              Sau
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {active?.type === 'image' && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setZoom((z) => clamp(Number((z - 0.25).toFixed(2)), 0.5, 3))}
                  disabled={zoom <= 0.5}
                >
                  -
                </Button>
                <div className="text-xs text-text-muted min-w-[72px] text-center">{Math.round(zoom * 100)}%</div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setZoom((z) => clamp(Number((z + 0.25).toFixed(2)), 0.5, 3))}
                  disabled={zoom >= 3}
                >
                  +
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setZoom(1)} disabled={zoom === 1}>
                  Reset
                </Button>
              </>
            )}

            {active?.src && (
              <a
                href={active.src}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                Mở tab mới
              </a>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-2">
          {!active ? (
            <div className="py-10 text-center text-sm text-text-muted">Không có nội dung</div>
          ) : active.type === 'image' ? (
            <div className="max-h-[70vh] overflow-auto">
              <div className="flex w-full items-center justify-center">
                <img
                  src={active.src}
                  alt={active.title ?? ''}
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                  className="max-h-[70vh] max-w-full select-none rounded-xl bg-slate-100 object-contain"
                  draggable={false}
                />
              </div>
            </div>
          ) : active.type === 'video' ? (
            <video
              src={active.src}
              controls
              className="w-full max-h-[70vh] rounded-xl bg-black"
              poster={active.poster}
            />
          ) : active.type === 'audio' ? (
            <audio src={active.src} controls className="w-full" />
          ) : active.type === 'pdf' ? (
            <Iframe
              src={active.src}
              showLoading
              containerClassName="w-full h-[70vh] rounded-xl"
              className="rounded-xl"
            />
          ) : active.type === 'iframe' ? (
            <Iframe
              src={active.src}
              aspectRatio="16/9"
              showLoading
              containerClassName="w-full"
              className="rounded-xl"
            />
          ) : (
            <div className="py-10 text-center">
              <div className="text-sm text-text-muted">Không hỗ trợ preview loại file này.</div>
              <div className="mt-2">
                <a
                  href={active.src}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Mở file
                </a>
              </div>
            </div>
          )}
        </div>

        {items.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {items.slice(0, 12).map((it, i) => {
              const key = it.id ?? `${it.type}:${it.src}:${i}`
              const isActive = i === activeIndex

              return (
                <button
                  key={key}
                  type="button"
                  className={
                    'rounded-full px-3 py-1 text-xs transition-colors ' +
                    (isActive
                      ? 'bg-primary-50 text-text-primary'
                      : 'bg-surface text-text-muted hover:bg-slate-50')
                  }
                  onClick={() => setActiveIndex(i)}
                >
                  {it.title ?? `#${i + 1}`}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </Modal>
  )
}

MediaPreview.displayName = 'MediaPreview'
