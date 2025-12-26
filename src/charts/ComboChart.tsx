import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { ComboChartDto } from './dto/combo-chart.dto'

export interface ComboChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: ComboChartDto
}

export const ComboChart: React.FC<ComboChartProps> = ({ config, height, className, instanceId }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const series = [
        ...config.barSeries.map((s) => ({
          name: s.name,
          type: 'bar' as const,
          yAxisIndex: 0,
          emphasis: { focus: 'series' as const },
          data: s.data,
        })),
        ...config.lineSeries.map((s) => ({
          name: s.name,
          type: 'line' as const,
          yAxisIndex: 1,
          smooth: true,
          showSymbol: false,
          emphasis: { focus: 'series' as const },
          data: s.data,
        })),
      ]

      return {
        title: config.title ? { text: config.title } : undefined,
        tooltip: { trigger: 'axis' },
        legend: { show: true },
        grid: { left: 48, right: 48, top: 40, bottom: 32 },
        xAxis: {
          type: 'category',
          data: config.xLabels,
        },
        yAxis: [
          {
            type: 'value',
            name: config.leftAxisLabel,
            splitLine: { lineStyle: { type: 'dashed' } },
          },
          {
            type: 'value',
            name: config.rightAxisLabel,
            splitLine: { show: false },
          },
        ],
        series,
      }
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

ComboChart.displayName = 'ComboChart'
