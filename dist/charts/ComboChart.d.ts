import { EChartsBaseProps } from './EChartsBase';
import { ComboChartDto } from './dto/combo-chart.dto';
import * as React from 'react';
export interface ComboChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: ComboChartDto;
}
export declare const ComboChart: React.FC<ComboChartProps>;
