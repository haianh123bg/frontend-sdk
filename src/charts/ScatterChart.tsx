import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { ScatterChartDto } from './dto/scatter-chart.dto'

export interface ScatterChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: ScatterChartDto
}

export const ScatterChart: React.FC<ScatterChartProps> = ({ config, height, className, instanceId }) => {
  const option = React.useMemo<EChartsOption>(
    () => ({
      title: config.title ? { text: config.title } : undefined,
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const [x, y] = params.value as [number, number]
          return `${params.seriesName || ''}<br/>X: ${x}<br/>Y: ${y}`
        },
      },
      xAxis: { type: 'value', name: config.xAxisLabel },
      yAxis: { type: 'value', name: config.yAxisLabel },
      series: config.series.map((s) => ({
        name: s.name,
        type: 'scatter',
        data: s.data.map((p) => [p.x, p.y]),
        emphasis: { focus: 'series' },
      })),
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

ScatterChart.displayName = 'ScatterChart'
