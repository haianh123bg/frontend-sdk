// File: src/charts/RadialGauge.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { RadialGaugeDto } from './dto/radial-gauge.dto'

export interface RadialGaugeProps extends Omit<EChartsBaseProps, 'option'> {
  config: RadialGaugeDto
}

export const RadialGauge: React.FC<RadialGaugeProps> = ({ config, height = 260, className, instanceId }) => {
  const option = React.useMemo<EChartsOption>(
    () => ({
      title: config.title ? { text: config.title, left: 'center', top: 8 } : undefined,
      series: [
        {
          type: 'gauge',
          min: config.min ?? 0,
          max: config.max ?? 100,
          progress: { show: true, width: 10 },
          axisLine: { lineStyle: { width: 10 } },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          anchor: { show: true, showAbove: true, size: 12 },
          pointer: { show: true },
          detail: {
            valueAnimation: true,
            formatter: (value: number) => `${value}${config.unit ? ` ${config.unit}` : ''}`,
            fontSize: 14,
          },
          data: [{ value: config.value }],
        },
      ],
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

RadialGauge.displayName = 'RadialGauge'
