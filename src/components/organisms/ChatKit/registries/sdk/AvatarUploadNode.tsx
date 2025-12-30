import * as React from 'react'
import { AvatarUpload } from '../../../../molecules/AvatarUpload/AvatarUpload'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'
import { toFileMeta } from '../shared/fileMeta'

function toPayloadValue(value: unknown) {
  if (typeof File !== 'undefined' && value instanceof File) {
    return { kind: 'file', file: toFileMeta(value) }
  }
  if (typeof value === 'string') {
    return { kind: 'url', url: value }
  }
  if (value == null) {
    return { kind: 'empty', value: null }
  }
  return { kind: 'unknown', value }
}

export const AvatarUploadNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onValueChange, onChange, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <AvatarUpload
      {...rest}
      onValueChange={(value) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), value: toPayloadValue(value), path },
          })
        }
        if (typeof onValueChange === 'function') onValueChange(value)
      }}
      onChange={(value) => {
        if (typeof onChange === 'function') onChange(value)
      }}
    />
  )
}
