// File: src/charts/CohortAnalysis.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { CohortAnalysisDto } from './dto/cohort-analysis.dto'

export interface CohortAnalysisProps extends Omit<EChartsBaseProps, 'option'> {
  config: CohortAnalysisDto
}

export const CohortAnalysis: React.FC<CohortAnalysisProps> = ({ config, height, className, instanceId }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const data: [number, number, number][] = []

      for (let i = 0; i < config.cohorts.length; i += 1) {
        for (let j = 0; j < config.periods.length; j += 1) {
          const v = config.values[i]?.[j] ?? 0
          data.push([j, i, v])
        }
      }

      const option: EChartsOption = {
        title: config.title ? { text: config.title } : undefined,
        tooltip: { position: 'top' },
        grid: { height: '70%', top: 40 },
        xAxis: { type: 'category', data: config.periods },
        yAxis: { type: 'category', data: config.cohorts },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'vertical',
          left: 'right',
          top: 'middle',
        },
        series: [
          {
            type: 'heatmap',
            data,
            label: { show: false },
          },
        ],
      }

      return option
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

CohortAnalysis.displayName = 'CohortAnalysis'
