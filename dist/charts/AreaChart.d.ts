import { EChartsBaseProps } from './EChartsBase';
import { AreaChartDto } from './dto/area-chart.dto';
import * as React from 'react';
export interface AreaChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: AreaChartDto;
}
export declare const AreaChart: React.FC<AreaChartProps>;
