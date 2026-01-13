import { EChartsBaseProps } from './EChartsBase';
import { StackedChartDto } from './dto/stacked-chart.dto';
import * as React from 'react';
export interface StackedChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: StackedChartDto;
}
export declare const StackedChart: React.FC<StackedChartProps>;
