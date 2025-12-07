// File: src/charts/BubbleChart.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { BubbleChartDto } from './dto/bubble-chart.dto'

export interface BubbleChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: BubbleChartDto
}

export const BubbleChart: React.FC<BubbleChartProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => ({
      title: config.title ? { text: config.title } : undefined,
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const [x, y, size] = params.value as [number, number, number]
          return `${params.seriesName || ''}<br/>X: ${x}<br/>Y: ${y}<br/>Size: ${size}`
        },
      },
      xAxis: { type: 'value', name: config.xAxisLabel },
      yAxis: { type: 'value', name: config.yAxisLabel },
      series: config.series.map((s) => ({
        name: s.name,
        type: 'scatter',
        data: s.data.map((p) => [p.x, p.y, p.size]),
        symbolSize: (val: any) => val[2],
        emphasis: { focus: 'series' },
      })),
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

BubbleChart.displayName = 'BubbleChart'
