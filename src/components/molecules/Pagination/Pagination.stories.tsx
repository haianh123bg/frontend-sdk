import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    siblingCount: { control: 'number' },
  },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
}

export const ManyPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 100,
    siblingCount: 2,
  },
}
