import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './RadioGroup'

const meta = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    name: 'subscription-plan',
    options: [
      { label: 'Free', value: 'free' },
      { label: 'Pro', value: 'pro' },
      { label: 'Enterprise', value: 'enterprise' },
    ],
    orientation: 'vertical',
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    error: { control: 'boolean' },
  },
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Vertical: Story = {}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
}

export const WithDisabledOption: Story = {
  args: {
    options: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b', disabled: true },
      { label: 'Option C', value: 'c' },
    ],
  },
}

export const ErrorState: Story = {
  args: {
    error: true,
  },
}
