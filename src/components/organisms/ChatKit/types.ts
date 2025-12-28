import type * as React from 'react'
import type { ChatKitActionEvent } from './contracts'

export type UIComponent = {
  type: string
  props?: Record<string, any>
  children?: UIComponent[]
  key?: string
  id?: string
}

export type ChatKitNodeAction = {
  type: string
  payload?: any
  conversationId?: string
}

export type SchemaComponentProps = {
  node: UIComponent
  renderChildren: () => React.ReactNode
  onAction?: (event: ChatKitActionEvent) => void
  conversationId?: string
  path: string[]
}

export type SchemaComponent = (props: SchemaComponentProps) => React.ReactNode

export type ComponentRegistry = Record<string, SchemaComponent>
