// File: src/charts/DonutChart.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { DonutChartDto } from './dto/donut-chart.dto'

export interface DonutChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: DonutChartDto
}

export const DonutChart: React.FC<DonutChartProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const inner = `${config.innerRadiusPercent ?? 50}%`
      const outer = '70%'

      return {
        title: config.title ? { text: config.title, left: 'center', top: 8, textStyle: { fontSize: 14 } } : undefined,
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', left: 'left', top: 'middle' },
        series: [
          {
            name: config.title,
            type: 'pie',
            radius: [inner, outer],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 8,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: { show: false, position: 'center' },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold',
              },
            },
            labelLine: { show: false },
            data: config.data,
          },
        ],
      }
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

DonutChart.displayName = 'DonutChart'
