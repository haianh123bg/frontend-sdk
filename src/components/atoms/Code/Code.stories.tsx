import type { Meta, StoryObj } from '@storybook/react'
import { Code } from './Code'

const meta = {
  title: 'Atoms/Code',
  component: Code,
  tags: ['autodocs'],
  args: {
    children: 'npm install redai-fe-sdk',
    block: false,
  },
  argTypes: {
    block: { control: 'boolean' },
  },
} satisfies Meta<typeof Code>

export default meta

type Story = StoryObj<typeof meta>

export const Inline: Story = {}

export const Block: Story = {
  args: {
    block: true,
    children: `function greet(name) {
  return "Hello, " + name;
}

console.log(greet("World"));`,
  },
}
