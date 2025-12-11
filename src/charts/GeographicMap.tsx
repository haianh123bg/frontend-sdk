// File: src/charts/GeographicMap.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { GeographicMapDto } from './dto/geographic-map.dto'

/**
 * Lưu ý: Cần gọi `echarts.registerMap(mapName, geoJson)` ở phía app trước khi dùng component này.
 */
export interface GeographicMapProps extends Omit<EChartsBaseProps, 'option'> {
  config: GeographicMapDto
}

export const GeographicMap: React.FC<GeographicMapProps> = ({ config, height = 400, className, instanceId }) => {
  const option = React.useMemo<EChartsOption>(
    () => ({
      title: config.title ? { text: config.title } : undefined,
      tooltip: { trigger: 'item' },
      visualMap: {
        min: 0,
        max: Math.max(...config.data.map((d) => d.value), 1),
        left: 'left',
        top: 'bottom',
        text: ['High', 'Low'],
        calculable: true,
      },
      series: [
        {
          type: 'map',
          map: config.mapName,
          roam: true,
          label: { show: false },
          data: config.data,
        },
      ],
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} instanceId={instanceId} />
}

GeographicMap.displayName = 'GeographicMap'
