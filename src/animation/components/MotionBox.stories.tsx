import type { Meta, StoryObj } from '@storybook/react'
import { MotionBox } from './MotionBox'
import { MotionProvider } from '../MotionProvider'
import { useFadeIn } from '../hooks/useFadeIn'
import { useStaggerChildren } from '../hooks/useStaggerChildren'
import { m } from 'framer-motion'
import * as React from 'react'

const Demo: React.FC = () => {
  const fadeIn = useFadeIn({ offsetY: 24 })
  const { container, item } = useStaggerChildren({ stagger: 0.12 })

  return (
    <MotionProvider>
      <div className="rounded-[32px] bg-gradient-to-br from-rose-50 via-amber-50 to-white p-8">
        <MotionBox
          {...fadeIn}
          className="mx-auto max-w-xl rounded-3xl border border-amber-100 bg-white p-8 text-slate-900 shadow-[0_20px_60px_rgba(249,115,22,0.15)]"
        >
          <h3 className="text-2xl font-semibold text-slate-900">MotionBox + Hooks</h3>
          <p className="mt-2 text-slate-500">Fade-in preset và danh sách stagger.</p>

          <m.ul variants={container} initial="hidden" animate="show" className="mt-6 space-y-3">
            {["Chuẩn hoá motion", "Giảm lặp code", "Dễ tái sử dụng"].map((text) => (
              <MotionBox
                key={text}
                variants={item}
                className="rounded-2xl border border-amber-100 bg-amber-50/60 px-4 py-3 text-sm text-slate-700"
              >
                {text}
              </MotionBox>
            ))}
          </m.ul>
        </MotionBox>
      </div>
    </MotionProvider>
  )
}

const meta: Meta<typeof MotionBox> = {
  title: 'Animation/MotionBox',
  component: MotionBox,
  render: () => <Demo />,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof MotionBox>

export const Playground: Story = {}
