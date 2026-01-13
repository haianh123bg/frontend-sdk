import { EChartsBaseProps } from './EChartsBase';
import { MetricComparisonDto } from './dto/metric-comparison.dto';
import * as React from 'react';
export interface MetricComparisonProps extends Omit<EChartsBaseProps, 'option'> {
    config: MetricComparisonDto;
}
export declare const MetricComparison: React.FC<MetricComparisonProps>;
