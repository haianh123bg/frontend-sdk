// File: src/charts/dto/radar-chart.dto.ts
export interface RadarIndicator {
  name: string
  max: number
}

export interface RadarSeries {
  name: string
  values: number[]
}

export interface RadarChartDto {
  indicators: RadarIndicator[]
  series: RadarSeries[]
  title?: string
}
