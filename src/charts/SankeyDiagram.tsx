// File: src/charts/SankeyDiagram.tsx
import * as React from 'react'
import type { EChartsOption } from 'echarts'
import { EChartsBase, type EChartsBaseProps } from './EChartsBase'
import type { SankeyDiagramDto } from './dto/sankey-diagram.dto'

export interface SankeyDiagramProps extends Omit<EChartsBaseProps, 'option'> {
  config: SankeyDiagramDto
}

export const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ config, height, className }) => {
  const option = React.useMemo<EChartsOption>(
    () => ({
      title: config.title ? { text: config.title } : undefined,
      tooltip: { trigger: 'item', triggerOn: 'mousemove' },
      series: [
        {
          type: 'sankey',
          data: config.nodes,
          links: config.links,
          emphasis: { focus: 'adjacency' },
          lineStyle: { color: 'gradient', curveness: 0.5 },
        },
      ],
    }),
    [config]
  )

  return <EChartsBase option={option} height={height} className={className} />
}

SankeyDiagram.displayName = 'SankeyDiagram'
