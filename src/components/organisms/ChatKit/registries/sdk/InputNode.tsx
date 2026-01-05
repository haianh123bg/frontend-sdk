import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '../../../../atoms/Input/Input'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const InputNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onChange, name, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  // detailed: Try to connect to FormContext
  const methods = useFormContext()
  const registerProps = (methods && name) ? methods.register(name) : {} as any

  return (
    <Input
      {...rest}
      {...registerProps}
      // Merge custom onChange with RHF onChange if needed, or RHF wins. 
      // RHF register returns onChange. If both exist, we should chain them.
      onChange={(e) => {
        // 1. RHF Handler
        registerProps.onChange?.(e)

        // 2. Action Handler
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), value: e.target.value, path },
          })
        }

        // 3. Custom Prop Handler
        if (typeof onChange === 'function') onChange(e)
      }}
      // Use ref from register if available
      ref={registerProps.ref}
      name={name} // Ensure name is passed
    />
  )
}
