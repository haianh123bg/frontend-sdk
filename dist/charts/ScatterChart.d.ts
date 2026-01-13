import { EChartsBaseProps } from './EChartsBase';
import { ScatterChartDto } from './dto/scatter-chart.dto';
import * as React from 'react';
export interface ScatterChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: ScatterChartDto;
}
export declare const ScatterChart: React.FC<ScatterChartProps>;
