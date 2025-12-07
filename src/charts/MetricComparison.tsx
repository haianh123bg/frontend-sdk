// File: src/charts/MetricComparison.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { MetricComparisonDto } from './dto/metric-comparison.dto'

export interface MetricComparisonProps extends Omit<EChartsBaseProps, 'option'> {
  config: MetricComparisonDto
}

export const MetricComparison: React.FC<MetricComparisonProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const categories = config.items.map((i) => i.name)
      const values = config.items.map((i) => i.value)
      const targets = config.items.map((i) => i.target ?? null)

      const option: EChartsOption = {
        title: config.title ? { text: config.title } : undefined,
        tooltip: { trigger: 'axis' },
        grid: { left: 80, right: 40, top: 40, bottom: 40 },
        xAxis: { type: 'value' },
        yAxis: { type: 'category', data: categories },
        series: [
          {
            name: 'Value',
            type: 'bar',
            data: values,
          },
          {
            name: 'Target',
            type: 'scatter',
            data: targets,
            symbol: 'diamond',
            symbolSize: 10,
          },
        ],
      }

      return option
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

MetricComparison.displayName = 'MetricComparison'
