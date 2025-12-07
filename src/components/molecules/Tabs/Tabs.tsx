// File: src/components/molecules/Tabs/Tabs.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  className?: string
  noBorder?: boolean
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, onChange, className, noBorder }) => {
  const dispatch = useDispatchAction()
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    dispatch(EventType.UI_CLICK, { tabId }, { meta: { component: 'Tabs' } })
    onChange?.(tabId)
  }

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div className={twMerge(clsx('w-full', className))}>
      <div
        className={twMerge(
          clsx('flex gap-1', !noBorder && 'border-b border-slate-200')
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={twMerge(
              clsx(
                'px-4 py-2 text-sm font-medium transition-all rounded-t-lg',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                activeTab === tab.id
                  ? noBorder
                    ? 'bg-surface text-primary-500'
                    : 'bg-surface text-primary-500 border-b-2 border-primary-500'
                  : 'text-text-secondary hover:text-text-primary hover:bg-slate-50',
                tab.disabled && 'opacity-50 cursor-not-allowed'
              )
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">{activeTabContent}</div>
    </div>
  )
}

Tabs.displayName = 'Tabs'
