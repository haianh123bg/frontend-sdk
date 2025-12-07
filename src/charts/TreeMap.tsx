// File: src/charts/TreeMap.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { TreeMapDto } from './dto/tree-map.dto'

export interface TreeMapProps extends Omit<EChartsBaseProps, 'option'> {
  config: TreeMapDto
}

export const TreeMap: React.FC<TreeMapProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => ({
      title: config.title ? { text: config.title } : undefined,
      tooltip: {
        formatter: (info: any) => {
          const value = info.value
          const path =
            info.treePathInfo && Array.isArray(info.treePathInfo)
              ? info.treePathInfo
                  .slice(1)
                  .map((p: any) => p.name)
                  .join(' / ')
              : info.name
          return `${path}<br/>${value}`
        },
      },
      series: [
        {
          type: 'treemap',
          data: config.data,
          roam: false,
          leafDepth: 2,
          upperLabel: { show: true, height: 22 },
          label: {
            show: true,
            position: 'inside',
            formatter: (params: any) => {
              const value = typeof params.value === 'number' ? params.value : undefined
              return value != null ? `${params.name}\n${value}` : params.name
            },
          },
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 1,
            gapWidth: 2,
          },
          colorMappingBy: 'value',
        },
      ],
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

TreeMap.displayName = 'TreeMap'
