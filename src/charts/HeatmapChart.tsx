// File: src/charts/HeatmapChart.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { HeatmapDto } from './dto/heatmap.dto'

export interface HeatmapChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: HeatmapDto
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({ config, height, className, instanceId }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const { xLabels, yLabels, values } = config
      const data: [number, number, number][] = []

      let min = Number.POSITIVE_INFINITY
      let max = Number.NEGATIVE_INFINITY

      for (let i = 0; i < yLabels.length; i += 1) {
        for (let j = 0; j < xLabels.length; j += 1) {
          const v = values[i]?.[j] ?? 0
          data.push([j, i, v])
          if (v < min) min = v
          if (v > max) max = v
        }
      }

      if (!Number.isFinite(min) || !Number.isFinite(max)) {
        min = 0
        max = 1
      }

      const option: EChartsOption = {
        title: config.title ? { text: config.title } : undefined,
        tooltip: { position: 'top' },
        grid: { height: '70%', top: 40 },
        xAxis: {
          type: 'category',
          data: xLabels,
          splitArea: { show: true },
        },
        yAxis: {
          type: 'category',
          data: yLabels,
          splitArea: { show: true },
        },
        visualMap: {
          min,
          max,
          calculable: true,
          orient: 'vertical',
          left: 'right',
          top: 'middle',
        },
        series: [
          {
            name: config.title,
            type: 'heatmap',
            data,
            label: { show: false },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }

      return option
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

HeatmapChart.displayName = 'HeatmapChart'
