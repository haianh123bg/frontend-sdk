// File: src/charts/dto/waterfall-chart.dto.ts
export interface WaterfallDatum {
  label: string
  value: number
}

export interface WaterfallChartDto {
  data: WaterfallDatum[]
  title?: string
}
