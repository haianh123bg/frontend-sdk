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
import { SchemaForm } from './SchemaForm'
import { FormField } from '../../molecules/FormField/FormField'
import { FormErrorBanner } from '../../molecules/FormErrorBanner/FormErrorBanner'
import { FormSubmitButton } from '../../molecules/FormSubmitButton/FormSubmitButton'
import { FormFieldArray } from '../../molecules/FormFieldArray/FormFieldArray'
import { FormFieldController } from '../../molecules/FormField/FormFieldController'
import { useZodForm } from '../../../forms/useZodForm'
import { useApiForm } from '../../../forms/useApiForm'
import { useFormWizard, type FormWizardStep } from '../../../forms/hooks/useFormWizard'
import { OptionSourceType, SchemaType, type FormObjectSchema } from '../../../forms/schema'

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

export const SchemaDrivenNestedObject: Story = {
  render: () => {
    const schema: FormObjectSchema = {
      type: SchemaType.OBJECT,
      properties: {
        profile: {
          type: SchemaType.OBJECT,
          title: 'Profile',
          propertyOrdering: ['firstName', 'lastName', 'email'],
          required: ['firstName', 'lastName'],
          properties: {
            firstName: {
              type: SchemaType.STRING,
              title: 'First name',
              ui: { placeholder: 'Nguyễn', width: { xs: 12, sm: 4 } },
              validation: [{ type: 'required', message: 'First name là bắt buộc' }],
            },
            lastName: {
              type: SchemaType.STRING,
              title: 'Last name',
              ui: { placeholder: 'Văn A', width: { xs: 12, sm: 4 } },
              validation: [{ type: 'required', message: 'Last name là bắt buộc' }],
            },
            email: {
              type: SchemaType.STRING,
              title: 'Email',
              format: 'email',
              ui: { placeholder: 'a@company.com', width: { xs: 12, sm: 4 } },
              validation: [{ type: 'email', message: 'Email không hợp lệ' }],
            },
          },
        },
        address: {
          type: SchemaType.OBJECT,
          title: 'Address',
          propertyOrdering: ['country', 'city', 'street', 'zipCode'],
          properties: {
            country: {
              type: SchemaType.STRING,
              title: 'Country',
              ui: { placeholder: 'Chọn quốc gia', width: { xs: 12, sm: 6 } },
              options: {
                type: OptionSourceType.STATIC,
                options: [
                  { id: 'vn', label: 'Việt Nam' },
                  { id: 'sg', label: 'Singapore' },
                  { id: 'us', label: 'United States' },
                ],
              },
            },
            city: {
              type: SchemaType.STRING,
              title: 'City',
              ui: { placeholder: 'Hà Nội', width: { xs: 12, sm: 6 } },
            },
            street: {
              type: SchemaType.STRING,
              title: 'Street',
              ui: { placeholder: 'Số nhà, đường...', width: { xs: 12, sm: 8 } },
            },
            zipCode: {
              type: SchemaType.STRING,
              title: 'Zip code',
              ui: { placeholder: '100000', width: { xs: 12, sm: 4 } },
              pattern: '^[0-9]{4,10}$',
            },
          },
        },
      },
      propertyOrdering: ['profile', 'address'],
    }

    return (
      <SchemaForm
        schema={schema}
        className="space-y-4 rounded-2xl bg-surface p-6 shadow-sm"
        onSubmit={(values: any) => {
          alert(JSON.stringify(values, null, 2))
        }}
        renderFooter={() => (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
      />
    )
  },
}

export const SchemaDrivenVisibilityAndReadonly: Story = {
  render: () => {
    const schema: FormObjectSchema = {
      type: SchemaType.OBJECT,
      properties: {
        mode: {
          type: SchemaType.STRING,
          title: 'Mode',
          ui: { placeholder: 'Chọn chế độ', width: { xs: 12, sm: 4 } },
          options: {
            type: OptionSourceType.STATIC,
            options: [
              { id: 'auto', label: 'Auto' },
              { id: 'manual', label: 'Manual' },
              { id: 'danger', label: 'Danger' },
            ],
          },
          default: 'auto',
        },
        systemCode: {
          type: SchemaType.STRING,
          title: 'System code (readOnly)',
          ui: { placeholder: 'AUTO-001', width: { xs: 12, sm: 4 }, readOnly: true },
          default: 'AUTO-001',
        },
        notify: {
          type: SchemaType.BOOLEAN,
          title: 'Notify via email',
          ui: { width: { xs: 12, sm: 4 } },
        },
        email: {
          type: SchemaType.STRING,
          title: 'Email',
          format: 'email',
          ui: { placeholder: 'a@company.com', width: { xs: 12, sm: 6 } },
          visibility: [
            { when: { field: 'notify', op: '=', value: true }, effect: 'show' },
            { when: { field: 'notify', op: '=', value: true }, effect: 'require' },
            { when: { field: 'notify', op: '!=', value: true }, effect: 'unrequire' },
          ],
          validation: [{ type: 'email', message: 'Email không hợp lệ' }],
        },
        manualReason: {
          type: SchemaType.STRING,
          title: 'Manual reason',
          ui: { widget: 'textarea', rows: 3, placeholder: 'Vì sao chọn manual...', width: 12 },
          visibility: [
            { when: { field: 'mode', op: '=', value: 'manual' }, effect: 'show' },
            { when: { field: 'mode', op: '=', value: 'manual' }, effect: 'require' },
          ],
          validation: [{ type: 'required', message: 'Vui lòng nhập lý do' }],
        },
        quota: {
          type: SchemaType.INTEGER,
          title: 'Quota',
          ui: { placeholder: '0-100', width: { xs: 12, sm: 6 } },
          minimum: 0,
          maximum: 100,
          visibility: [{ when: { field: 'mode', op: '=', value: 'auto' }, effect: 'disable' }],
        },
        acceptDanger: {
          type: SchemaType.BOOLEAN,
          title: 'Tôi hiểu và đồng ý (danger)',
          ui: { width: 12 },
          visibility: [
            { when: { field: 'mode', op: '=', value: 'danger' }, effect: 'show' },
            { when: { field: 'mode', op: '=', value: 'danger' }, effect: 'require' },
          ],
        },
      },
      required: ['mode'],
      propertyOrdering: ['mode', 'systemCode', 'notify', 'email', 'manualReason', 'quota', 'acceptDanger'],
    }

    return (
      <SchemaForm
        schema={schema}
        className="space-y-4 rounded-2xl bg-surface p-6 shadow-sm"
        onSubmit={(values: any) => {
          alert(JSON.stringify(values, null, 2))
        }}
        renderFooter={() => (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
      />
    )
  },
}

export const SchemaDrivenValidationShowcase: Story = {
  render: () => {
    const schema: FormObjectSchema = {
      type: SchemaType.OBJECT,
      properties: {
        username: {
          type: SchemaType.STRING,
          title: 'Username',
          ui: { placeholder: 'your_name', width: { xs: 12, sm: 6 } },
          minLength: '3',
          maxLength: '20',
          pattern: '^[a-zA-Z0-9_]+$',
          validation: [{ type: 'required', message: 'Username là bắt buộc' }],
        },
        age: {
          type: SchemaType.INTEGER,
          title: 'Age',
          ui: { placeholder: '18-60', width: { xs: 12, sm: 6 } },
          validation: [{ type: 'number_range', min: 18, max: 60, message: 'Tuổi phải từ 18 đến 60' }],
        },
        website: {
          type: SchemaType.STRING,
          title: 'Website',
          ui: { placeholder: 'https://example.com', width: 12 },
          validation: [{ type: 'regex', pattern: '^https?://.+', message: 'Website phải bắt đầu bằng http/https' }],
        },
        bio: {
          type: SchemaType.STRING,
          title: 'Bio',
          ui: { widget: 'textarea', rows: 4, placeholder: 'Giới thiệu ngắn...', width: 12 },
          maxLength: '200',
        },
      },
      required: ['username'],
      propertyOrdering: ['username', 'age', 'website', 'bio'],
    }

    return (
      <SchemaForm
        schema={schema}
        className="space-y-4 rounded-2xl bg-surface p-6 shadow-sm"
        onSubmit={(values: any) => {
          alert(JSON.stringify(values, null, 2))
        }}
        renderFooter={() => (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
      />
    )
  },
}

export const SchemaDriven: Story = {
  render: () => {
    const schema: FormObjectSchema = {
      type: SchemaType.OBJECT,
      properties: {
        name: {
          type: SchemaType.STRING,
          title: 'Name',
          ui: { placeholder: 'Jane Cooper', width: { xs: 12, sm: 6 } },
          validation: [{ type: 'required', message: 'Name là bắt buộc' }],
        },
        email: {
          type: SchemaType.STRING,
          title: 'Email',
          ui: { placeholder: 'jane@company.com', width: { xs: 12, sm: 6 } },
          validation: [{ type: 'email', message: 'Email không hợp lệ' }],
        },
        role: {
          type: SchemaType.STRING,
          title: 'Role',
          ui: { placeholder: 'Chọn role', width: { xs: 12, sm: 6 } },
          options: {
            type: OptionSourceType.STATIC,
            options: [
              { id: 'admin', label: 'Admin' },
              { id: 'editor', label: 'Editor' },
              { id: 'viewer', label: 'Viewer' },
            ],
          },
          validation: [{ type: 'required', message: 'Role là bắt buộc' }],
        },
        department: {
          type: SchemaType.STRING,
          title: 'Department (lazy)',
          ui: { placeholder: 'Chọn phòng ban', width: { xs: 12, sm: 6 } },
          options: {
            type: OptionSourceType.TABLE,
            tableId: 'departments',
            valueField: 'id',
            labelField: 'name',
            searchField: 'name',
            limit: 50,
          },
        },
        startDate: {
          type: SchemaType.STRING,
          title: 'Start date',
          format: 'date',
          ui: { placeholder: 'dd/mm/yyyy', width: { xs: 12, sm: 6 } },
        },
        meetingAt: {
          type: SchemaType.STRING,
          title: 'Meeting at',
          format: 'date-time',
          ui: { placeholder: 'dd/mm/yyyy hh:mm', width: { xs: 12, sm: 6 } },
        },
        description: {
          type: SchemaType.STRING,
          title: 'Description (richtext)',
          ui: { widget: 'richtext', width: 12 },
        },
        attachments: {
          type: SchemaType.STRING,
          title: 'Attachments',
          ui: {
            widget: 'file',
            width: 12,
            file: { multiple: true, accept: 'image/*,.pdf', maxSizeMb: 5 },
          },
          validation: [
            { type: 'file_type', allowedTypes: ['image/*', 'application/pdf'], message: 'Chỉ cho phép ảnh hoặc PDF' },
            { type: 'file_size', maxSizeBytes: 5 * 1024 * 1024, message: 'Tối đa 5MB mỗi file' },
          ],
        },
        accept: {
          type: SchemaType.BOOLEAN,
          title: 'Tôi đồng ý điều khoản',
          ui: { width: 12 },
          visibility: [{ when: { field: 'role', op: '=', value: 'admin' }, effect: 'require' }],
        },
        note: {
          type: SchemaType.STRING,
          title: 'Note',
          ui: { placeholder: 'Ghi chú...', width: 12 },
          maxLength: '300',
          visibility: [{ when: { field: 'role', op: '=', value: 'admin' }, effect: 'show' }],
        },
        tags: {
          type: SchemaType.ARRAY,
          title: 'Tags (array of string)',
          ui: { width: 12 },
          minItems: '1',
          maxItems: '6',
          items: {
            type: SchemaType.STRING,
            title: 'Tag',
            ui: { placeholder: 'Nhập tag...' },
            validation: [{ type: 'required', message: 'Tag không được để trống' }],
          },
        },
        contacts: {
          type: SchemaType.ARRAY,
          title: 'Contacts (array of object)',
          ui: { width: 12 },
          minItems: '1',
          items: {
            type: SchemaType.OBJECT,
            title: 'Contact',
            propertyOrdering: ['fullName', 'phone', 'contactType', 'remark'],
            required: ['fullName'],
            properties: {
              fullName: {
                type: SchemaType.STRING,
                title: 'Full name',
                ui: { placeholder: 'Nguyễn Văn A', width: { xs: 12, sm: 6 } },
                validation: [{ type: 'required', message: 'Full name là bắt buộc' }],
              },
              phone: {
                type: SchemaType.STRING,
                title: 'Phone',
                ui: { placeholder: '+84...', width: { xs: 12, sm: 6 } },
                validation: [{ type: 'phone', message: 'Số điện thoại không hợp lệ' }],
              },
              contactType: {
                type: SchemaType.STRING,
                title: 'Type',
                ui: { placeholder: 'Chọn loại', width: { xs: 12, sm: 6 } },
                options: {
                  type: OptionSourceType.STATIC,
                  options: [
                    { id: 'primary', label: 'Primary' },
                    { id: 'secondary', label: 'Secondary' },
                  ],
                },
              },
              remark: {
                type: SchemaType.STRING,
                title: 'Remark',
                ui: { widget: 'textarea', rows: 3, placeholder: 'Ghi chú...', width: { xs: 12, sm: 6 } },
                maxLength: '200',
              },
            },
          },
        },
      },
      required: ['name', 'role'],
      propertyOrdering: [
        'name',
        'email',
        'role',
        'department',
        'startDate',
        'meetingAt',
        'description',
        'attachments',
        'accept',
        'note',
        'tags',
        'contacts',
      ],
    }

    return (
      <SchemaForm
        schema={schema}
        className="space-y-4 rounded-2xl bg-surface p-6 shadow-sm"
        optionsProvider={{
          fetchTableOptions: async (params) => {
            const { page, pageSize, search } = params
            await new Promise((r) => setTimeout(r, 250))
            const total = 80
            const all = Array.from({ length: total }, (_, i) => ({
              label: `Department ${i + 1}`,
              value: String(i + 1),
            }))
            const filtered = search
              ? all.filter((x) => x.label.toLowerCase().includes(search.toLowerCase()))
              : all
            const start = (page - 1) * pageSize
            const end = Math.min(start + pageSize, filtered.length)
            return {
              data: filtered.slice(start, end),
              hasMore: end < filtered.length,
            }
          },
        }}
        onSubmit={(values: any) => {
          const normalizeFiles = (v: any) => {
            if (typeof File !== 'undefined' && v instanceof File) return { name: v.name, size: v.size, type: v.type }
            if (Array.isArray(v) && typeof File !== 'undefined' && v.every((x) => x instanceof File)) {
              return v.map((x) => ({ name: x.name, size: x.size, type: x.type }))
            }
            return v
          }
          const safe = Object.fromEntries(Object.entries(values ?? {}).map(([k, v]) => [k, normalizeFiles(v)]))
          alert(JSON.stringify(safe, null, 2))
        }}
        renderFooter={() => (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
      />
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
