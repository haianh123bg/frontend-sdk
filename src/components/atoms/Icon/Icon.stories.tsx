import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  },
}

export const Sizes: Story = {
  args: {
    children: <circle cx="12" cy="12" r="10" />,
  },
  render: () => (
    <div className="flex items-end gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon size={size}>
            <circle cx="12" cy="12" r="10" />
          </Icon>
          <span className="text-xs text-gray-500">{size}</span>
        </div>
      ))}
    </div>
  ),
}
