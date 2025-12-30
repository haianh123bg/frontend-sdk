import * as React from 'react'
import { Rating } from '../../../../atoms/Rating/Rating'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const RatingNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const {
    value = 0,
    max = 5,
    size = 'md',
    showValue,
    readOnly = true,
    disabled,
    allowClear,
    action,
    className,
    ...rest
  } = (node.props ?? {}) as Record<string, any>

  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <Rating
      value={Number(value)}
      max={Number(max)}
      size={size}
      showValue={Boolean(showValue)}
      readOnly={Boolean(readOnly) || !resolvedAction}
      disabled={Boolean(disabled)}
      allowClear={Boolean(allowClear)}
      className={className}
      onChange={(next) => {
        if (!resolvedAction || !onAction) return
        onAction({
          ...resolvedAction,
          payload: { ...(resolvedAction.payload ?? {}), value: next, path },
        })
      }}
      {...rest}
    />
  )
}
