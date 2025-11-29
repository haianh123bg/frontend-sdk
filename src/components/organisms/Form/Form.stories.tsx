import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { Button } from '../../atoms/Button/Button'
import { Input } from '../../atoms/Input/Input'
import { Textarea } from '../../atoms/Textarea/Textarea'
import { Form } from './Form'

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

export const Default: Story = {
  render: () => <BasicForm />,
}
