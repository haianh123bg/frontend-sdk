// File: src/charts/dto/tree-map.dto.ts
export interface TreeMapNode {
  name: string
  value?: number
  children?: TreeMapNode[]
}

export interface TreeMapDto {
  data: TreeMapNode[]
  title?: string
}
