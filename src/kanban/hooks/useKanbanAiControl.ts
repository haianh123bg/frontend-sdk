import { useSubscribeAction } from '../../bus/hooks'
import type { ActionEvent } from '../../events/types'
import type { MoveLocation } from '../types'

export interface UseKanbanAiControlOptions {
  instanceId: string
  moveItemLocal: (id: string, from: MoveLocation, to: MoveLocation, position: number) => void
  updateItemLocal: (id: string, patch: any) => void
  addItemLocal?: (item: Record<string, any>) => void
  removeItemLocal?: (id: string) => void
}

const isTargetedToInstance = (event: ActionEvent, instanceId: string): boolean => {
  const target = (event.meta as any)?.target
  if (target?.instanceId && target.instanceId !== instanceId) {
    return false
  }
  const payloadInstanceId = (event.payload as any)?.instanceId
  if (payloadInstanceId && payloadInstanceId !== instanceId) {
    return false
  }
  return true
}

export const useKanbanAiControl = (options: UseKanbanAiControlOptions) => {
  const { instanceId, moveItemLocal, updateItemLocal, addItemLocal, removeItemLocal } = options

  useSubscribeAction(
    'AI.KANBAN.MOVE_CARD',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      const { cardId, fromColumnId, toColumnId, toIndex } = (event.payload as any) || {}
      if (!cardId || !toColumnId || typeof toIndex !== 'number') return

      const from: MoveLocation = { columnKey: fromColumnId || toColumnId }
      const to: MoveLocation = { columnKey: toColumnId }
      moveItemLocal(cardId, from, to, toIndex)
    },
    [instanceId, moveItemLocal]
  )

  useSubscribeAction(
    'AI.KANBAN.UPDATE_CARD',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      const { cardId, patch } = (event.payload as any) || {}
      if (!cardId || !patch) return
      updateItemLocal(cardId, patch)
    },
    [instanceId, updateItemLocal]
  )

  useSubscribeAction(
    'AI.KANBAN.CREATE_CARD',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      if (!addItemLocal) return
      const { data } = (event.payload as any) || {}
      if (!data) return
      addItemLocal(data)
    },
    [instanceId, addItemLocal]
  )

  useSubscribeAction(
    'AI.KANBAN.DELETE_CARD',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      if (!removeItemLocal) return
      const { cardId } = (event.payload as any) || {}
      if (!cardId) return
      removeItemLocal(cardId)
    },
    [instanceId, removeItemLocal]
  )
}
