// File: src/charts/dto/heatmap.dto.ts
export interface HeatmapDto {
  xLabels: string[]
  yLabels: string[]
  values: number[][]
  title?: string
}
