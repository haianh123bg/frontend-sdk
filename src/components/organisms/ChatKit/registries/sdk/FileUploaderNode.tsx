import * as React from 'react'
import { FileUploader } from '../../../../molecules/FileUploader/FileUploader'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'
import { toFileMeta } from '../shared/fileMeta'

export const FileUploaderNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onValueChange, onFilesSelected, value, defaultValue, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  const hasFile = typeof File !== 'undefined'
  const safeValue = hasFile && Array.isArray(value) && value.every((f) => f instanceof File) ? (value as File[]) : undefined
  const safeDefaultValue =
    hasFile && Array.isArray(defaultValue) && defaultValue.every((f) => f instanceof File) ? (defaultValue as File[]) : undefined

  return (
    <FileUploader
      {...rest}
      value={safeValue}
      defaultValue={safeDefaultValue}
      onFilesSelected={(files) => {
        if (typeof onFilesSelected === 'function') onFilesSelected(files)
      }}
      onValueChange={(files) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: {
              ...(resolvedAction.payload ?? {}),
              files: Array.isArray(files) ? files.map(toFileMeta) : [],
              path,
            },
          })
        }
        if (typeof onValueChange === 'function') onValueChange(files)
      }}
    />
  )
}
