import type { Meta, StoryObj } from '@storybook/react'
import { RevealOnScroll } from './RevealOnScroll'
import { MotionProvider } from '../MotionProvider'
import * as React from 'react'

const Demo: React.FC = () => {
  return (
    <MotionProvider>
      <div className="h-[420px] overflow-y-auto rounded-[32px] bg-gradient-to-b from-white via-amber-50 to-rose-50 p-8">
        <div className="space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <RevealOnScroll
              key={i}
              className="rounded-3xl border border-amber-100 bg-white p-6 text-slate-900 shadow-[0_20px_50px_rgba(249,115,22,0.12)]"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400">Reveal #{i}</p>
              <h4 className="mt-2 text-2xl font-semibold">Card chuyển động nhẹ nhàng</h4>
              <p className="mt-2 text-slate-500">
                Scroll xuống để thấy card tiếp theo tự động fade/slide vào viewport, sử dụng IntersectionObserver.
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </MotionProvider>
  )
}

const meta: Meta<typeof RevealOnScroll> = {
  title: 'Animation/RevealOnScroll',
  component: RevealOnScroll,
  render: () => <Demo />,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof RevealOnScroll>

export const ScrollDemo: Story = {}
