import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './Accordion'

const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    items: [
      { id: 'item1', title: 'Section 1', content: <p>Content for section 1</p> },
      { id: 'item2', title: 'Section 2', content: <p>Content for section 2</p> },
      { id: 'item3', title: 'Section 3', content: <p>Content for section 3</p> },
    ],
  },
  argTypes: {
    multiple: { control: 'boolean' },
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Multiple: Story = {
  args: {
    multiple: true,
  },
}

export const WithDisabledItem: Story = {
  args: {
    items: [
      { id: '1', title: 'General Settings', content: 'General settings content' },
      { id: '2', title: 'Privacy (Locked)', content: 'Privacy settings', disabled: true },
      { id: '3', title: 'Security', content: 'Security settings content' },
    ],
  },
}

export const PreOpened: Story = {
  args: {
    defaultOpenIds: ['item2'],
  },
}
