// File: src/charts/aiControl.ts
import * as React from 'react'
import type { ECharts } from 'echarts'
import { useSubscribeAction } from '../bus/hooks'
import type { ActionEvent } from '../events/types'

export interface UseChartAiControlOptions {
  instanceId: string
  chartRef: React.RefObject<any>
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

const getChartInstance = (chartRef: React.RefObject<any>): ECharts | null => {
  const chartComponent = chartRef.current as { getEchartsInstance?: () => ECharts } | null
  if (!chartComponent || typeof chartComponent.getEchartsInstance !== 'function') {
    return null
  }

  try {
    return chartComponent.getEchartsInstance()
  } catch {
    return null
  }
}

export const useChartAiControl = (options: UseChartAiControlOptions) => {
  const { instanceId, chartRef } = options

  useSubscribeAction(
    'AI.CHART.SET_RANGE',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      const { from, to } = (event.payload as any) || {}
      if (typeof from !== 'number' && typeof to !== 'number') return

      const chart = getChartInstance(chartRef)
      if (!chart) return

      const action: any = { type: 'dataZoom' }
      if (typeof from === 'number') action.start = from
      if (typeof to === 'number') action.end = to

      chart.dispatchAction(action)
    },
    [instanceId, chartRef]
  )

  useSubscribeAction(
    'AI.CHART.TOGGLE_SERIES',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      const { seriesKey, visible } = (event.payload as any) || {}
      if (!seriesKey || typeof visible !== 'boolean') return

      const chart = getChartInstance(chartRef)
      if (!chart) return

      chart.dispatchAction({
        type: visible ? 'legendSelect' : 'legendUnSelect',
        name: seriesKey,
      } as any)
    },
    [instanceId, chartRef]
  )

  useSubscribeAction(
    'AI.CHART.HIGHLIGHT_POINTS',
    (event) => {
      if (!isTargetedToInstance(event, instanceId)) return
      const { ids } = (event.payload as any) || {}
      if (!Array.isArray(ids) || ids.length === 0) return

      const chart = getChartInstance(chartRef)
      if (!chart) return

      ids.forEach((id: string | number) => {
        chart.dispatchAction({
          type: 'highlight',
          name: String(id),
        } as any)
      })
    },
    [instanceId, chartRef]
  )
}
