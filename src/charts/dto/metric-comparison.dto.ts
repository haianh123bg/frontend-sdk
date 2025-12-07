// File: src/charts/dto/metric-comparison.dto.ts
export interface MetricItem {
  name: string
  value: number
  target?: number
}

export interface MetricComparisonDto {
  items: MetricItem[]
  title?: string
}
