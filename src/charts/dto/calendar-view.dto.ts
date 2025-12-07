// File: src/charts/dto/calendar-view.dto.ts
export interface CalendarDatum {
  date: string
  value: number
}

export interface CalendarViewDto {
  data: CalendarDatum[]
  title?: string
  year?: number
}
