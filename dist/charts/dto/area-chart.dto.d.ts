export interface AreaChartSeries {
    name: string;
    data: number[];
}
export interface AreaChartDto {
    /** Nhãn trục X (thường là thời gian hoặc category). */
    xLabels: string[];
    /** Danh sách series cho biểu đồ vùng. */
    series: AreaChartSeries[];
    /** Tiêu đề biểu đồ. */
    title?: string;
    /** Có xếp chồng các series hay không. */
    stacked?: boolean;
}
