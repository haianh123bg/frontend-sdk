// File: src/components/others/Misc.tsx
import * as React from 'react'

export const Transition = ({ children }: { children: React.ReactNode }) => <>{children}</>

export const DatePicker = () => <input type="date" className="rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300" />

export const Form = ({ children, onSubmit }: { children: React.ReactNode; onSubmit?: () => void }) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit?.() }}>{children}</form>
)

export const Controls = ({ children }: { children: React.ReactNode }) => <div className="flex gap-2">{children}</div>

export const Other = () => <div>Other Component</div>
