export interface MetricItem {
    name: string;
    value: number;
    target?: number;
}
export interface MetricComparisonDto {
    items: MetricItem[];
    title?: string;
}
