import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { AvatarUpload } from './AvatarUpload'
import { Form } from '../../organisms/Form/Form'
import { FormFieldController } from '../FormField/FormFieldController'
import { Button } from '../../atoms/Button/Button'

const meta = {
  title: 'Molecules/AvatarUpload',
  component: AvatarUpload,
  tags: ['autodocs'],
  args: {
    shape: 'circle',
    size: 'md',
  },
  argTypes: {
    shape: { control: 'radio', options: ['circle', 'square', 'rect'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    allowReplace: { control: 'boolean' },
    allowClear: { control: 'boolean' },
  },
} satisfies Meta<typeof AvatarUpload>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Rect: Story = {
  args: {
    shape: 'rect',
  },
}

export const WithForm: Story = {
  render: (args) => {
    const methods = useForm<{ avatar: File | null }>({
      defaultValues: { avatar: null },
    })

    return (
      <Form
        methods={methods}
        onSubmit={(values) => {
          const f = values.avatar
          alert(
            JSON.stringify(
              {
                avatar: f
                  ? {
                      name: f.name,
                      size: f.size,
                      type: f.type,
                      lastModified: f.lastModified,
                    }
                  : null,
              },
              null,
              2
            )
          )
        }}
        className="space-y-4 rounded-2xl bg-surface p-6 shadow-sm"
      >
        <FormFieldController<{ avatar: File | null }>
          name="avatar"
          label="Avatar"
          render={({ field }) => (
            <AvatarUpload
              {...args}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </Form>
    )
  },
}
