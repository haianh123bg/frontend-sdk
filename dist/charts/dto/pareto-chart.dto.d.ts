export interface ParetoDatum {
    category: string;
    value: number;
}
export interface ParetoChartDto {
    data: ParetoDatum[];
    title?: string;
}
