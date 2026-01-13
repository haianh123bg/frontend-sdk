import { EChartsBaseProps } from './EChartsBase';
import { RadarChartDto } from './dto/radar-chart.dto';
import * as React from 'react';
export interface RadarChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: RadarChartDto;
}
export declare const RadarChart: React.FC<RadarChartProps>;
