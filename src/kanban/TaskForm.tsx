// File: src/kanban/TaskForm.tsx
import * as React from 'react'
import { Plus, GripVertical } from 'lucide-react'
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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export interface TaskFormProps {
  schema: KanbanSchema
  mappings?: KanbanMappings
  permissions?: Permissions
  mode: 'create' | 'edit'
  initialValues?: Record<string, any>
  onSubmit: (values: Record<string, any>) => Promise<any> | any
  onCancel?: () => void
  onAddProperty?: () => void
  onFieldClick?: (field: any) => void
  onReorder?: (oldIndex: number, newIndex: number) => void
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

interface SortableFieldProps {
  field: any
  children: React.ReactNode
  onFieldClick?: (field: any) => void
}

const SortableField = ({ field, children, onFieldClick }: SortableFieldProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: field.name })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 10 : 1
  }

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div 
        className="absolute -left-5 top-8 flex h-6 w-6 cursor-grab items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={14} className="text-slate-400" />
      </div>
      
      <div className="relative">
        <FormField
          name={field.name}
          label={
            <span 
              onClick={(e) => {
                e.preventDefault()
                onFieldClick?.(field)
              }}
              className="cursor-pointer hover:text-primary hover:underline decoration-dashed underline-offset-4 flex items-center gap-1"
              title="Nhấn để cấu hình thuộc tính"
            >
              {field.label ?? field.name}
            </span>
          }
          required={field.isRequired}
        >
          {children}
        </FormField>
      </div>
    </div>
  )
}

export const TaskForm: React.FC<TaskFormProps> = ({
  schema,
  mappings,
  permissions,
  mode,
  initialValues,
  onSubmit,
  onCancel,
  onAddProperty,
  onFieldClick,
  onReorder
}) => {
  void mappings
  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleSubmit = async (values: TaskFormValues) => {
    await onSubmit(values)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = schema.fields.findIndex((f) => f.name === active.id)
      const newIndex = schema.fields.findIndex((f) => f.name === over?.id)
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder?.(oldIndex, newIndex)
      }
    }
  }

  return (
    <Form<TaskFormValues>
      options={{ defaultValues: initialValues as TaskFormValues | undefined }}
      onSubmit={handleSubmit}
      className="flex flex-col h-full"
    >
      <div className="flex-1 overflow-y-auto p-2 pl-6"> {/* Added padding and left padding for drag handle */}
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={schema.fields.map(f => f.name)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-4">
              {schema.fields.map((field) => {
                const permission = resolveFieldPermission(permissions, field.name)
                if (permission === 'hidden') return null

                const disabled = permission === 'readonly'

                return (
                  <SortableField 
                    key={field.name} 
                    field={field}
                    onFieldClick={onFieldClick}
                  >
                    {renderControl(field.type, field.name, { enumValues: field.enumValues }, disabled)}
                  </SortableField>
                )
              })}
            </div>
          </SortableContext>
        </DndContext>
          
        {onAddProperty && (
          <div className="mt-4">
            <Button 
              type="button" 
              variant="ghost" 
              className="justify-start px-0 text-text-secondary hover:text-primary"
              onClick={onAddProperty}
            >
              <Plus size={16} className="mr-2" />
              Thêm thuộc tính
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-4 px-2">
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
