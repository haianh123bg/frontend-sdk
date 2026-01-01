import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { SlideInPanel } from './SlideInPanel'

const Template: React.FC<{ direction: Parameters<typeof SlideInPanel>[0]['direction'] }> = ({ direction }) => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(false)
  }, [direction])

  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white">
      <button
        className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-lg"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? 'Đóng panel' : `Mở form (${direction})`}
      </button>

      <SlideInPanel
        open={open}
        direction={direction}
        onClose={() => setOpen(false)}
        className="p-6"
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-500">Slide In Panel</p>
            <h3 className="text-xl font-semibold text-slate-900">Tạo form nhập liệu</h3>
            <p className="text-sm text-slate-500">Tùy chọn hướng trượt, overlay và kích thước panel.</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500">Tên agent</label>
            <input className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Nhập tên" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500">Mô tả</label>
            <textarea className="h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Mục tiêu cuộc gọi..." />
          </div>
          <div className="flex justify-end gap-2">
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm" onClick={() => setOpen(false)}>
              Hủy
            </button>
            <button className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white">Lưu</button>
          </div>
        </div>
      </SlideInPanel>
    </div>
  )
}

const meta: Meta<typeof SlideInPanel> = {
  title: 'Animation/SlideInPanel',
  component: SlideInPanel,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof SlideInPanel>

export const FromRight: Story = {
  render: () => <Template direction="right" />,
}

export const FromBottom: Story = {
  render: () => <Template direction="bottom" />,
}
