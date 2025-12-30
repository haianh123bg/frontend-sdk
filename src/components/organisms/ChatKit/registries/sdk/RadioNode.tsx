import * as React from 'react'
import { Radio } from '../../../../atoms/Radio/Radio'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const RadioNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onChange, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <Radio
      {...rest}
      onChange={(e) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), checked: e.target.checked, value: e.target.value, path },
          })
        }
        if (typeof onChange === 'function') onChange(e)
      }}
    />
  )
}
