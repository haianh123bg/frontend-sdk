// File: src/components/molecules/DisplayComponents.tsx
import * as React from 'react'
import { clsx } from 'clsx'

export const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={clsx("inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10", className)}>{children}</span>
)

export const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img alt="" className={clsx("rounded-xl bg-slate-100", props.className)} {...props} />
)

export const Icon = ({ name, className }: { name: string; className?: string }) => (
  <span className={clsx("material-icons", className)}>{name}</span>
)

export const Markdown = ({ content }: { content: string }) => (
  <div className="prose prose-slate">{content}</div>
)

export const Chart = () => (
  <div className="flex h-64 w-full items-center justify-center rounded-xl bg-slate-50 text-slate-400">
    Chart Placeholder
  </div>
)
