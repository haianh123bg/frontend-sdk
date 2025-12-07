import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../atoms/Button/Button'
import { Input } from '../../atoms/Input/Input'
import { Textarea } from '../../atoms/Textarea/Textarea'
import { Select } from '../../atoms/Select/Select'
import { Form } from './Form'
import { FormField } from '../../molecules/FormField/FormField'
import { FormFieldController } from '../../molecules/FormField/FormFieldController'
import { FormErrorBanner } from '../../molecules/FormErrorBanner/FormErrorBanner'
import { useZodForm } from '../../../forms/useZodForm'
import { useFormErrors } from '../../../forms/hooks/useFormErrors'
import { useFormSubmit } from '../../../forms/hooks/useFormSubmit'

interface ContactFormValues {
  name: string
  email: string
  message: string
}

const meta = {
  title: 'Organisms/Form',
  component: Form,
  tags: ['autodocs'],
  args: {
    className: 'space-y-4 rounded-2xl bg-surface p-6 shadow-sm',
  },
} satisfies Meta<typeof Form<ContactFormValues>>

export default meta

type Story = StoryObj<typeof meta>

const BasicForm = () => {
  const methods = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const submit = (values: ContactFormValues) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Form methods={methods} onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary" htmlFor="name">
          Name
        </label>
        <Input id="name" placeholder="Jane Cooper" {...methods.register('name', { required: true })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" placeholder="jane@company.com" {...methods.register('email', { required: true })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary" htmlFor="message">
          Message
        </label>
        <Textarea id="message" rows={4} placeholder="How can we help?" {...methods.register('message')} />
      </div>
      <Button type="submit" className="w-full">
        Send message
      </Button>
    </Form>
  )
}

export const Basic: Story = {
  render: () => <BasicForm />,
}

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email không hợp lệ'),
  message: z.string().min(5, 'Message tối thiểu 5 ký tự'),
})

export const WithZodAndErrors: Story = {
  render: () => {
    const methods = useZodForm({ schema: contactSchema, defaultValues: { name: '', email: '', message: '' } })
    const onSubmit = (values: ContactFormValues) => {
      alert(JSON.stringify(values, null, 2))
    }
    return (
      <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
        <FormField name="name" label="Name" required>
          <Input placeholder="Jane Cooper" />
        </FormField>
        <FormField name="email" label="Email" required>
          <Input type="email" placeholder="jane@company.com" />
        </FormField>
        <FormField name="message" label="Message" required>
          <Textarea rows={4} placeholder="How can we help?" />
        </FormField>
        <Button type="submit" className="w-full">
          Send message
        </Button>
      </Form>
    )
  },
}

interface ApiValues extends ContactFormValues {
  role: string
}

const apiSchema = contactSchema.extend({
  role: z.string().min(1, 'Role is required'),
})

export const WithApiErrors: Story = {
  render: () => {
    const methods = useZodForm<ApiValues>({
      schema: apiSchema,
      defaultValues: { name: '', email: '', message: '', role: '' },
    })
    const { setFormErrors, formRef } = useFormErrors(methods)
    const [options] = React.useState([
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' },
    ])

    const { handleSubmit, formError, isSubmitting } = useFormSubmit<ApiValues, { ok: boolean }, { message?: string; fieldErrors?: { field: string; message: string }[] }>({
      request: async (values) => {
        await new Promise((r) => setTimeout(r, 600))
        if (values.email === 'taken@example.com') {
          const err = { message: 'Email đã tồn tại', fieldErrors: [{ field: 'email', message: 'Email đã được sử dụng' }] }
          throw err
        }
        if (!values.role) {
          const err = { message: 'Thiếu role', fieldErrors: [{ field: 'role', message: 'Vui lòng chọn role' }] }
          throw err
        }
        return { ok: true }
      },
      parseError: (err) => err as any,
      onError: (apiErr) => setFormErrors(apiErr),
    })

    return (
      <Form methods={methods} onSubmit={handleSubmit} formRef={formRef} className="space-y-4">
        <FormErrorBanner message={formError} />
        <FormField name="name" label="Name" required>
          <Input placeholder="Jane Cooper" />
        </FormField>
        <FormField name="email" label="Email" required>
          <Input type="email" placeholder="jane@company.com" />
        </FormField>
        <FormFieldController
          name="role"
          label="Role"
          required
        >
          {({ field }) => (
            <Select
              options={options}
              value={field.value}
              onChange={(v) => field.onChange(v)}
              placeholder="Chọn role"
            />
          )}
        </FormFieldController>
        <FormField name="message" label="Message" required>
          <Textarea rows={4} placeholder="How can we help?" />
        </FormField>
        <Button type="submit" className="w-full" disabled={isSubmitting} isLoading={isSubmitting}>
          Submit
        </Button>
      </Form>
    )
  },
}
