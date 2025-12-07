// File: src/charts/dto/sankey-diagram.dto.ts
export interface SankeyNode {
  name: string
}

export interface SankeyLink {
  source: string
  target: string
  value: number
}

export interface SankeyDiagramDto {
  nodes: SankeyNode[]
  links: SankeyLink[]
  title?: string
}
