import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './IconButton'
import {
  Calendar,
  Clock,
  Search,
  Settings,
  ArrowUp,
  ArrowDown,
  BellRing,
  User,
  Plus,
  Trash2,
  RefreshCcw,
} from 'lucide-react'

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'inline-radio' },
    },
    variant: {
      options: ['default', 'primary', 'muted'],
      control: { type: 'inline-radio' },
    },
  },
}

export default meta

type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    icon: Calendar,
    variant: 'muted',
    size: 'sm',
  },
}

export const IconGallery: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {[Calendar, Clock, Search, Settings, ArrowUp, ArrowDown, BellRing, User, Plus, Trash2, RefreshCcw].map((IconComponent) => (
        <IconButton key={IconComponent.name} icon={IconComponent} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton icon={Calendar} size="xs" />
      <IconButton icon={Calendar} size="sm" />
      <IconButton icon={Calendar} size="md" />
      <IconButton icon={Calendar} size="lg" />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton icon={BellRing} variant="default" />
      <IconButton icon={BellRing} variant="primary" />
      <IconButton icon={BellRing} variant="muted" />
    </div>
  ),
}
