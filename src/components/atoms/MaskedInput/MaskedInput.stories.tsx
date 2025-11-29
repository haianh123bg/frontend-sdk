import type { Meta, StoryObj } from '@storybook/react'
import { MaskedInput } from './MaskedInput'

const meta = {
  title: 'Atoms/MaskedInput',
  component: MaskedInput,
  tags: ['autodocs'],
  args: {
    mask: 'XXXX-XXXX-XXXX',
    placeholder: '1234-5678-9012',
    placeholderChar: 'X',
  },
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof MaskedInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const PhoneNumber: Story = {
  args: {
    mask: '(XXX) XXX-XXXX',
    placeholder: '(555) 123-4567',
  },
}

export const CreditCard: Story = {
  args: {
    mask: 'XXXX-XXXX-XXXX-XXXX',
    placeholder: '0000-0000-0000-0000',
  },
}

export const DateInput: Story = {
  args: {
    mask: 'XX/XX/XXXX',
    placeholder: 'MM/DD/YYYY',
  },
}

export const ErrorState: Story = {
  args: {
    mask: 'XXX',
    error: true,
    defaultValue: '123',
  },
}
