import * as React from 'react'
import { Textarea } from '../../../../atoms/Textarea/Textarea'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const TextareaNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onChange, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <Textarea
      {...rest}
      onChange={(e) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), value: e.target.value, path },
          })
        }
        if (typeof onChange === 'function') onChange(e)
      }}
    />
  )
}
