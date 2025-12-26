import type { Meta, StoryObj } from '@storybook/react'
import { PatternBackground, type PatternBackgroundVariant } from './PatternBackground'
import { useRef } from 'react'

const demoPhotoUrl =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80'

const demoWidePhotoUrl =
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=2400&q=80'

const meta = {
  title: 'Atoms/PatternBackground',
  component: PatternBackground,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['checker', 'dots', 'grid', 'diagonal-stripes', 'crosshatch', 'conic', 'rings', 'image', 'image-scroll', 'image-follow-scroll'] satisfies PatternBackgroundVariant[],
    },
    color1: { control: 'color' },
    color2: { control: 'color' },
    size: { control: 'number' },
    offset: { control: 'number' },
    dotSize: { control: 'number' },
    lineSize: { control: 'number' },
    stripeSize: { control: 'number' },
    conicStep: { control: 'number' },
    imageUrl: { control: 'text' },
    imageSize: { control: 'text' },
    imageRepeat: { control: 'text' },
    imagePosition: { control: 'text' },
    scrollDuration: { control: 'number' },
    scrollX: { control: 'number' },
    scrollY: { control: 'number' },
    animate: { control: 'boolean' },
    followFactor: { control: 'number' },
    followFactorX: { control: 'number' },
    followFactorY: { control: 'number' },
  },
} satisfies Meta<typeof PatternBackground>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'checker',
    color1: 'rgb(108, 231, 221)',
    color2: 'rgb(250, 255, 178)',
    size: 60,
  },
  render: (args) => (
    <div className="h-64 w-[28rem] overflow-hidden rounded-xl border border-slate-200">
      <PatternBackground {...args} />
    </div>
  ),
}

export const ImageFollowScroll: Story = {
  render: () => {
    const scrollRef = useRef<HTMLDivElement | null>(null)

    return (
      <div className="relative h-64 w-[28rem] overflow-hidden rounded-xl border border-slate-200">
        <PatternBackground
          variant="image-follow-scroll"
          imageUrl={demoWidePhotoUrl}
          imageSize="1800px auto"
          imageRepeat="no-repeat"
          color1="#000000"
          followFactor={0.25}
          scrollContainerRef={scrollRef}
          className="absolute inset-0"
        />
        <div ref={scrollRef} className="relative z-10 h-full overflow-y-auto p-4">
          <div className="space-y-4">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-white/10 p-4 text-sm text-white backdrop-blur">
                Scroll item #{i + 1}
                <div className="mt-1 text-xs text-white/70">Background chỉ đổi khi bạn cuộn</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

export const Variants: Story = {
  render: () => {
    const variants: PatternBackgroundVariant[] = ['checker', 'dots', 'grid', 'diagonal-stripes', 'crosshatch', 'conic', 'rings']

    return (
      <div className="grid grid-cols-2 gap-4">
        {variants.map((variant) => (
          <div key={variant} className="relative h-40 overflow-hidden rounded-xl border border-slate-200">
            <PatternBackground
              variant={variant}
              color1="rgb(108, 231, 221)"
              color2="rgb(250, 255, 178)"
              size={48}
              className="absolute inset-0"
            />
            <div className="relative z-10 m-3 inline-flex rounded-lg bg-white/70 px-2 py-1 text-xs font-medium text-slate-900 backdrop-blur">
              {variant}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

export const ImageStatic: Story = {
  args: {
    variant: 'image',
    imageUrl: demoPhotoUrl,
    imageSize: 'cover',
    imageRepeat: 'no-repeat',
    imagePosition: 'center',
    color1: '#000000',
  },
  render: (args) => (
    <div className="relative h-64 w-[28rem] overflow-hidden rounded-xl border border-slate-200">
      <PatternBackground {...args} className="absolute inset-0" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur">
          Image static background
        </div>
      </div>
    </div>
  ),
}

export const ImageScroll: Story = {
  args: {
    variant: 'image-scroll',
    imageUrl: demoWidePhotoUrl,
    imageSize: '1200px auto',
    scrollDuration: 14,
    scrollX: 2600,
    scrollY: 0,
    color1: '#000000',
  },
  render: (args) => (
    <div className="relative h-64 w-[28rem] overflow-hidden rounded-xl border border-slate-200">
      <PatternBackground {...args} className="absolute inset-0" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur">
          Image scroll / moving background
        </div>
      </div>
    </div>
  ),
}

export const ScrollContainerWithMovingBg: Story = {
  render: () => (
    <div className="relative h-64 w-[28rem] overflow-hidden rounded-xl border border-slate-200">
      <PatternBackground
        variant="image-scroll"
        imageUrl={demoWidePhotoUrl}
        imageSize="1200px auto"
        scrollDuration={16}
        scrollX={3200}
        scrollY={0}
        color1="#000000"
        className="absolute inset-0"
      />
      <div className="relative z-10 h-full overflow-y-auto p-4">
        <div className="space-y-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-white/10 p-4 text-sm text-white backdrop-blur">
              Item #{i + 1}
              <div className="mt-1 text-xs text-white/70">Scroll nội dung, background vẫn tự chạy</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const WithContent: Story = {
  args: {
    variant: 'checker',
    color1: 'rgb(108, 231, 221)',
    color2: 'rgb(250, 255, 178)',
    size: 60,
  },
  render: (args) => (
    <div className="relative h-64 w-[28rem] overflow-hidden rounded-xl border border-slate-200">
      <PatternBackground {...args} className="absolute inset-0" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="rounded-xl bg-white/70 px-4 py-3 text-sm font-medium text-slate-900 backdrop-blur">
          PatternBackground
        </div>
      </div>
    </div>
  ),
}
