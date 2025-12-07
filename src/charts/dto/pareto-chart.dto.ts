// File: src/charts/dto/pareto-chart.dto.ts
export interface ParetoDatum {
  category: string
  value: number
}

export interface ParetoChartDto {
  data: ParetoDatum[]
  title?: string
}
