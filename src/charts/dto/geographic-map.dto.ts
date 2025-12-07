// File: src/charts/dto/geographic-map.dto.ts
export interface GeographicDatum {
  name: string
  value: number
}

export interface GeographicMapDto {
  mapName: string
  data: GeographicDatum[]
  title?: string
}
