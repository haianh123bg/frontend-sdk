import type { Meta, StoryObj } from '@storybook/react'
import { MotionShowcase } from './MotionShowcase'

const meta: Meta<typeof MotionShowcase> = {
  title: 'Animation/MotionShowcase',
  component: MotionShowcase,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof MotionShowcase>

export const Playground: Story = {}
