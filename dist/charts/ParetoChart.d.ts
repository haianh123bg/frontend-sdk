import { EChartsBaseProps } from './EChartsBase';
import { ParetoChartDto } from './dto/pareto-chart.dto';
import * as React from 'react';
export interface ParetoChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: ParetoChartDto;
}
export declare const ParetoChart: React.FC<ParetoChartProps>;
