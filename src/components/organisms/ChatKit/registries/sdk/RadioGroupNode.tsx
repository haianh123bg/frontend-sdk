import * as React from 'react'
import { RadioGroup } from '../../../../molecules/RadioGroup/RadioGroup'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const RadioGroupNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onChange, name, options = [], value, orientation, className, error } =
    (node.props ?? {}) as Record<string, any>

  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <RadioGroup
      name={String(name ?? node.id ?? node.key ?? 'radio_group')}
      options={Array.isArray(options) ? options : []}
      value={value != null ? String(value) : undefined}
      orientation={orientation}
      className={className}
      error={Boolean(error)}
      onChange={(next) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), value: next, path },
          })
        }
        if (typeof onChange === 'function') onChange(next)
      }}
    />
  )
}
