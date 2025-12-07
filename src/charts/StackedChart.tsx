// File: src/charts/StackedChart.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { StackedChartDto } from './dto/stacked-chart.dto'

export interface StackedChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: StackedChartDto
}

export const StackedChart: React.FC<StackedChartProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const vertical = config.orientation !== 'horizontal'

      const xAxis = vertical
        ? { type: 'category' as const, data: config.xLabels }
        : { type: 'value' as const }

      const yAxis = vertical
        ? { type: 'value' as const }
        : { type: 'category' as const, data: config.xLabels }

      return {
        title: config.title ? { text: config.title } : undefined,
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { show: config.series.length > 1 },
        grid: { left: 40, right: 16, top: 40, bottom: 32 },
        xAxis,
        yAxis,
        series: config.series.map((s) => ({
          name: s.name,
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: s.data,
        })),
      }
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

StackedChart.displayName = 'StackedChart'
