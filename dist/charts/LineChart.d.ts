import { EChartsBaseProps } from './EChartsBase';
import { LineChartDto } from './dto/line-chart.dto';
import * as React from 'react';
export interface LineChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: LineChartDto;
}
export declare const LineChart: React.FC<LineChartProps>;
