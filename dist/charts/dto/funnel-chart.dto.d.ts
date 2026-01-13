export interface FunnelItem {
    name: string;
    value: number;
}
export interface FunnelChartDto {
    data: FunnelItem[];
    title?: string;
}
