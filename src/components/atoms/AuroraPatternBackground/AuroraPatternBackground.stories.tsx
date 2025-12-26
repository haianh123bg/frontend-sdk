import type { Meta, StoryObj } from '@storybook/react'
import { AuroraPatternBackground } from './AuroraPatternBackground'

const meta = {
  title: 'Atoms/AuroraPatternBackground',
  component: AuroraPatternBackground,
  tags: ['autodocs'],
  argTypes: {
    duration: { control: 'number' },
    rotate: { control: 'number' },
    inset: { control: 'number' },
    background: { control: 'color' },
    animate: { control: 'boolean' },
  },
} satisfies Meta<typeof AuroraPatternBackground>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    duration: 150,
    rotate: -45,
    inset: -145,
    background: '#000000',
    animate: true,
  },
  render: (args) => (
    <div className="relative h-64 w-[28rem] overflow-hidden rounded-xl border border-slate-200">
      <AuroraPatternBackground {...args} />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur">
          AuroraPatternBackground
        </div>
      </div>
    </div>
  ),
}

export const Faster: Story = {
  args: {
    duration: 40,
    rotate: -45,
    inset: -145,
    background: '#000000',
    animate: true,
  },
  render: (args) => (
    <div className="relative h-64 w-[28rem] overflow-hidden rounded-xl border border-slate-200">
      <AuroraPatternBackground {...args} />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur">
          Faster animation
        </div>
      </div>
    </div>
  ),
}
