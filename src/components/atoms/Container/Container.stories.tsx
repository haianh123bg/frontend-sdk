import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta = {
  title: 'Atoms/Container',
  component: Container,
  tags: ['autodocs'],
  args: {
    maxWidth: 'xl',
    padding: true,
    className: 'bg-gray-50 border border-dashed border-gray-300 h-32',
    children: 'Container Content',
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    padding: { control: 'boolean' },
  },
} satisfies Meta<typeof Container>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: {
    maxWidth: 'sm',
  },
}

export const FullWidth: Story = {
  args: {
    maxWidth: 'full',
  },
}
