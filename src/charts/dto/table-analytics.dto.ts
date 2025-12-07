// File: src/charts/dto/table-analytics.dto.ts
export interface TableAnalyticsColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
}

export interface TableAnalyticsDto<Row extends Record<string, any> = Record<string, any>> {
  columns: TableAnalyticsColumn[]
  rows: Row[]
  title?: string
}
