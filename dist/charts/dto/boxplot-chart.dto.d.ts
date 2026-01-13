export type BoxplotFiveNumber = [number, number, number, number, number];
export interface BoxplotSeries {
    name: string;
    data: BoxplotFiveNumber[];
}
export interface BoxplotChartDto {
    xLabels: string[];
    series: BoxplotSeries[];
    title?: string;
    outliers?: Array<[number, number]>;
}
