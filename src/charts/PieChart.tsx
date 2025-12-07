// File: src/charts/PieChart.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { PieChartDto } from './dto/pie-chart.dto'

export interface PieChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: PieChartDto
}

export const PieChart: React.FC<PieChartProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => ({
      title: config.title ? { text: config.title, left: 'center', top: 8 } : undefined,
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: { orient: 'vertical', left: 'left', top: 'middle' },
      series: [
        {
          name: config.title,
          type: 'pie',
          radius: '70%',
          center: ['50%', '55%'],
          avoidLabelOverlap: true,
          label: { show: true, formatter: '{b}\n{d}%' },
          labelLine: { show: true },
          data: config.data,
        },
      ],
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

PieChart.displayName = 'PieChart'
