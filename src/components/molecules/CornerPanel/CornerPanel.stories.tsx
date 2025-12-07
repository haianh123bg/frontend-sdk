// File: src/components/molecules/CornerPanel/CornerPanel.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CornerPanel, type CornerPanelProps } from './CornerPanel'

const meta: Meta<typeof CornerPanel> = {
  title: 'Molecules/CornerPanel',
  component: CornerPanel,
}

export default meta

type Story = StoryObj<typeof CornerPanel>

export const Playground: Story = {
  render: (args: CornerPanelProps) => {
    const [open, setOpen] = useState(args.open ?? true)

    return (
      <div className="min-h-[300px] p-8">
        <button
          type="button"
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600"
          onClick={() => setOpen(true)}
       >
          Mở CornerPanel
        </button>

        <CornerPanel
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <p className="mb-2">
            Đây là CornerPanel trong SDK, nổi ở một góc màn hình và không chặn tương tác nền.
          </p>
          <p className="text-xs text-text-muted">
            Bạn có thể thay đổi position / size / animation trong controls của Storybook.
          </p>
        </CornerPanel>
      </div>
    )
  },
  args: {
    open: true,
    title: 'Corner panel demo',
    position: 'bottom-right',
    size: 'md',
    animation: 'slide-in',
  },
}

export const MultiplePositions: Story = {
  render: () => {
    return (
      <div className="min-h-[300px] p-8">
        <p className="mb-4 text-sm text-text-secondary">
          Demo nhiều CornerPanel ở các vị trí khác nhau.
        </p>
        <CornerPanel open title="Top left" position="top-left" size="sm" animation="slide-in">
          Panel nhỏ ở góc trên trái.
        </CornerPanel>
        <CornerPanel open title="Top right" position="top-right" size="sm" animation="slide-in">
          Panel nhỏ ở góc trên phải.
        </CornerPanel>
        <CornerPanel open title="Bottom left" position="bottom-left" size="sm" animation="slide-up">
          Panel nhỏ ở góc dưới trái.
        </CornerPanel>
        <CornerPanel open title="Bottom right" position="bottom-right" size="sm" animation="slide-up">
          Panel nhỏ ở góc dưới phải.
        </CornerPanel>
      </div>
    )
  },
}
