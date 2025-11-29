import type { Meta, StoryObj } from '@storybook/react'
import { Caption, Label, Text, Title, Typography } from './TypographyPrimitives'

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  subcomponents: { Title, Text, Caption, Label } as any,
  tags: ['autodocs'],
  args: {
    children: 'Typography Content',
  },
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default Paragraph',
  },
}

export const Primitives: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <span className="text-xs text-gray-400">Title</span>
        <Title>Section Header</Title>
      </div>
      <div>
        <span className="text-xs text-gray-400">Text</span>
        <Text>
          This is a standard body text used for paragraphs and descriptions. It has good readability and standard line
          height.
        </Text>
      </div>
      <div>
        <span className="text-xs text-gray-400">Label</span>
        <Label>Input Label</Label>
      </div>
      <div>
        <span className="text-xs text-gray-400">Caption</span>
        <Caption>Helper text or metadata caption.</Caption>
      </div>
    </div>
  ),
}
