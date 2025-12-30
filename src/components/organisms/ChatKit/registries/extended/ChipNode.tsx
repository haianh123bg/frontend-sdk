import * as React from 'react'
import { Chip } from '../../../../atoms/Chip/Chip'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const ChipNode: React.FC<SchemaComponentProps> = ({ node, renderChildren, onAction, conversationId, path }) => {
  const { label, variant, size, disabled, action, className, ...rest } = (node.props ?? {}) as Record<string, any>

  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <Chip
      label={label ?? renderChildren()}
      variant={variant}
      size={size}
      disabled={Boolean(disabled)}
      className={className}
      onClick={(e) => {
        if (!resolvedAction || !onAction) return
        onAction({
          ...resolvedAction,
          payload: { ...(resolvedAction.payload ?? {}), path },
        })
        e.preventDefault()
      }}
      {...rest}
    />
  )
}
