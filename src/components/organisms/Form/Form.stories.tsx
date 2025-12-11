import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../atoms/Button/Button'
import { Input } from '../../atoms/Input/Input'
import { Textarea } from '../../atoms/Textarea/Textarea'
import { Select } from '../../atoms/Select/Select'
import { SelectLazy } from '../../atoms/Select/SelectLazy'
import { DatePicker } from '../../atoms/DatePicker/DatePicker'
import { DatetimePicker } from '../../atoms/DatetimePicker/DatetimePicker'
import { Grid } from '../../atoms/Grid/Grid'
import { Form } from './Form'
import { FormField } from '../../molecules/FormField/FormField'
import { FormErrorBanner } from '../../molecules/FormErrorBanner/FormErrorBanner'
import { FormSubmitButton } from '../../molecules/FormSubmitButton/FormSubmitButton'
import { FormFieldArray } from '../../molecules/FormFieldArray/FormFieldArray'
import { FormFieldController } from '../../molecules/FormField/FormFieldController'
import { useZodForm } from '../../../forms/useZodForm'
import { useApiForm } from '../../../forms/useApiForm'
import { useFormWizard, type FormWizardStep } from '../../../forms/hooks/useFormWizard'

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
      <FormField name="name" label="Name" required>
        <Input placeholder="Jane Cooper" />
      </FormField>
      <FormField name="email" label="Email" required>
        <Input type="email" placeholder="jane@company.com" />
      </FormField>
      <FormField name="message" label="Message">
        <Textarea rows={4} placeholder="How can we help?" />
      </FormField>
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
    const methods = useZodForm({schema: contactSchema, defaultValues: { name: '', email: '', message: '' } })
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

interface WizardValues extends ContactFormValues {
  role: string
  date: string
}

const wizardSchema = contactSchema.extend({
  role: z.string().min(1, 'Role is required'),
  date: z.string().min(1, 'Date is required'),
})

export const MultiStepWithFocus: Story = {
  render: () => {
    const formRef = React.useRef<HTMLFormElement | null>(null)
    const methods = useZodForm<WizardValues>({
      schema: wizardSchema,
      defaultValues: {
        name: '',
        email: '',
        message: '',
        role: '',
        date: '',
      },
    })

    const [roleOptions] = React.useState([
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' },
    ])

    const steps: FormWizardStep<WizardValues>[] = React.useMemo(
      () => [
        { id: 'basic', fields: ['name', 'email'] },
        { id: 'meta', fields: ['role', 'date'] },
        { id: 'review' },
      ],
      []
    )

    const wizard = useFormWizard(methods, steps, { shouldFocus: true })

    const handleFinalSubmit = (values: WizardValues) => {
      alert(JSON.stringify(values, null, 2))
    }

    const handleBack = () => {
      wizard.back()
    }

    const handleNextOrSubmit = async () => {
      if (!wizard.isLastStep) {
        const ok = await wizard.next()
        if (!ok) return
        return
      }

      // Bước cuối: submit form, để Form.tsx xử lý validate toàn bộ và focus lỗi đầu tiên nếu có
      formRef.current?.requestSubmit()
    }

    return (
      <Form
        methods={methods}
        onSubmit={handleFinalSubmit}
        formRef={formRef}
        className="space-y-4"
        formId="multi-step-form"
      >
        <div className="text-sm font-medium">Step {wizard.stepIndex + 1} / {wizard.steps.length}</div>

        {wizard.stepIndex === 0 && (
          <div className="space-y-3">
            <FormField name="name" label="Name" required>
              <Input placeholder="Jane Cooper" />
            </FormField>
            <FormField name="email" label="Email" required>
              <Input type="email" placeholder="jane@company.com" />
            </FormField>
          </div>
        )}

        {wizard.stepIndex === 1 && (
          <div className="space-y-3">
            <FormFieldController<WizardValues>
              name="role"
              label="Role"
              required
              render={({ field }) => (
                <Select
                  options={roleOptions}
                  placeholder="Chọn role"
                  value={field.value}
                  onChange={field.onChange}
                  name={field.name}
                />
              )}
            />
            <FormFieldController<WizardValues>
              name="date"
              label="Date"
              required
              render={({ field }) => (
                <DatePicker value={field.value} onChange={field.onChange} name={field.name} />
              )}
            />
          </div>
        )}

        {wizard.stepIndex === 2 && (
          <div className="space-y-2 text-sm">
            <div className="font-medium">Review</div>
            <pre className="rounded bg-surface-alt p-3 text-xs">
              {JSON.stringify(methods.watch(), null, 2)}
            </pre>
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button type="button" variant="ghost" disabled={wizard.isFirstStep} onClick={handleBack}>
            Back
          </Button>
          <Button type="button" onClick={handleNextOrSubmit}>
            {wizard.isLastStep ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Form>
    )
  },
}

interface ControllerFieldsValues extends ContactFormValues {
  role: string
  date: string
}

const controllerSchema = contactSchema.extend({
  role: z.string().min(1, 'Role is required'),
  date: z.string().min(1, 'Date is required'),
})

export const WithFormFieldController: Story = {
  render: () => {
    const methods = useZodForm<ControllerFieldsValues>({
      schema: controllerSchema,
      defaultValues: {
        name: '',
        email: '',
        message: '',
        role: '',
        date: '',
      },
    })

    const [roleOptions] = React.useState([
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' },
    ])

    const onSubmit = (values: ControllerFieldsValues) => {
      alert(JSON.stringify(values, null, 2))
    }

    return (
      <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField name="name" label="Name" required>
              <Input placeholder="Jane Cooper" />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField name="email" label="Email" required>
              <Input type="email" placeholder="jane@company.com" />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormFieldController<ControllerFieldsValues>
              name="role"
              label="Role"
              required
              render={({ field }) => (
                <Select
                  options={roleOptions}
                  placeholder="Chọn role"
                  value={field.value}
                  onChange={field.onChange}
                  name={field.name}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormFieldController<ControllerFieldsValues>
              name="date"
              label="Date"
              required
              render={({ field }) => (
                <DatePicker value={field.value} onChange={field.onChange} name={field.name} />
              )}
            />
          </Grid>
        </Grid>
        <FormSubmitButton fullWidth>Submit</FormSubmitButton>
      </Form>
    )
  },
}

interface EmailsFormValues {
  emails: { value: string }[]
}

export const WithFieldArray: Story = {
  render: () => {
    const methods = useForm<EmailsFormValues>({
      defaultValues: {
        emails: [{ value: '' }],
      },
    })

    return (
      <Form methods={methods} className="space-y-4">
        <FormFieldArray<EmailsFormValues, 'emails'> name="emails">
          {({ fields, append, remove }) => (
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <FormField
                    name={`emails.${index}.value` as any}
                    label={index === 0 ? 'Email' : undefined}
                    className="flex-1"
                  >
                    <Input placeholder={`Email ${index + 1}`} />
                  </FormField>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => append({ value: '' })}
              >
                Add email
              </Button>
            </div>
          )}
        </FormFieldArray>
        <FormSubmitButton fullWidth>Submit</FormSubmitButton>
      </Form>
    )
  },
}

interface AllFieldsValues extends ContactFormValues {
  role: string
  lazyRole: string
  date: string
  datetime: string
}

const allFieldsSchema = contactSchema.extend({
  role: z.string().min(1, 'Role is Bắt buộc'),
  lazyRole: z.string().min(1, 'Lazy role is required'),
  date: z.string().min(1, 'Date is required'),
  datetime: z.string().min(1, 'Datetime is required'),
})

export const WithAllFields: Story = {
  render: () => {
    const methods = useZodForm<AllFieldsValues>({
      schema: allFieldsSchema,
      defaultValues: {
        name: '',
        email: '',
        message: '',
        role: '',
        lazyRole: '',
        date: '',
        datetime: '',
      },
    })

    const [roleOptions] = React.useState([
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' },
    ])

    const onSubmit = (values: AllFieldsValues) => {
      alert(JSON.stringify(values, null, 2))
    }

    return (
      <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormField name="name" label="Name" required>
              <Input placeholder="Jane Cooper" />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormField name="email" label="Email" required>
              <Input type="email" placeholder="jane@company.com" />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
            <FormField name="message" label="Message" required>
              <Textarea rows={4} placeholder="How can we help?" />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormField name="role" label="Role" required>
              <Select options={roleOptions} placeholder="Chọn role" />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormField name="lazyRole" label="Lazy role" required>
              <SelectLazy
                placeholder="Chọn lazy option"
                fetchOptions={async ({ page, pageSize, search }) => {
                  await new Promise((r) => setTimeout(r, 400))
                  const total = 50
                  const start = (page - 1) * pageSize
                  const end = Math.min(start + pageSize, total)
                  let items = Array.from({ length: total }, (_, i) => ({
                    label: `User ${i + 1}`,
                    value: String(i + 1),
                  }))
                  if (search) {
                    const term = search.toLowerCase()
                    items = items.filter((o) => o.label.toLowerCase().includes(term))
                  }
                  const slice = items.slice(start, end)
                  return {
                    data: slice,
                    hasMore: end < items.length,
                  }
                }}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormField name="date" label="Date" required>
              <DatePicker />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormField name="datetime" label="Datetime" required>
              <DatetimePicker />
            </FormField>
          </Grid>
        </Grid>
        <Button type="submit" className="w-full">
          Submit
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
    const [options] = React.useState([
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' },
    ])

    const { methods, formRef, handleSubmit, formError, isSubmitting } = useApiForm<ApiValues, { ok: boolean}>({
      schema: apiSchema,
      formOptions: {
        defaultValues: { name: '', email: '', message: '', role: '' },
      },
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
    })

    return (
      <Form methods={methods} onSubmit={handleSubmit} formRef={formRef} className="space-y-4">
        <FormErrorBanner message={formError} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormField name="name" label="Name" required>
              <Input placeholder="Jane Cooper" />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormField name="email" label="Email" required>
              <Input type="email" placeholder="jane@company.com" />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormField name="role" label="Role" required>
              <Select options={options} placeholder="Chọn role" />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
            <FormField name="message" label="Message" required>
              <Textarea rows={4} placeholder="How can we help?" />
            </FormField>
          </Grid>
        </Grid>
        <Button type="submit" className="w-full" disabled={isSubmitting} isLoading={isSubmitting}>
          Submit
        </Button>
      </Form>
    )
  },
}
