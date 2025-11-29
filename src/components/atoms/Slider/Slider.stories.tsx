import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'

const meta = {
  title: 'Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
  },
  argTypes: {
    showValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Range0to10: Story = {
  args: {
    min: 0,
    max: 10,
    step: 0.5,
    defaultValue: 5,
  },
}

export const HiddenLabels: Story = {
  args: {
    showValue: false,
    defaultValue: 75,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 30,
  },
}
