import type { Meta, StoryObj } from '@storybook/react'
import { MagneticCard } from './MagneticCard'
import { MotionProvider } from '../MotionProvider'
import { Sparkles } from 'lucide-react'
import * as React from 'react'

const DemoLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MotionProvider>
    <div className="min-h-[320px] rounded-[32px] bg-gradient-to-br from-white via-rose-50 to-amber-50 p-10">
      <div className="grid gap-6 md:grid-cols-2">{children}</div>
    </div>
  </MotionProvider>
)

const meta: Meta<typeof MagneticCard> = {
  title: 'Animation/MagneticCard',
  component: MagneticCard,
  decorators: [
    (Story) => (
      <DemoLayout>
        <Story />
      </DemoLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof MagneticCard>

export const Playground: Story = {
  args: {
    children: (
      <div>
        <div className="flex items-center gap-2 text-amber-500">
          <Sparkles size={16} />
          <span className="text-xs uppercase tracking-[0.3em]">Magnetic</span>
        </div>
        <h4 className="mt-2 text-xl font-semibold text-slate-900">Thẻ tương tác theo chuột</h4>
        <p className="mt-1 text-slate-500">
          Trỏ chuột để cảm nhận hiệu ứng “hít” nhẹ giúp UI sống động hơn.
        </p>
      </div>
    ),
  },
}

export const StrongerMagnet: Story = {
  args: {
    strength: 0.4,
    children: (
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-rose-500">Hover me</p>
        <h4 className="mt-2 text-xl font-semibold text-slate-900">Độ nhạy cao hơn</h4>
        <p className="mt-1 text-slate-500">Có thể điều chỉnh strength để phù hợp branding.</p>
      </div>
    ),
  },
}
