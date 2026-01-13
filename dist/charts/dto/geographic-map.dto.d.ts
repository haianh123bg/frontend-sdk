export interface GeographicDatum {
    name: string;
    value: number;
}
export interface GeographicMapDto {
    mapName: string;
    data: GeographicDatum[];
    title?: string;
}
