import * as React from 'react'
import { Select } from '../../../../atoms/Select/Select'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'
import { useFormContext, Controller } from 'react-hook-form'

export const SelectNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onValueChange, options = [], name, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  const methods = useFormContext()

  const renderSelect = (fieldProps: any = {}) => (
    <Select
      options={Array.isArray(options) ? options : []}
      {...rest}
      {...fieldProps}
      onValueChange={(value) => {
        fieldProps.onChange?.(value) // Select passes value, Controller expects value

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

  if (methods && name) {
    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field: { ref, ...field } }) => renderSelect(field)}
      />
    )
  }

  return renderSelect()
}
