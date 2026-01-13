export interface BubblePoint {
    name?: string;
    x: number;
    y: number;
    size: number;
}
export interface BubbleSeries {
    name: string;
    data: BubblePoint[];
}
export interface BubbleChartDto {
    series: BubbleSeries[];
    xAxisLabel?: string;
    yAxisLabel?: string;
    title?: string;
}
