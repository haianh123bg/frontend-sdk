export interface ComboChartSeries {
    name: string;
    data: number[];
}
export interface ComboChartDto {
    xLabels: string[];
    barSeries: ComboChartSeries[];
    lineSeries: ComboChartSeries[];
    leftAxisLabel?: string;
    rightAxisLabel?: string;
    title?: string;
}
