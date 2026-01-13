import { TableAnalyticsDto } from './dto/table-analytics.dto';

export interface TableAnalyticsProps<Row extends Record<string, any> = Record<string, any>> {
    config: TableAnalyticsDto<Row>;
}
export declare const TableAnalytics: {
    <Row extends Record<string, any>>({ config }: TableAnalyticsProps<Row>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
