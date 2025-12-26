export interface LineChartSeries {
  name: string
  data: number[]
}

export interface LineChartDto {
  xLabels: string[]
  series: LineChartSeries[]
  title?: string
  smooth?: boolean
  stacked?: boolean
}
