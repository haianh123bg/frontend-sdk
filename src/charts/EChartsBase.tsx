// File: src/charts/EChartsBase.tsx
import * as React from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../bus/hooks'
import { EventType } from '../events/types'
import { generateId } from '../utils/id'
import { useChartAiControl } from './aiControl'

export interface EChartsBaseProps {
  option: EChartsOption
  height?: number | string
  className?: string
  instanceId?: string
}

export const EChartsBase: React.FC<EChartsBaseProps> = ({ option, height = 320, className, instanceId }) => {
  const dispatch = useDispatchAction()
  const autoInstanceIdRef = React.useRef<string | null>(null)
  if (!autoInstanceIdRef.current) {
    autoInstanceIdRef.current = generateId()
  }
  const effectiveInstanceId = instanceId ?? autoInstanceIdRef.current

  const style: React.CSSProperties = {
    width: '100%',
    height: typeof height === 'number' ? `${height}px` : height,
  }

  const chartRef = React.useRef<any>(null)

  useChartAiControl({
    instanceId: effectiveInstanceId!,
    chartRef,
  })

  const handleChartReady = React.useCallback(() => {
    dispatch(
      'CHART.INIT',
      { instanceId: effectiveInstanceId },
      { meta: { component: 'EChart', instanceId: effectiveInstanceId } }
    )
  }, [dispatch, effectiveInstanceId])

  const handleDataZoom = React.useCallback(
    (params: any) => {
      const source = (params && Array.isArray(params.batch) && params.batch[0]) || params || {}
      const payload: any = {
        instanceId: effectiveInstanceId,
        eventName: 'dataZoom',
      }

      if (typeof source.start === 'number') payload.start = source.start
      if (typeof source.end === 'number') payload.end = source.end
      if (source.startValue != null) payload.startValue = source.startValue
      if (source.endValue != null) payload.endValue = source.endValue

      dispatch(
        'CHART.RANGE_CHANGE',
        payload,
        { meta: { component: 'EChart', instanceId: effectiveInstanceId } }
      )
    },
    [dispatch, effectiveInstanceId]
  )

  const handleLegendSelectChanged = React.useCallback(
    (params: any) => {
      const { name, selected } = params || {}

      dispatch(
        'CHART.SERIES_TOGGLE',
        {
          instanceId: effectiveInstanceId,
          seriesName: name,
          visible: selected ? selected[name] : undefined,
          selected,
        },
        { meta: { component: 'EChart', instanceId: effectiveInstanceId } }
      )
    },
    [dispatch, effectiveInstanceId]
  )

  const handleClick = React.useCallback(
    (params: any) => {
      const basePayload = {
        component: 'EChart',
        action: 'point_click',
        instanceId: effectiveInstanceId,
        seriesName: params?.seriesName,
        dataIndex: params?.dataIndex,
        value: params?.value,
        name: params?.name,
      }

      dispatch(EventType.UI_CLICK, basePayload, {
        meta: { component: 'EChart', instanceId: effectiveInstanceId },
      })

      dispatch(
        'CHART.POINT_SELECT',
        {
          instanceId: effectiveInstanceId,
          seriesName: params?.seriesName,
          dataIndex: params?.dataIndex,
          value: params?.value,
          name: params?.name,
        },
        { meta: { component: 'EChart', instanceId: effectiveInstanceId } }
      )
    },
    [dispatch, effectiveInstanceId]
  )

  const onEvents = React.useMemo(
    () => ({
      dataZoom: handleDataZoom,
      legendselectchanged: handleLegendSelectChanged,
      click: handleClick,
    }),
    [handleDataZoom, handleLegendSelectChanged, handleClick]
  )

  return (
    <ReactECharts
      ref={chartRef}
      option={option}
      style={style}
      className={twMerge(clsx('w-full', className))}
      notMerge
      lazyUpdate
      onChartReady={handleChartReady}
      onEvents={onEvents}
    />
  )
}

EChartsBase.displayName = 'EChartsBase'
