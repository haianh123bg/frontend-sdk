import * as React from 'react'
import { TiptapEditor } from '../../../../atoms/TiptapEditor/TiptapEditor'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const TiptapEditorNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onValueChange, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <TiptapEditor
      {...rest}
      onValueChange={(html) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), value: html, html, path },
          })
        }
        if (typeof onValueChange === 'function') onValueChange(html)
      }}
    />
  )
}
