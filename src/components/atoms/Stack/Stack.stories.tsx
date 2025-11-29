import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'

const meta = {
  title: 'Atoms/Stack',
  component: Stack,
  tags: ['autodocs'],
  args: {
    direction: 'vertical',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
  },
  argTypes: {
    direction: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around'],
    },
  },
} satisfies Meta<typeof Stack>

export default meta

type Story = StoryObj<typeof meta>

const Box = ({ className }: { className?: string }) => (
  <div className={`h-12 w-12 rounded bg-indigo-100 ${className}`} />
)

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    children: (
      <>
        <Box />
        <Box />
        <Box />
      </>
    ),
  },
}

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    children: (
      <>
        <Box />
        <Box />
        <Box />
      </>
    ),
  },
}

export const Nested: Story = {
  render: (args) => (
    <Stack {...args} className="rounded border border-gray-200 p-4">
      <div className="font-bold">Header</div>
      <Stack direction="horizontal" gap="sm">
        <Box className="flex-1" />
        <Box className="flex-1" />
      </Stack>
      <div className="text-sm text-gray-500">Footer</div>
    </Stack>
  ),
}
