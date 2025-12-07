// File: src/charts/dto/funnel-chart.dto.ts
export interface FunnelItem {
  name: string
  value: number
}

export interface FunnelChartDto {
  data: FunnelItem[]
  title?: string
}
