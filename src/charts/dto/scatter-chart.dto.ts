export interface ScatterPoint {
  name?: string
  x: number
  y: number
}

export interface ScatterSeries {
  name: string
  data: ScatterPoint[]
}

export interface ScatterChartDto {
  series: ScatterSeries[]
  xAxisLabel?: string
  yAxisLabel?: string
  title?: string
}
