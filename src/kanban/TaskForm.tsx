// File: src/kanban/TaskForm.tsx
import * as React from 'react'
import type { KanbanSchema, KanbanMappings, Permissions } from './types'
import { Form } from '../components/organisms/Form/Form'
import { FormField } from '../components/molecules/FormField/FormField'
import { FormSubmitButton } from '../components/molecules/FormSubmitButton/FormSubmitButton'
import { Input } from '../components/atoms/Input/Input'
import { Textarea } from '../components/atoms/Textarea/Textarea'
import { Checkbox } from '../components/atoms/Checkbox/Checkbox'
import { Select } from '../components/atoms/Select/Select'
import { DatePicker } from '../components/atoms/DatePicker/DatePicker'
import { DatetimePicker } from '../components/atoms/DatetimePicker/DatetimePicker'
import { Button } from '../components/atoms/Button/Button'

export interface TaskFormProps {
  schema: KanbanSchema
  mappings?: KanbanMappings
  permissions?: Permissions
  mode: 'create' | 'edit'
  initialValues?: Record<string, any>
  onSubmit: (values: Record<string, any>) => Promise<any> | any
  onCancel?: () => void
}

type TaskFormValues = Record<string, any>

const resolveFieldPermission = (permissions: Permissions | undefined, fieldName: string) => {
  return permissions?.fieldPermissions?.[fieldName]
}

const renderControl = (
  fieldType: string,
  fieldName: string,
  fieldOptions?: { enumValues?: string[] },
  disabled?: boolean
): React.ReactNode => {
  const type = fieldType.toLowerCase()

  if (type === 'text' || type === 'richtext') {
    return <Textarea name={fieldName} disabled={disabled} />
  }

  if (type === 'number') {
    return <Input type="number" name={fieldName} disabled={disabled} />
  }

  if (type === 'boolean') {
    return <Checkbox name={fieldName} disabled={disabled} />
  }

  if (type === 'enum' && fieldOptions?.enumValues && fieldOptions.enumValues.length > 0) {
    const options = fieldOptions.enumValues.map((value) => ({ label: value, value }))
    return <Select name={fieldName} options={options} disabled={disabled} />
  }

  if (type === 'date') {
    return <DatePicker name={fieldName} disabled={disabled} />
  }

  if (type === 'datetime') {
    return <DatetimePicker name={fieldName} disabled={disabled} />
  }

  return <Input name={fieldName} disabled={disabled} />
}

export const TaskForm: React.FC<TaskFormProps> = ({
  schema,
  mappings,
  permissions,
  mode,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  void mappings
  const handleSubmit = async (values: TaskFormValues) => {
    await onSubmit(values)
  }

  return (
    <Form<TaskFormValues>
      options={{ defaultValues: initialValues as TaskFormValues | undefined }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {schema.fields.map((field) => {
          const permission = resolveFieldPermission(permissions, field.name)
          if (permission === 'hidden') return null

          const disabled = permission === 'readonly'

          return (
            <FormField
              key={field.name}
              name={field.name}
              label={field.label ?? field.name}
              required={field.isRequired}
            >
              {renderControl(field.type, field.name, { enumValues: field.enumValues }, disabled)}
            </FormField>
          )
        })}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Hủy
          </Button>
        )}
        <FormSubmitButton variant="primary">
          {mode === 'create' ? 'Tạo task' : 'Lưu thay đổi'}
        </FormSubmitButton>
      </div>
    </Form>
  )
}

TaskForm.displayName = 'TaskForm'
