// File: src/charts/FunnelChart.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { FunnelChartDto } from './dto/funnel-chart.dto'

export interface FunnelChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: FunnelChartDto
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => ({
      title: config.title ? { text: config.title } : undefined,
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: { show: true },
      series: [
        {
          name: config.title,
          type: 'funnel',
          left: '10%',
          top: 40,
          bottom: 20,
          width: '80%',
          min: 0,
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: { show: true, formatter: '{b}: {c}' },
          labelLine: { length: 10, lineStyle: { width: 1, type: 'solid' } },
          itemStyle: { borderColor: '#fff', borderWidth: 1 },
          data: config.data,
        },
      ],
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

FunnelChart.displayName = 'FunnelChart'
