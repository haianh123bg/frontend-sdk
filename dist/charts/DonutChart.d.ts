import { EChartsBaseProps } from './EChartsBase';
import { DonutChartDto } from './dto/donut-chart.dto';
import * as React from 'react';
export interface DonutChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: DonutChartDto;
}
export declare const DonutChart: React.FC<DonutChartProps>;
