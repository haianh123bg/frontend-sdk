import type { Meta, StoryObj } from '@storybook/react'
import { SpotlightCard } from './SpotlightCard'
import { MotionProvider } from '../MotionProvider'
import * as React from 'react'

const DecorativeBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MotionProvider>
    <div className="min-h-[320px] rounded-[32px] bg-gradient-to-br from-slate-100 via-white to-rose-50 p-10">
      <div className="grid gap-6 md:grid-cols-2">{children}</div>
    </div>
  </MotionProvider>
)

const meta: Meta<typeof SpotlightCard> = {
  title: 'Animation/SpotlightCard',
  component: SpotlightCard,
  decorators: [
    (Story) => (
      <DecorativeBackground>
        <Story />
      </DecorativeBackground>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof SpotlightCard>

export const Default: Story = {
  args: {
    children: (
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-amber-500">Spotlight</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">Theo dõi vị trí chuột</h3>
        <p className="mt-1 text-slate-500">Hover để thấy vùng chiếu sáng di chuyển mềm mại.</p>
      </div>
    ),
  },
}

export const WithCTA: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-500">Invite</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">Chào mừng agent mới</h3>
          <p className="mt-1 text-slate-500">Tạo cảm giác premium cho card bằng hiệu ứng spotlight.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white">
          Kích hoạt ngay
        </button>
      </div>
    ),
  },
}
