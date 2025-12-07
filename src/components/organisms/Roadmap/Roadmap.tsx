// File: src/components/organisms/Roadmap/Roadmap.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type RoadmapItemStatus = 'completed' | 'in-progress' | 'todo' | 'optional'

export interface RoadmapItem {
  id: string
  label: string
  description?: string
  href?: string
  status?: RoadmapItemStatus
  tag?: string
}

export interface RoadmapGroup {
  id: string
  title: string
  items: RoadmapItem[]
}

export interface RoadmapColumn {
  id: string
  title: string
  groups: RoadmapGroup[]
}

export interface RoadmapDto {
  title?: string
  description?: string
  columns: RoadmapColumn[]
}

export interface RoadmapProps extends React.HTMLAttributes<HTMLDivElement> {
  config: RoadmapDto
  orientation?: 'horizontal' | 'vertical'
  onItemClick?: (item: RoadmapItem) => void
}

const getStatusClasses = (status: RoadmapItemStatus | undefined) => {
  switch (status) {
    case 'completed':
      return {
        dot: 'bg-emerald-500',
        badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        item: 'border-emerald-100 bg-emerald-25',
      }
    case 'in-progress':
      return {
        dot: 'bg-sky-500',
        badge: 'border-sky-200 bg-sky-50 text-sky-700',
        item: 'border-sky-100 bg-sky-25',
      }
    case 'optional':
      return {
        dot: 'bg-slate-400',
        badge: 'border-slate-200 bg-slate-50 text-slate-600',
        item: 'border-dashed border-slate-200 bg-surface',
      }
    case 'todo':
    default:
      return {
        dot: 'bg-slate-300',
        badge: 'border-slate-200 bg-slate-50 text-slate-700',
        item: 'border-slate-200 bg-surface',
      }
  }
}

export const Roadmap: React.FC<RoadmapProps> = ({
  config,
  orientation = 'horizontal',
  onItemClick,
  className,
  ...rest
}) => {
  const isHorizontal = orientation === 'horizontal'

  const containerClass = twMerge(clsx('w-full', isHorizontal && 'overflow-x-auto', className))

  const columnsWrapperClass = clsx(
    'flex',
    isHorizontal ? 'gap-8 py-2' : 'flex-col gap-6 py-2'
  )

  const handleItemClick = (item: RoadmapItem) => {
    if (!onItemClick) return
    onItemClick(item)
  }

  return (
    <div className={containerClass} {...rest}>
      {config.title && (
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-text-primary">{config.title}</h2>
          {config.description && (
            <p className="mt-1 text-sm text-text-secondary">{config.description}</p>
          )}
        </div>
      )}

      <div className={columnsWrapperClass}>
        {config.columns.map((column) => (
          <div
            key={column.id}
            className={clsx(
              'flex min-w-[260px] max-w-[340px] flex-col gap-3 rounded-2xl bg-surface-alt p-3 shadow-sm',
              !isHorizontal && 'w-full'
            )}
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              {column.title}
            </div>

            <div className="space-y-3">
              {column.groups.map((group) => (
                <div
                  key={group.id}
                  className="rounded-2xl border border-slate-100 bg-surface p-3 shadow-xs"
                >
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                    {group.title}
                  </div>

                  <div className="relative pl-4">
                    <div className="absolute left-1 top-1 bottom-1 w-px bg-slate-200" />

                    <div className="space-y-2">
                      {group.items.map((item, index) => {
                        const statusClasses = getStatusClasses(item.status)
                        const clickable = !!(onItemClick || item.href)

                        const content = (
                          <div
                            className={twMerge(
                              clsx(
                                'relative flex items-start gap-2 rounded-xl border px-3 py-2 text-sm text-text-primary transition-colors',
                                clickable && 'cursor-pointer hover:bg-primary-50',
                                statusClasses.item,
                                index === 0 && 'mt-0'
                              )
                            )}
                          >
                            <div className="mt-1 flex h-2 w-2 flex-shrink-0 items-center justify-center">
                              <span
                                className={twMerge(
                                  clsx('block h-2 w-2 rounded-full', statusClasses.dot)
                                )}
                              />
                            </div>
                            <div className="flex flex-1 flex-col gap-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-medium text-text-primary">
                                  {item.label}
                                </span>
                                {item.tag && (
                                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-text-secondary">
                                    {item.tag}
                                  </span>
                                )}
                                {item.status && (
                                  <span
                                    className={twMerge(
                                      clsx(
                                        'rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide',
                                        statusClasses.badge
                                      )
                                    )}
                                  >
                                    {item.status === 'completed' && 'Done'}
                                    {item.status === 'in-progress' && 'In progress'}
                                    {item.status === 'todo' && 'Todo'}
                                    {item.status === 'optional' && 'Optional'}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs text-text-secondary">{item.description}</p>
                              )}
                            </div>
                          </div>
                        )

                        if (item.href) {
                          return (
                            <a
                              key={item.id}
                              href={item.href}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => handleItemClick(item)}
                            >
                              {content}
                            </a>
                          )
                        }

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleItemClick(item)}
                            className="w-full text-left"
                          >
                            {content}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Roadmap.displayName = 'Roadmap'
