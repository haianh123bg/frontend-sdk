// File: src/charts/CalendarView.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { CalendarViewDto } from './dto/calendar-view.dto'

export interface CalendarViewProps extends Omit<EChartsBaseProps, 'option'> {
  config: CalendarViewDto
}

export const CalendarView: React.FC<CalendarViewProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => {
      const year =
        config.year ??
        (config.data[0] ? new Date(config.data[0].date).getFullYear() : new Date().getFullYear())

      const data = config.data.map((d) => [d.date, d.value])

      const option: EChartsOption = {
        title: config.title ? { text: config.title } : undefined,
        tooltip: { position: 'top' },
        visualMap: {
          min: 0,
          max: Math.max(...config.data.map((d) => d.value), 1),
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          top: 20,
        },
        calendar: {
          range: year,
          top: 60,
          left: 30,
          right: 30,
          cellSize: ['auto', 18],
        },
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data,
          },
        ],
      }

      return option
    },
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

CalendarView.displayName = 'CalendarView'
