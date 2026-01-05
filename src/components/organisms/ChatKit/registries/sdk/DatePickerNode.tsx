import * as React from 'react'
import { DatePicker } from '../../../../atoms/DatePicker/DatePicker'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'
import { useFormContext, Controller } from 'react-hook-form'

export const DatePickerNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onValueChange, name, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  const methods = useFormContext()

  const renderPicker = (fieldProps: any = {}) => (
    <DatePicker
      {...rest}
      {...fieldProps}
      onValueChange={(value) => {
        fieldProps.onChange?.(value)

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

  if (methods && name) {
    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field: { ref, ...field } }) => renderPicker(field)}
      />
    )
  }

  return renderPicker()
}
