// File: src/components/organisms/DashboardLayout/DashboardLayout.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface DashboardLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  className?: string
}

export const DashboardLayout = ({
  children,
  sidebar,
  header,
  className,
}: DashboardLayoutProps) => {
  const dispatch = useDispatchAction()

  React.useEffect(() => {
    dispatch(EventType.NAV_ROUTE, { component: 'DashboardLayout' }, { meta: { timestamp: Date.now() } })
  }, [dispatch])

  return (
    <div className="flex min-h-screen w-full bg-background text-text-primary">
      {/* Sidebar */}
      {sidebar && (
        <aside className="hidden w-64 flex-col gap-4 bg-surface p-6 lg:flex">
           {sidebar}
        </aside>
      )}

      <div className="flex flex-1 flex-col">
        {/* Header */}
        {header && (
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-background/80 px-6 backdrop-blur-sm">
            {header}
          </header>
        )}

        {/* Main Content */}
        <main className={twMerge(clsx('flex-1 p-6', className))}>
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
