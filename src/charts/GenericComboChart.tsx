import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { GenericComboChartDto, GenericComboSeries } from './dto/generic-combo-chart.dto'

export interface GenericComboChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: GenericComboChartDto
}

const normalizeYAxis = (config: GenericComboChartDto) => {
  const yAxes = config.yAxes && config.yAxes.length > 0 ? config.yAxes : [{ position: 'left' as const }]

  return yAxes.map((y, idx) => {
    const position = y.position ?? (idx % 2 === 0 ? 'left' : 'right')

    return {
      type: 'value' as const,
      name: y.label,
      position,
      min: y.min,
      max: y.max,
      splitLine: idx === 0 ? { lineStyle: { type: 'dashed' as const } } : { show: false },
    }
  })
}

const toSeriesOption = (s: GenericComboSeries) => {
  const yAxisIndex = s.yAxisIndex ?? 0
  const emphasis = { focus: 'series' as const }

  if (s.type === 'bar') {
    return {
      name: s.name,
      type: 'bar' as const,
      yAxisIndex,
      stack: s.stack,
      emphasis,
      data: s.data,
    }
  }

  if (s.type === 'scatter') {
    return {
      name: s.name,
      type: 'scatter' as const,
      yAxisIndex,
      emphasis,
      data: s.data,
    }
  }

  return {
    name: s.name,
    type: 'line' as const,
    yAxisIndex,
    smooth: s.smooth ?? true,
    showSymbol: false,
    stack: s.stack,
    areaStyle: s.area ? {} : undefined,
    emphasis,
    data: s.data,
  }
}

export const GenericComboChart: React.FC<GenericComboChartProps> = ({
  config,
  height,
  className,
  instanceId,
  notMerge,
  lazyUpdate,
  extraEvents,
  onChartReadyInstance,
}) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const yAxis = normalizeYAxis(config)
      const series = config.series.map(toSeriesOption)

      return {
        title: config.title ? { text: config.title } : undefined,
        tooltip: { trigger: 'axis' },
        legend: { show: config.series.length > 1 },
        grid: { left: 48, right: 48, top: 40, bottom: 32 },
        xAxis: {
          type: 'category',
          data: config.xLabels,
        },
        yAxis,
        series,
      }
    },
    [config]
  )

  return (
    <EChartsBase
      option={option}
      height={height}
      className={className}
      instanceId={instanceId}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
      extraEvents={extraEvents}
      onChartReadyInstance={onChartReadyInstance}
    />
  )
}

GenericComboChart.displayName = 'GenericComboChart'
