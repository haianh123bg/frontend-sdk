import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../../atoms/Input/Input'
import { FormField } from './FormField'

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  args: {
    label: 'Username',
    required: false,
    htmlFor: 'username-field',
    children: <Input id="username-field" placeholder="Enter username" />,
  },
  argTypes: {
    required: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof FormField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Required: Story = {
  args: {
    label: 'Email',
    required: true,
    htmlFor: 'email-field',
    children: <Input id="email-field" type="email" placeholder="Enter email" />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters',
    required: true,
    htmlFor: 'password-field',
    children: <Input id="password-field" type="password" error />,
  },
}
