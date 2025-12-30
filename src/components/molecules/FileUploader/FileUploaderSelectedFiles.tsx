import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Scroll } from '../../atoms/Scroll/Scroll'
import { Icon } from '../../atoms/Icon/Icon'
import { IconButton } from '../../atoms/IconButton/IconButton'
import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  X,
  type LucideIcon,
} from 'lucide-react'

export type FileUploaderSelectedFilesLayout = 'vertical' | 'horizontal' | 'wrap'

export interface FileUploaderSelectedFilesProps extends React.HTMLAttributes<HTMLDivElement> {
  files: File[]
  imagePreviews?: Record<string, string>
  layout?: FileUploaderSelectedFilesLayout
  disabled?: boolean
  allowRemove?: boolean
  onRemove?: (index: number) => void
}

const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes)) return ''
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  const mb = kb / 1024
  return `${mb.toFixed(1)} MB`
}

const fileKey = (file: File) => {
  return `${file.name}-${file.size}-${file.lastModified}`
}

const getFileExtension = (name: string) => {
  const clean = name.split('?')[0].split('#')[0]
  const base = clean.split('/').pop() || clean
  const idx = base.lastIndexOf('.')
  if (idx <= 0) return ''
  return base.slice(idx + 1).toLowerCase()
}

const getFileBadge = (ext: string): { label?: string; icon?: LucideIcon; className: string } => {
  const e = ext.toLowerCase()

  if (['pdf'].includes(e)) {
    return { label: 'PDF', className: 'bg-red-500 text-white' }
  }
  if (['doc', 'docx'].includes(e)) {
    return { label: 'W', className: 'bg-blue-600 text-white' }
  }
  if (['xls', 'xlsx', 'csv'].includes(e)) {
    return { label: 'X', className: 'bg-emerald-600 text-white' }
  }
  if (['ppt', 'pptx'].includes(e)) {
    return { label: 'P', className: 'bg-orange-500 text-white' }
  }

  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(e)) {
    return { icon: FileImage, className: 'bg-teal-500 text-white' }
  }
  if (['mp4', 'mov', 'webm', 'mkv'].includes(e)) {
    return { icon: FileVideo, className: 'bg-fuchsia-500 text-white' }
  }
  if (['mp3', 'wav', 'ogg', 'm4a'].includes(e)) {
    return { icon: FileAudio, className: 'bg-indigo-500 text-white' }
  }
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(e)) {
    return { icon: FileArchive, className: 'bg-amber-500 text-white' }
  }

  return { icon: FileText, className: 'bg-slate-100 text-text-secondary' }
}

const FileThumb: React.FC<{ file: File; previewUrl?: string }> = ({ file, previewUrl }) => {
  if (previewUrl) {
    return <img src={previewUrl} alt={file.name} className="h-10 w-10 shrink-0 rounded-xl object-cover" />
  }

  const ext = getFileExtension(file.name)
  const badge = getFileBadge(ext)

  return (
    <div className={twMerge(clsx('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', badge.className))}>
      {badge.label ? (
        <span className="text-xs font-extrabold tracking-wide">{badge.label}</span>
      ) : badge.icon ? (
        <Icon icon={badge.icon} size="md" variant={badge.className.includes('text-white') ? 'white' : 'default'} />
      ) : null}
    </div>
  )
}

const RemoveButton: React.FC<{ disabled?: boolean; onClick?: () => void }> = ({ disabled, onClick }) => {
  return (
    <IconButton
      icon={X}
      size="xs"
      variant="muted"
      onClick={onClick}
      disabled={disabled}
      aria-label="Remove file"
      className="shrink-0"
    />
  )
}

export const FileUploaderSelectedFiles = React.forwardRef<HTMLDivElement, FileUploaderSelectedFilesProps>(
  ({
    className,
    files,
    imagePreviews,
    layout = 'vertical',
    disabled = false,
    allowRemove = true,
    onRemove,
    ...props
  }, ref) => {
    if (!files.length) return null

    if (layout === 'horizontal') {
      return (
        <div ref={ref} className={className} {...props}>
          <Scroll autoHide direction="horizontal" className="mt-2">
            <div className="flex gap-2 pr-1">
              {files.map((file, index) => {
                const previewUrl = imagePreviews?.[fileKey(file)]
                return (
                  <div
                    key={fileKey(file)}
                    className={twMerge(
                      clsx(
                        'flex w-64 shrink-0 items-center gap-3 rounded-2xl bg-surface px-3 py-2 ring-1 ring-slate-200',
                        disabled && 'opacity-60'
                      )
                    )}
                  >
                    <FileThumb file={file} previewUrl={previewUrl} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium text-text">{file.name}</div>
                      <div className="text-xs text-text-muted">{formatBytes(file.size)}</div>
                    </div>
                    {allowRemove && <RemoveButton disabled={disabled} onClick={() => onRemove?.(index)} />}
                  </div>
                )
              })}
            </div>
          </Scroll>
        </div>
      )
    }

    if (layout === 'wrap') {
      return (
        <div ref={ref} className={twMerge(clsx('mt-2', className))} {...props}>
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => {
              const previewUrl = imagePreviews?.[fileKey(file)]
              return (
                <div
                  key={fileKey(file)}
                  className={twMerge(
                    clsx(
                      'flex w-full items-center gap-3 rounded-2xl bg-surface px-3 py-2 ring-1 ring-slate-200 sm:w-64',
                      disabled && 'opacity-60'
                    )
                  )}
                >
                  <FileThumb file={file} previewUrl={previewUrl} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-text">{file.name}</div>
                    <div className="text-xs text-text-muted">{formatBytes(file.size)}</div>
                  </div>
                  {allowRemove && <RemoveButton disabled={disabled} onClick={() => onRemove?.(index)} />}
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <div ref={ref} className={twMerge(clsx('mt-2', className))} {...props}>
        <ul className="space-y-1 text-left text-sm text-text-secondary">
          {files.map((file, index) => {
            const previewUrl = imagePreviews?.[fileKey(file)]
            return (
              <li
                key={fileKey(file)}
                className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-2 ring-1 ring-slate-200"
              >
                <FileThumb file={file} previewUrl={previewUrl} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-text">{file.name}</div>
                  <div className="text-xs text-text-muted">{formatBytes(file.size)}</div>
                </div>
                {allowRemove && <RemoveButton disabled={disabled} onClick={() => onRemove?.(index)} />}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
)

FileUploaderSelectedFiles.displayName = 'FileUploaderSelectedFiles'
