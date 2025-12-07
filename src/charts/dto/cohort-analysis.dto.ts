// File: src/charts/dto/cohort-analysis.dto.ts
export interface CohortAnalysisDto {
  cohorts: string[]
  periods: string[]
  values: number[][]
  title?: string
}
