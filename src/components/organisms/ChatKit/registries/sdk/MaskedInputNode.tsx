import * as React from 'react'
import { MaskedInput } from '../../../../atoms/MaskedInput/MaskedInput'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const MaskedInputNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onChange, mask, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  if (typeof mask !== 'string' || !mask) return null

  return (
    <MaskedInput
      mask={mask}
      {...rest}
      onChange={(value, rawValue) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), value, rawValue, path },
          })
        }
        if (typeof onChange === 'function') onChange(value, rawValue)
      }}
    />
  )
}
