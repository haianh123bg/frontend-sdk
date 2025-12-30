import type { Meta, StoryObj } from '@storybook/react'
import { FileUploader } from './FileUploader'

const meta = {
  title: 'Molecules/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  args: {
    multiple: false,
    maxSizeMb: 5,
    mode: 'dropzone',
    size: 'md',
    variant: 'outline',
  },
  argTypes: {
    multiple: { control: 'boolean' },
    maxSizeMb: { control: 'number' },
    maxFiles: { control: 'number' },
    mode: { control: 'radio', options: ['dropzone', 'button'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'radio', options: ['outline', 'soft'] },
    fileListLayout: { control: 'radio', options: ['vertical', 'horizontal', 'wrap'] },
    disabled: { control: 'boolean' },
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

export const ReplaceOnSelect: Story = {
  args: {
    multiple: true,
    appendOnSelect: false,
    helperText: 'Multiple=true but replace files on each select (appendOnSelect=false)',
  },
}

export const ImageOnly: Story = {
  args: {
    accept: 'image/*',
  },
}

export const ButtonMode: Story = {
  args: {
    mode: 'button',
    helperText: 'Upload attachments (button-only mode)',
  },
}

export const CompactSoft: Story = {
  args: {
    size: 'sm',
    variant: 'soft',
  },
}

export const LimitedFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 2,
  },
}

export const HorizontalList: Story = {
  args: {
    multiple: true,
    fileListLayout: 'horizontal',
    helperText: 'Selected files will scroll horizontally when overflow.',
  },
}

export const WrapList: Story = {
  args: {
    multiple: true,
    fileListLayout: 'wrap',
    helperText: 'Selected files will wrap to next line when overflow (no horizontal scroll).',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
