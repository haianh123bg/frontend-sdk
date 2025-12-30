import * as React from 'react'
import { ExcelGrid } from '../../../SpreadsheetGrid/ExcelGrid'
import type { ChatKitNodeAction, SchemaComponentProps } from '../../types'
import { resolveActionEvent } from '../shared/resolveActionEvent'

export const ExcelGridNode: React.FC<SchemaComponentProps> = ({ node, onAction, conversationId, path }) => {
  const { action, onValueChange, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <ExcelGrid
      {...rest}
      onValueChange={(cells) => {
        if (resolvedAction && onAction) {
          onAction({
            ...resolvedAction,
            payload: { ...(resolvedAction.payload ?? {}), value: cells, cells, path },
          })
        }
        if (typeof onValueChange === 'function') onValueChange(cells)
      }}
    />
  )
}
