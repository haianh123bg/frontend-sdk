// File: src/components/molecules/FileUploader/FileUploader.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import {
  FileUploaderSelectedFiles,
  type FileUploaderSelectedFilesLayout,
} from './FileUploaderSelectedFiles'

export type FileUploaderProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'defaultChecked' | 'value'
> & {
  value?: File[]
  defaultValue?: File[]
  multiple?: boolean
  appendOnSelect?: boolean
  accept?: string
  maxSizeMb?: number
  maxFiles?: number
  disabled?: boolean
  mode?: 'dropzone' | 'button'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'soft'
  dropLabel?: string
  browseLabel?: string
  helperText?: string
  showFileList?: boolean
  fileListLayout?: FileUploaderSelectedFilesLayout
  allowRemove?: boolean
  allowClear?: boolean
  onValueChange?: (files: File[]) => void
  onFilesSelected?: (files: File[]) => void
}

const fileKey = (file: File) => {
  return `${file.name}-${file.size}-${file.lastModified}`
}

const matchesAccept = (accept: string | undefined, file: File) => {
  if (!accept) return true
  const allowed = accept
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)

  if (!allowed.length) return true

  const name = file.name.toLowerCase()
  const type = (file.type || '').toLowerCase()

  return allowed.some((a) => {
    const rule = a.toLowerCase()
    if (!rule) return true

    if (rule.startsWith('.')) {
      return name.endsWith(rule)
    }

    if (rule.includes('/')) {
      if (rule.endsWith('/*')) {
        const prefix = rule.slice(0, -1)
        return type.startsWith(prefix)
      }
      return type === rule
    }

    return true
  })
}

export const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      className,
      value,
      defaultValue,
      multiple = false,
      appendOnSelect,
      accept,
      maxSizeMb = 5,
      maxFiles,
      disabled = false,
      mode = 'dropzone',
      size = 'md',
      variant = 'outline',
      dropLabel = 'Drag & drop files here',
      browseLabel = 'Browse files',
      helperText,
      showFileList = true,
      fileListLayout = 'vertical',
      allowRemove = true,
      allowClear = true,
      onValueChange,
      onFilesSelected,
      ...props
    },
    ref
  ) => {
    const dispatch = useDispatchAction()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const isControlled = value !== undefined
    const [internalFiles, setInternalFiles] = React.useState<File[]>(defaultValue ?? [])
    const files = isControlled ? value ?? [] : internalFiles

    const [imagePreviews, setImagePreviews] = React.useState<Record<string, string>>({})

    React.useEffect(() => {
      const next: Record<string, string> = {}
      for (const f of files) {
        if (f.type?.startsWith('image/')) {
          next[fileKey(f)] = URL.createObjectURL(f)
        }
      }

      setImagePreviews(next)

      return () => {
        for (const url of Object.values(next)) {
          URL.revokeObjectURL(url)
        }
      }
    }, [files])

    const commitFiles = (nextFiles: File[]) => {
      if (!isControlled) {
        setInternalFiles(nextFiles)
      }

      dispatch(
        EventType.UI_CHANGE,
        { files: nextFiles.map((file) => ({ name: file.name, size: file.size, type: file.type })) },
        { meta: { component: 'FileUploader' }, flags: { sensitive: true } }
      )

      onFilesSelected?.(nextFiles)
      onValueChange?.(nextFiles)
    }

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList) return
      const raw = Array.from(fileList)

      const incoming = multiple ? raw : raw.slice(0, 1)
      const shouldAppend = multiple && (appendOnSelect ?? true)
      const combined = shouldAppend ? [...files, ...incoming] : incoming

      const seen = new Set<string>()
      const deduped: File[] = []
      for (const f of combined) {
        const k = fileKey(f)
        if (seen.has(k)) continue
        seen.add(k)
        deduped.push(f)
      }

      const maxCount = typeof maxFiles === 'number' ? maxFiles : multiple ? undefined : 1
      const limited = maxCount ? deduped.slice(0, Math.max(0, maxCount)) : deduped
      const hadTooMany = !!maxCount && deduped.length > maxCount

      const maxBytes = maxSizeMb * 1024 * 1024
      const oversized = limited.find((file) => file.size > maxBytes)
      if (oversized) {
        setError(`File "${oversized.name}" exceeds ${maxSizeMb}MB limit`)
        return
      }

      const invalidType = limited.find((file) => !matchesAccept(accept, file))
      if (invalidType) {
        setError(`File "${invalidType.name}" is not an allowed type`)
        return
      }

      if (hadTooMany) {
        setError(`Only ${maxCount} file(s) allowed`)
      } else {
        setError(null)
      }

      commitFiles(limited)

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      setDragActive(false)
      handleFiles(e.dataTransfer.files)
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      setDragActive(true)
    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      setDragActive(false)
    }

    const openFilePicker = () => {
      if (disabled) return
      inputRef.current?.click()
    }

    const removeFileAt = (index: number) => {
      setError(null)
      const next = files.filter((_, i) => i !== index)
      commitFiles(next)
    }

    const clearFiles = () => {
      setError(null)
      commitFiles([])
    }

    const containerSizeClass =
      size === 'sm' ? 'gap-2 rounded-xl p-4' : size === 'lg' ? 'gap-4 rounded-3xl p-8' : 'gap-3 rounded-2xl p-6'

    const containerVariantClass =
      variant === 'soft'
        ? 'border border-slate-200 bg-surface'
        : 'border border-dashed border-slate-300 bg-surface-alt'

    const showHelperText = helperText ?? `${multiple ? 'Multiple files supported.' : 'Single file only.'} Max ${maxSizeMb}MB each.`

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex flex-col text-center',
            containerSizeClass,
            containerVariantClass,
            dragActive && !disabled && 'border-primary-500 bg-primary-50',
            disabled && 'opacity-60',
            className
          )
        )}
        onDrop={mode === 'dropzone' ? onDrop : undefined}
        onDragOver={mode === 'dropzone' ? onDragOver : undefined}
        onDragLeave={mode === 'dropzone' ? onDragLeave : undefined}
        role={mode === 'dropzone' ? 'button' : undefined}
        tabIndex={mode === 'dropzone' && !disabled ? 0 : undefined}
        aria-disabled={disabled || undefined}
        onKeyDown={(e) => {
          if (mode !== 'dropzone') return
          if (disabled) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openFilePicker()
          }
        }}
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
          {mode === 'dropzone' && <p className="text-base font-medium text-text-primary">{dropLabel}</p>}
          {mode === 'dropzone' && <p className="text-sm text-text-muted">or</p>}
          <button
            type="button"
            disabled={disabled}
            onClick={openFilePicker}
            className={twMerge(
              clsx(
                'rounded-full bg-primary-500 text-sm font-medium text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60',
                size === 'sm' ? 'px-3 py-1.5' : size === 'lg' ? 'px-5 py-2.5' : 'px-4 py-2'
              )
            )}
          >
            {browseLabel}
          </button>

          <p className="text-xs text-text-muted">{showHelperText}</p>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {files.length > 0 && allowClear && (
          <div className="flex justify-center">
            <button
              type="button"
              disabled={disabled}
              onClick={clearFiles}
              className="text-xs font-medium text-text-muted underline underline-offset-2 hover:text-text"
            >
              Clear
            </button>
          </div>
        )}

        {showFileList && (
          <FileUploaderSelectedFiles
            files={files}
            imagePreviews={imagePreviews}
            layout={fileListLayout}
            disabled={disabled}
            allowRemove={allowRemove}
            onRemove={removeFileAt}
          />
        )}
      </div>
    )
  }
)

FileUploader.displayName = 'FileUploader'
