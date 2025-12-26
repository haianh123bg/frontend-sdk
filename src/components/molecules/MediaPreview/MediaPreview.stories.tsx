import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { MediaPreview, type MediaPreviewItem, type MediaPreviewProps } from './MediaPreview'

const buildItems = (): MediaPreviewItem[] => [
  {
    id: 'img-1',
    type: 'image',
    title: 'Ảnh',
    src: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'vid-1',
    type: 'video',
    title: 'Video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'aud-1',
    type: 'audio',
    title: 'Audio',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
  },
  {
    id: 'pdf-1',
    type: 'pdf',
    title: 'PDF',
    src: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  },
  {
    id: 'if-1',
    type: 'iframe',
    title: 'Iframe',
    src: 'https://example.com',
  },
]

const Harness = (args: MediaPreviewProps) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState<number>(args.initialIndex ?? 0)

  return (
    <div style={{ padding: 16 }}>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setOpen(true)}>Open Media Preview</Button>
        <Button
          variant="secondary"
          onClick={() => {
            setIndex(0)
            setOpen(true)
          }}
        >
          Open from first
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setIndex(3)
            setOpen(true)
          }}
        >
          Open from PDF
        </Button>
      </div>

      <MediaPreview
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        items={args.items ?? buildItems()}
        index={index}
        onIndexChange={setIndex}
      />
    </div>
  )
}

const meta = {
  title: 'Molecules/MediaPreview',
  component: MediaPreview,
  tags: ['autodocs'],
  args: {
    open: false,
    items: buildItems(),
    initialIndex: 0,
    modalSize: 'xl',
  },
  argTypes: {
    open: { control: 'boolean' },
    modalSize: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    initialIndex: { control: { type: 'number', min: 0, max: 10, step: 1 } },
  },
} satisfies Meta<typeof MediaPreview>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Harness {...args} />,
}
