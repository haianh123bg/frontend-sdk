// File: src/charts/Timeline.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { TimelineDto } from './dto/timeline.dto'

export interface TimelineProps extends Omit<EChartsBaseProps, 'option'> {
  config: TimelineDto
}

export const Timeline: React.FC<TimelineProps> = ({ config, height, className, instanceId }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const xData = config.data.map((d) =>
        typeof d.time === 'string' || typeof d.time === 'number'
          ? d.time
          : d.time.toISOString()
      )
      const yData = config.data.map((d) => d.value)

      const option: EChartsOption = {
        title: config.title ? { text: config.title } : undefined,
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: xData },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'line',
            smooth: true,
            data: yData,
          },
        ],
      }

      return option
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

Timeline.displayName = 'Timeline'
