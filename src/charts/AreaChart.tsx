// File: src/charts/AreaChart.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { AreaChartDto } from './dto/area-chart.dto'

export interface AreaChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: AreaChartDto
}

export const AreaChart: React.FC<AreaChartProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => ({
      title: config.title ? { text: config.title } : undefined,
      tooltip: { trigger: 'axis' },
      legend: { show: config.series.length > 1 },
      grid: { left: 40, right: 16, top: 40, bottom: 32 },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: config.xLabels,
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { type: 'dashed' } },
      },
      series: config.series.map((s) => ({
        name: s.name,
        type: 'line',
        smooth: true,
        areaStyle: {},
        stack: config.stacked ? 'total' : undefined,
        emphasis: { focus: 'series' },
        data: s.data,
      })),
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

AreaChart.displayName = 'AreaChart'
