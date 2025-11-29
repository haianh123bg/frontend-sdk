import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from './Grid'

const meta = {
  title: 'Atoms/Grid',
  component: Grid,
  tags: ['autodocs'],
  args: {
    cols: 3,
    gap: 'md',
    responsive: true,
  },
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    responsive: { control: 'boolean' },
  },
} satisfies Meta<typeof Grid>

export default meta

type Story = StoryObj<typeof meta>

const Box = () => <div className="h-24 rounded-lg bg-blue-100 p-4 text-center text-blue-800">Item</div>

export const Default: Story = {
  args: {
    children: Array(6)
      .fill(null)
      .map((_, i) => <Box key={i} />),
  },
}

export const TwelveColumns: Story = {
  args: {
    cols: 12,
    gap: 'sm',
    children: Array(12)
      .fill(null)
      .map((_, i) => <div key={i} className="h-12 rounded bg-green-100" />),
  },
}

export const Responsive: Story = {
  args: {
    cols: 4,
    responsive: true,
    children: Array(8)
      .fill(null)
      .map((_, i) => <Box key={i} />),
  },
}
