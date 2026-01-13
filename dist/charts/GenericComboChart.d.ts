import { EChartsBaseProps } from './EChartsBase';
import { GenericComboChartDto } from './dto/generic-combo-chart.dto';
import * as React from 'react';
export interface GenericComboChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: GenericComboChartDto;
}
export declare const GenericComboChart: React.FC<GenericComboChartProps>;
