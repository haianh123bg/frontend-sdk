import * as React from 'react'
import { SelectLazy } from '../../../../atoms/Select/SelectLazy'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const SelectLazyNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onValueChange, fetchOptions, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  if (typeof fetchOptions !== 'function') return null

  return (
    <SelectLazy
      {...rest}
      fetchOptions={fetchOptions}
      onValueChange={(value) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), value, path },
          })
        }
        if (typeof onValueChange === 'function') onValueChange(value)
      }}
    />
  )
}
