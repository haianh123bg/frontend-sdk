// File: src/components/atoms/TypographyPrimitives.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement | HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label'
  className?: string
}

export const Typography = ({ as: Component = 'p', className, ...props }: TextProps) => {
  return <Component className={twMerge(clsx('text-text-primary', className))} {...(props as any)} />
}

export const Title = ({ className, ...props }: TextProps) => (
  <Typography as="h2" className={twMerge(clsx('text-2xl font-bold text-text-primary', className))} {...props} />
)

export const Text = ({ className, ...props }: TextProps) => (
  <Typography as="p" className={twMerge(clsx('text-base text-text-primary', className))} {...props} />
)

export const Caption = ({ className, ...props }: TextProps) => (
  <Typography as="span" className={twMerge(clsx('text-xs text-text-muted', className))} {...props} />
)

export const Label = ({ className, ...props }: TextProps) => (
  <Typography as="label" className={twMerge(clsx('text-sm font-medium text-text-secondary', className))} {...props} />
)
