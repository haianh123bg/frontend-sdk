// File: src/components/atoms/Chip/Chip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'
import type { ChipVariant, ChipSize } from './Chip'
import { Flag, User } from 'lucide-react'

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'outline'] satisfies ChipVariant[],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies ChipSize[],
    },
    onDelete: { action: 'delete' },
    onClick: { action: 'click' },
  },
  args: {
    variant: 'outline' as ChipVariant,
    size: 'sm' as ChipSize,
    label: 'Chip label',
  },
} satisfies Meta<typeof Chip>

export default meta

type Story = StoryObj<typeof meta>

export const Outline: Story = {}

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Active filter',
  },
}

export const WithStartIcon: Story = {
  args: {
    variant: 'outline',
    label: 'With icon',
    startIcon: <Flag className="h-3 w-3" />,
  },
}

export const WithEndIcon: Story = {
  args: {
    variant: 'outline',
    label: 'Assignee',
    endIcon: <User className="h-3 w-3" />,
  },
}

export const Deletable: Story = {
  args: {
    variant: 'primary',
    label: 'Status: To-do',
    onDelete: () => {},
  },
}
