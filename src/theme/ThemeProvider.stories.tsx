import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { ThemeProvider, useTheme } from './ThemeProvider'
import { ThemeModeSwitch } from './ThemeModeSwitch'
import { themePresets } from './presets'
import { Button } from '../components/atoms/Button/Button'
import { GlassPanel } from '../components/atoms/GlassPanel/GlassPanel'
import { PatternBackground } from '../components/atoms/PatternBackground/PatternBackground'

const demoWidePhotoUrl =
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=2400&q=80'

const ThemeControls: React.FC = () => {
  const { themeName, mode, resolvedMode, setThemeName, setMode } = useTheme()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="mr-2 text-xs text-text-secondary">
        mode: <span className="font-medium text-text-primary">{mode}</span> / resolved:{' '}
        <span className="font-medium text-text-primary">{resolvedMode}</span>
      </div>

      <ThemeModeSwitch
        label="Dark"
        toggleSize={26}
        showSystemButton
        onModeChange={(nextMode) => setMode(nextMode)}
      />

      <div className="mx-2 h-4 w-px bg-slate-300/40" />

      {themePresets.map((t) => (
        <Button
          key={t.name}
          data-style={t.name === themeName ? 'primary' : 'secondary'}
          onClick={() => setThemeName(t.name)}
        >
          {t.name}
        </Button>
      ))}
    </div>
  )
}

const ThemeDemo: React.FC = () => {
  return (
    <div className="relative h-[28rem] w-[34rem] overflow-hidden rounded-xl border border-slate-200">
      <PatternBackground
        variant="image-scroll"
        imageUrl={demoWidePhotoUrl}
        imageSize="1400px auto"
        scrollDuration={18}
        scrollX={3600}
        scrollY={0}
        color1="#000000"
        className="absolute inset-0"
      />

      <div className="relative z-10 flex h-full flex-col gap-4 p-4">
        <GlassPanel tone="dark" className="p-4">
          <div className="text-sm font-semibold">Theme system demo</div>
          <div className="mt-1 text-xs text-white/70">Đổi mode + đổi themeName runtime</div>
          <div className="mt-3">
            <ThemeControls />
          </div>
        </GlassPanel>

        <div className="grid grid-cols-2 gap-4">
          <GlassPanel tone="dark" interactive className="p-4">
            <div className="text-sm font-semibold">Primary</div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <div className="text-xs text-white/70">bg-primary dùng CSS var</div>
            </div>
          </GlassPanel>

          <GlassPanel tone="dark" interactive className="p-4">
            <div className="text-sm font-semibold">Surface/Text</div>
            <div className="mt-1 text-xs text-white/70">Tailwind semantic tokens</div>
          </GlassPanel>
        </div>
      </div>
    </div>
  )
}

const meta = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeProvider>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    themes: themePresets,
    defaultThemeName: 'default',
    defaultMode: 'system',
    children: <ThemeDemo />,
  },
  render: (args) => <ThemeProvider {...args} />,
}
