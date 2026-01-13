export interface StackedSeries {
    name: string;
    data: number[];
}
export interface StackedChartDto {
    xLabels: string[];
    series: StackedSeries[];
    title?: string;
    orientation?: 'vertical' | 'horizontal';
}
