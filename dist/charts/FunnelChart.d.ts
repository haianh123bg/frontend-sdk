import { EChartsBaseProps } from './EChartsBase';
import { FunnelChartDto } from './dto/funnel-chart.dto';
import * as React from 'react';
export interface FunnelChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: FunnelChartDto;
}
export declare const FunnelChart: React.FC<FunnelChartProps>;
