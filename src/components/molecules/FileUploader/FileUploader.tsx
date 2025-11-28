// File: src/components/molecules/FileUploader/FileUploader.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  multiple?: boolean
  accept?: string
  maxSizeMb?: number
  onFilesSelected?: (files: File[]) => void
}

export const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  ({ className, multiple = false, accept, maxSizeMb = 5, onFilesSelected, ...props }, ref) => {
    const dispatch = useDispatchAction()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [files, setFiles] = React.useState<File[]>([])

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList) return
      const fileArray = Array.from(fileList)
      const maxBytes = maxSizeMb * 1024 * 1024
      const oversized = fileArray.find((file) => file.size > maxBytes)
      if (oversized) {
        setError(`File "${oversized.name}" exceeds ${maxSizeMb}MB limit`)
        return
      }
      setError(null)
      setFiles(fileArray)
      dispatch(
        EventType.UI_CHANGE,
        { files: fileArray.map((file) => ({ name: file.name, size: file.size })) },
        { meta: { component: 'FileUploader' }, flags: { sensitive: true } }
      )
      onFilesSelected?.(fileArray)
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleFiles(e.dataTransfer.files)
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(true)
    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
    }

    const openFilePicker = () => inputRef.current?.click()

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-surface-alt p-6 text-center',
            dragActive && 'border-primary-500 bg-primary-50',
            className
          )
        )}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={onInputChange}
        />
        <div className="flex flex-col items-center gap-2">
          <p className="text-base font-medium text-text-primary">Drag & drop files here</p>
          <p className="text-sm text-text-muted">or</p>
          <button
            type="button"
            onClick={openFilePicker}
            className="rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
          >
            Browse files
          </button>
          <p className="text-xs text-text-muted">
            {multiple ? 'Multiple files supported.' : 'Single file only.'} Max {maxSizeMb}MB each.
          </p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {files.length > 0 && (
          <ul className="mt-2 space-y-1 text-left text-sm text-text-secondary">
            {files.map((file) => (
              <li key={file.name} className="rounded-xl bg-surface px-3 py-2">
                {file.name} <span className="text-xs text-text-muted">({(file.size / 1024).toFixed(1)} KB)</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

FileUploader.displayName = 'FileUploader'
