import type { Meta, StoryObj } from '@storybook/react'
import { GlassPanel } from './GlassPanel'
import { PatternBackground } from '../PatternBackground/PatternBackground'

const demoWidePhotoUrl =
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=2400&q=80'

const meta = {
  title: 'Atoms/GlassPanel',
  component: GlassPanel,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['dark', 'light'] },
    blur: { control: 'select', options: ['sm', 'md', 'lg'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    rounded: { control: 'select', options: ['md', 'lg', 'xl', '2xl'] },
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof GlassPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tone: 'dark',
    blur: 'md',
    padding: 'md',
    rounded: 'lg',
    interactive: true,
    children: (
      <div>
        <div className="text-sm font-semibold">GlassPanel</div>
        <div className="mt-1 text-xs text-white/70">Glassmorphism / frosted glass style</div>
      </div>
    ),
  },
  render: (args) => (
    <div className="relative h-64 w-[28rem] overflow-hidden rounded-xl border border-slate-200">
      <PatternBackground
        variant="image-scroll"
        imageUrl={demoWidePhotoUrl}
        imageSize="1200px auto"
        scrollDuration={18}
        scrollX={3200}
        scrollY={0}
        color1="#000000"
        className="absolute inset-0"
      />
      <div className="relative z-10 flex h-full w-full items-center justify-center p-6">
        <GlassPanel {...args} className="w-full max-w-sm" />
      </div>
    </div>
  ),
}

export const ListItems: Story = {
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
          {Array.from({ length: 10 }).map((_, i) => (
            <GlassPanel key={i} tone="dark" interactive className="p-4">
              Item #{i + 1}
              <div className="mt-1 text-xs text-white/70">Nền mờ + blur (glassmorphism)</div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const LightTone: Story = {
  render: () => (
    <div className="relative h-64 w-[28rem] overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-200" />
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(14,165,233,0.25), transparent 40%), radial-gradient(circle at 80% 30%, rgba(168,85,247,0.22), transparent 45%), radial-gradient(circle at 50% 85%, rgba(34,197,94,0.18), transparent 45%)' }} />
      <div className="relative z-10 flex h-full w-full items-center justify-center p-6">
        <GlassPanel tone="light" blur="lg" className="w-full max-w-sm">
          <div className="text-sm font-semibold">Light glass</div>
          <div className="mt-1 text-xs text-text-secondary">Dùng trên nền sáng</div>
        </GlassPanel>
      </div>
    </div>
  ),
}
