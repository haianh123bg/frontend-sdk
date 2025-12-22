import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../atoms/Button/Button'
import { CornerPanel } from '../../molecules/CornerPanel/CornerPanel'

export interface ViewSettingsMenuItem {
  id: string
  label: string
  type?: 'group' | 'item'
  icon?: React.ReactNode
  description?: string
  children?: ViewSettingsMenuItem[]
  onClick?: () => void
}

export interface ViewSettingsPanelProps {
  items: ViewSettingsMenuItem[]
  open: boolean
  onClose?: () => void
}

export const ViewSettingsPanel: React.FC<ViewSettingsPanelProps> = ({ items, open, onClose }) => {
  // Stack lưu trữ lịch sử navigation: [root, child1, child2...]
  // Mỗi phần tử trong stack là danh sách items của level đó và title của level đó
  const [history, setHistory] = React.useState<{ title: string; items: ViewSettingsMenuItem[] }[]>([
    { title: 'Xem cài đặt', items },
  ])

  // Reset history khi đóng panel
  React.useEffect(() => {
    if (!open) {
      // Delay một chút để animation đóng panel chạy xong nếu cần, hoặc reset luôn
      const timer = setTimeout(() => {
        setHistory([{ title: 'Xem cài đặt', items }])
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open, items])

  const currentLevel = history[history.length - 1]

  const handleNavigate = (item: ViewSettingsMenuItem) => {
    if (item.children && item.type !== 'group') {
      setHistory((prev) => [...prev, { title: item.label, items: item.children! }])
    } else if (item.onClick) {
      item.onClick()
    }
  }

  const handleBack = () => {
    setHistory((prev) => {
      if (prev.length <= 1) return prev
      return prev.slice(0, prev.length - 1)
    })
  }

  const renderItem = (item: ViewSettingsMenuItem) => {
    if (item.type === 'group') {
      return (
        <div key={item.id} className="flex flex-col gap-1 py-2 first:pt-0">
          <div className="px-3 py-1 text-xs font-medium uppercase text-text-muted">
            {item.label}
          </div>
          {item.children?.map(child => renderItem(child))}
        </div>
      )
    }

    return (
      <button
        key={item.id}
        onClick={() => handleNavigate(item)}
        className={twMerge(
          clsx(
            'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
            'hover:bg-slate-50 active:bg-slate-100'
          )
        )}
      >
        <div className="flex items-center gap-3">
          {item.icon && <span className="text-text-secondary">{item.icon}</span>}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-text-primary">{item.label}</span>
            {item.description && (
              <span className="text-xs text-text-secondary">{item.description}</span>
            )}
          </div>
        </div>
        {item.children && <ChevronRight size={16} className="text-text-muted" />}
      </button>
    )
  }

  const titleNode = (
    <div className="flex items-center gap-2">
      {history.length > 1 && (
        <Button
          size="sm"
          variant="ghost"
          className="-ml-2 h-8 w-8 px-0"
          onClick={handleBack}
          aria-label="Back"
        >
          <ChevronLeft size={16} />
        </Button>
      )}
      <span>{currentLevel.title}</span>
    </div>
  )

  return (
    <CornerPanel
      open={open}
      onClose={onClose}
      title={titleNode}
      size="sm"
      className="flex flex-col"
    >
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          {currentLevel.items.map((item) => renderItem(item))}
        </div>
      </div>
    </CornerPanel>
  )
}
