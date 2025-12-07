// File: src/charts/dto/pie-chart.dto.ts
export interface PieDatum {
  name: string
  value: number
}

export interface PieChartDto {
  data: PieDatum[]
  title?: string
}
