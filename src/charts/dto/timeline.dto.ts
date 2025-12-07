// File: src/charts/dto/timeline.dto.ts
export interface TimelineDatum {
  time: string | number | Date
  value: number
}

export interface TimelineDto {
  data: TimelineDatum[]
  title?: string
}
