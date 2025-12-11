import type { SortingState } from '@tanstack/react-table'
import { useSubscribeAction } from '../../../bus/hooks'
import type { ActionEvent } from '../../../events/types'

export interface UseTableAiControlOptions {
  instanceId: string
  setSorting?: (sorting: SortingState) => void
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

export const useTableAiControl = (options: UseTableAiControlOptions) => {
  const { instanceId, setSorting } = options

  useSubscribeAction(
    'AI.TABLE.SET_SORT',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      const sorting = (event.payload as any)?.sorting as SortingState | undefined
      if (!sorting || !setSorting) return
      setSorting(sorting)
    },
    [instanceId, setSorting]
  )
}
