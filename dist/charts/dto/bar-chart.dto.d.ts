export interface BarChartSeries {
    name: string;
    data: number[];
}
export interface BarChartDto {
    xLabels: string[];
    series: BarChartSeries[];
    title?: string;
    orientation?: 'vertical' | 'horizontal';
    stacked?: boolean;
}
