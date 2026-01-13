import { EChartsBaseProps } from './EChartsBase';
import { BubbleChartDto } from './dto/bubble-chart.dto';
import * as React from 'react';
export interface BubbleChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: BubbleChartDto;
}
export declare const BubbleChart: React.FC<BubbleChartProps>;
