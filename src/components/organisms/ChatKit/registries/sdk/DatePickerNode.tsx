import * as React from 'react'
import { DatePicker } from '../../../../atoms/DatePicker/DatePicker'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const DatePickerNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onValueChange, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <DatePicker
      {...rest}
      onValueChange={(value) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), value, date: value, path },
          })
        }
        if (typeof onValueChange === 'function') onValueChange(value)
      }}
    />
  )
}
