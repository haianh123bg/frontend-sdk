import type { Meta, StoryObj } from '@storybook/react'
import { SplitPane } from './SplitPane'

const meta = {
  title: 'Molecules/SplitPane',
  component: SplitPane,
  tags: ['autodocs'],
  args: {
    direction: 'horizontal',
    initialRatio: 0.5,
    className: 'h-64 w-full',
    children: [
      <div className="flex h-full w-full items-center justify-center bg-slate-100 p-4" key="one">
        Pane 1
      </div>,
      <div className="flex h-full w-full items-center justify-center bg-slate-200 p-4" key="two">
        Pane 2
      </div>,
    ],
  },
  argTypes: {
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    initialRatio: {
      control: { type: 'range', min: 0.1, max: 0.9, step: 0.1 },
    },
  },
} satisfies Meta<typeof SplitPane>

export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
}

export const CustomRatio: Story = {
  args: {
    initialRatio: 0.3,
  },
}
