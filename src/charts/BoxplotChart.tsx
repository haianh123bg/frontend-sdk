import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { BoxplotChartDto } from './dto/boxplot-chart.dto'

export interface BoxplotChartProps extends Omit<EChartsBaseProps, 'option'> {
  config: BoxplotChartDto
}

export const BoxplotChart: React.FC<BoxplotChartProps> = ({ config, height, className, instanceId }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const boxSeries = config.series.map((s) => ({
        name: s.name,
        type: 'boxplot' as const,
        data: s.data,
      }))

      const outlierSeries =
        config.outliers && config.outliers.length > 0
          ? [
              {
                name: 'Outlier',
                type: 'scatter' as const,
                data: config.outliers,
              },
            ]
          : []

      const series = [...boxSeries, ...outlierSeries]

      return {
        title: config.title ? { text: config.title } : undefined,
        tooltip: { trigger: 'item' },
        legend: { show: config.series.length > 1 || (config.outliers?.length ?? 0) > 0 },
        grid: { left: 40, right: 16, top: 40, bottom: 32 },
        xAxis: {
          type: 'category',
          data: config.xLabels,
          boundaryGap: true,
          splitArea: { show: false },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { type: 'dashed' } },
        },
        series,
      }
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

BoxplotChart.displayName = 'BoxplotChart'
