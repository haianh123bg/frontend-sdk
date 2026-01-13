import { EChartsBaseProps } from './EChartsBase';
import { BarChartDto } from './dto/bar-chart.dto';
import * as React from 'react';
export interface BarChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: BarChartDto;
}
export declare const BarChart: React.FC<BarChartProps>;
