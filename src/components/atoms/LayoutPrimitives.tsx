// File: src/components/atoms/LayoutPrimitives.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  gap?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

const gapMap = { none: '', sm: 'gap-2', md: 'gap-4', lg: 'gap-8' }
const padMap = { none: '', sm: 'p-2', md: 'p-4', lg: 'p-8' }

export const Box = ({ className, padding = 'none', ...props }: LayoutProps) => (
  <div className={twMerge(clsx(padMap[padding], className))} {...props} />
)

export const Row = ({ className, gap = 'none', ...props }: LayoutProps) => (
  <div className={twMerge(clsx('flex flex-row items-center', gapMap[gap], className))} {...props} />
)

export const Col = ({ className, gap = 'none', ...props }: LayoutProps) => (
  <div className={twMerge(clsx('flex flex-col', gapMap[gap], className))} {...props} />
)

export const Spacer = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
  const sizeMap = { sm: 'h-2 w-2', md: 'h-4 w-4', lg: 'h-8 w-8', xl: 'h-16 w-16' }
  return <div className={sizeMap[size]} />
}

export const Divider = ({ className }: { className?: string }) => (
  <hr className={twMerge(clsx('border-t border-slate-200', className))} />
)

export const Layout = Box
export const Content = Box
