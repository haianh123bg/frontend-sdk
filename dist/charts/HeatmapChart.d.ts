import { EChartsBaseProps } from './EChartsBase';
import { HeatmapDto } from './dto/heatmap.dto';
import * as React from 'react';
export interface HeatmapChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: HeatmapDto;
}
export declare const HeatmapChart: React.FC<HeatmapChartProps>;
