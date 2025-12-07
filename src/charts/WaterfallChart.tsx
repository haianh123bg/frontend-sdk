// File: src/charts/WaterfallChart.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { WaterfallChartDto } from './dto/waterfall-chart.dto'

export interface WaterfallChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: WaterfallChartDto
}

export const WaterfallChart: React.FC<WaterfallChartProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const labels = config.data.map((d) => d.label)
      const assist: number[] = []
      const values: number[] = []
      let cumulative = 0

      config.data.forEach((item) => {
        const v = item.value
        if (v >= 0) {
          assist.push(cumulative)
          values.push(v)
          cumulative += v
        } else {
          assist.push(cumulative + v)
          values.push(-v)
          cumulative += v
        }
      })

      const option: EChartsOption = {
        title: config.title ? { text: config.title } : undefined,
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: any) => {
            const valueItem = Array.isArray(params) ? params[1] : params
            return `${valueItem.name}: ${config.data[valueItem.dataIndex].value}`
          },
        },
        grid: { left: 40, right: 16, top: 40, bottom: 32 },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: labels,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'assist',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent',
            },
            emphasis: {
              itemStyle: {
                borderColor: 'transparent',
                color: 'transparent',
              },
            },
            data: assist,
          },
          {
            name: 'value',
            type: 'bar',
            stack: 'total',
            data: values,
          },
        ],
      }

      return option
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

WaterfallChart.displayName = 'WaterfallChart'
