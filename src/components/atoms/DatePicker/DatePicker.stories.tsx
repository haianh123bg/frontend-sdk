import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'

const meta = {
  title: 'Atoms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    defaultValue: '2024-01-01',
  },
}

export const WithError: Story = {
  args: {
    error: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '2024-01-01',
  },
}
