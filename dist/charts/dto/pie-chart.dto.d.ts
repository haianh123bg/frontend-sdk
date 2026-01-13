export interface PieDatum {
    name: string;
    value: number;
}
export interface PieChartDto {
    data: PieDatum[];
    title?: string;
}
