import type { Meta, StoryObj } from '@storybook/react'
import { FileUploader } from './FileUploader'

const meta = {
  title: 'Molecules/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  args: {
    multiple: false,
    maxSizeMb: 5,
  },
  argTypes: {
    multiple: { control: 'boolean' },
    maxSizeMb: { control: 'number' },
  },
} satisfies Meta<typeof FileUploader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Multiple: Story = {
  args: {
    multiple: true,
  },
}

export const ImageOnly: Story = {
  args: {
    accept: 'image/*',
  },
}
