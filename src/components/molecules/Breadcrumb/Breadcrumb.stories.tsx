import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile', href: '/settings/profile' },
    ],
  },
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomSeparator: Story = {
  args: {
    separator: '>',
    items: [
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops', href: '/products/electronics/laptops' },
    ],
  },
}
