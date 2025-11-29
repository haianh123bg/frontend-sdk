import type { Meta, StoryObj } from '@storybook/react'
import { DatetimePicker } from './DatetimePicker'

const meta = {
  title: 'Atoms/DatetimePicker',
  component: DatetimePicker,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof DatetimePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    defaultValue: '2024-01-01 09:30',
  },
}

export const WithError: Story = {
  args: {
    error: true,
    defaultValue: '2024-01-01 09:30',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '2024-01-01 09:30',
  },
}
