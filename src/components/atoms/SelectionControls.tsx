// File: src/components/atoms/SelectionControls.tsx
import * as React from 'react'
import { clsx } from 'clsx'

// STUBS
export const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input type="checkbox" className={clsx("h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", props.className)} {...props} />
)

export const RadioGroup = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div role="radiogroup" {...props} />
)

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={clsx("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6", props.className)} {...props} />
)

export const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={clsx("block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6", props.className)} {...props} />
)
