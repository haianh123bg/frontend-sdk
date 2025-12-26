import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { BarChartDto } from './dto/bar-chart.dto'

export interface BarChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: BarChartDto
}

export const BarChart: React.FC<BarChartProps> = ({ config, height, className, instanceId }) => {
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
          stack: config.stacked ? 'total' : undefined,
          emphasis: { focus: 'series' },
          data: s.data,
        })),
      }
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

BarChart.displayName = 'BarChart'
