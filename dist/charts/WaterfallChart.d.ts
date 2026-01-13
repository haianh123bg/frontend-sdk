import { EChartsBaseProps } from './EChartsBase';
import { WaterfallChartDto } from './dto/waterfall-chart.dto';
import * as React from 'react';
export interface WaterfallChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: WaterfallChartDto;
}
export declare const WaterfallChart: React.FC<WaterfallChartProps>;
