// File: src/charts/ParetoChart.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { ParetoChartDto } from './dto/pareto-chart.dto'

export interface ParetoChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: ParetoChartDto
}

export const ParetoChart: React.FC<ParetoChartProps> = ({ config, height, className, instanceId }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const sorted = [...config.data].sort((a, b) => b.value - a.value)
      const categories = sorted.map((d) => d.category)
      const values = sorted.map((d) => d.value)
      const total = values.reduce((sum, v) => sum + v, 0) || 1
      const cumulative: number[] = []
      let acc = 0
      values.forEach((v) => {
        acc += v
        cumulative.push((acc / total) * 100)
      })

      const option: EChartsOption = {
        title: config.title ? { text: config.title } : undefined,
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: categories },
        yAxis: [
          { type: 'value', name: 'Value' },
          { type: 'value', name: 'Cumulative %', min: 0, max: 100 },
        ],
        series: [
          {
            name: 'Value',
            type: 'bar',
            data: values,
          },
          {
            name: 'Cumulative %',
            type: 'line',
            yAxisIndex: 1,
            data: cumulative,
          },
        ],
      }

      return option
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

ParetoChart.displayName = 'ParetoChart'
