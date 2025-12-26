import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { LineChartDto } from './dto/line-chart.dto'

export interface LineChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: LineChartDto
}

export const LineChart: React.FC<LineChartProps> = ({ config, height, className, instanceId }) => {
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
        smooth: config.smooth ?? true,
        stack: config.stacked ? 'total' : undefined,
        emphasis: { focus: 'series' },
        data: s.data,
      })),
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

LineChart.displayName = 'LineChart'
