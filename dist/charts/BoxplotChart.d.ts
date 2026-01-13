import { EChartsBaseProps } from './EChartsBase';
import { BoxplotChartDto } from './dto/boxplot-chart.dto';
import * as React from 'react';
export interface BoxplotChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: BoxplotChartDto;
}
export declare const BoxplotChart: React.FC<BoxplotChartProps>;
