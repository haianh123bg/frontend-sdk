import * as React from 'react'
import { ThemeSwitch } from '../../../../atoms/ThemeSwitch/ThemeSwitch'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const ThemeSwitchNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onCheckedChange, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <ThemeSwitch
      {...rest}
      onCheckedChange={(checked) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), checked, path },
          })
        }
        if (typeof onCheckedChange === 'function') onCheckedChange(checked)
      }}
    />
  )
}
