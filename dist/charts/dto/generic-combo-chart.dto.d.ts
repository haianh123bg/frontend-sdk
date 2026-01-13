export interface GenericComboYAxis {
    label?: string;
    position?: 'left' | 'right';
    min?: number;
    max?: number;
}
export type GenericComboSeriesType = 'line' | 'bar' | 'scatter';
export interface GenericComboSeries {
    name: string;
    type: GenericComboSeriesType;
    data: number[];
    yAxisIndex?: number;
    stack?: string;
    smooth?: boolean;
    area?: boolean;
}
export interface GenericComboChartDto {
    xLabels: string[];
    series: GenericComboSeries[];
    yAxes?: GenericComboYAxis[];
    title?: string;
}
