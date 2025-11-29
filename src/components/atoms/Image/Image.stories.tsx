import type { Meta, StoryObj } from '@storybook/react'
import { Image } from './Image'

const meta = {
  title: 'Atoms/Image',
  component: Image,
  tags: ['autodocs'],
  args: {
    src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    alt: 'Abstract gradient',
    aspectRatio: '16/9',
    objectFit: 'cover',
  },
  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['1/1', '16/9', '4/3', '3/2'],
    },
    objectFit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none'],
    },
  },
} satisfies Meta<typeof Image>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithFallback: Story = {
  args: {
    src: 'invalid-url',
    fallback: 'https://placehold.co/600x400?text=Fallback+Image',
  },
}

export const Square: Story = {
  args: {
    aspectRatio: '1/1',
    className: 'w-64',
  },
}
