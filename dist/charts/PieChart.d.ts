import { EChartsBaseProps } from './EChartsBase';
import { PieChartDto } from './dto/pie-chart.dto';
import * as React from 'react';
export interface PieChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: PieChartDto;
}
export declare const PieChart: React.FC<PieChartProps>;
