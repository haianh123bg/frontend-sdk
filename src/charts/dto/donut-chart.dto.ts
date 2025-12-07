// File: src/charts/dto/donut-chart.dto.ts

export interface DonutChartDatum {
  name: string
  value: number
}

export interface DonutChartDto {
  data: DonutChartDatum[]
  title?: string
  /**
   * Bán kính trong (phần rỗng ở giữa), tính theo phần trăm (0-100).
   * Mặc định 50 (%).
   */
  innerRadiusPercent?: number
}
