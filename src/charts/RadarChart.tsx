// File: src/charts/RadarChart.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { RadarChartDto } from './dto/radar-chart.dto'

export interface RadarChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: RadarChartDto
}

export const RadarChart: React.FC<RadarChartProps> = ({ config, height, className, instanceId }) => {
  const option = React.useMemo<EChartsOption>(
    () => ({
      title: config.title ? { text: config.title } : undefined,
      tooltip: {},
      legend: { show: config.series.length > 1 },
      radar: {
        indicator: config.indicators,
      },
      series: [
        {
          type: 'radar',
          data: config.series.map((s) => ({ value: s.values, name: s.name })),
        },
      ],
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

RadarChart.displayName = 'RadarChart'
