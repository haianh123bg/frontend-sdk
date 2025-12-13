import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Animated, type AnimatedProps } from './Animated'
import { animationPresets, type AnimationPresetName } from './presets'

const meta: Meta<typeof Animated> = {
  title: 'Utilities/Animation',
  component: Animated,
  argTypes: {
    preset: {
      control: 'select',
      options: Object.keys(animationPresets),
    },
  },
}

export default meta

type Story = StoryObj<typeof Animated>

export const Playground: Story = {
  render: (args: AnimatedProps) => {
    const [open, setOpen] = useState(true)

    return (
      <div className="min-h-[260px] p-8">
        <button
          type="button"
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
          onClick={() => setOpen((v) => !v)}
        >
          Toggle
        </button>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {open && (
              <Animated
                key="box"
                {...args}
                className={
                  args.className ??
                  'inline-flex items-center gap-2 rounded-2xl bg-surface px-5 py-4 text-sm text-text-primary'
                }
              >
                <span className="inline-block h-2 w-2 rounded-full bg-primary-500" />
                Animated preset: <span className="font-semibold">{String(args.preset ?? 'fade')}</span>
              </Animated>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  },
  args: {
    preset: 'fadeUp',
  },
}

export const PresetGallery: Story = {
  render: () => {
    const [active, setActive] = useState<string | null>(null)

    return (
      <div className="min-h-[360px] p-8">
        <div className="mb-4 text-sm text-text-secondary">Click vào từng preset để xem hiệu ứng.</div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {Object.keys(animationPresets).map((name) => (
            <button
              key={name}
              type="button"
              className="rounded-xl bg-surface-alt px-3 py-2 text-left text-xs text-text-primary hover:bg-slate-200"
              onClick={() => setActive(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {active && (
              <Animated
                key={active}
                preset={active as AnimationPresetName}
                className="inline-flex items-center rounded-2xl bg-surface px-5 py-4 text-sm text-text-primary"
              >
                Preset: <span className="ml-2 font-semibold">{active}</span>
              </Animated>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  },
}
