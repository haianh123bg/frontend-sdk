import { BarChartDto } from './dto/bar-chart.dto';

export interface HistogramBin {
    start: number;
    end: number;
    count: number;
    label: string;
}
export interface BuildHistogramOptions {
    binCount?: number;
    binSize?: number;
    min?: number;
    max?: number;
    labelFormatter?: (start: number, end: number, index: number) => string;
}
export declare const buildHistogram: (values: number[], options?: BuildHistogramOptions) => HistogramBin[];
export declare const histogramBinsToBarChartDto: (bins: HistogramBin[], opts?: {
    title?: string;
    seriesName?: string;
}) => BarChartDto;
export declare const valuesToHistogramBarChartDto: (values: number[], options?: BuildHistogramOptions & {
    title?: string;
    seriesName?: string;
}) => BarChartDto;
