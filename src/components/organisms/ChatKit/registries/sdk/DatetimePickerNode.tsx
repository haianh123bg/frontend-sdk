import * as React from 'react'
import { DatetimePicker } from '../../../../atoms/DatetimePicker/DatetimePicker'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const DatetimePickerNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onValueChange, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <DatetimePicker
      {...rest}
      onValueChange={(value) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), value, datetime: value, path },
          })
        }
        if (typeof onValueChange === 'function') onValueChange(value)
      }}
    />
  )
}
