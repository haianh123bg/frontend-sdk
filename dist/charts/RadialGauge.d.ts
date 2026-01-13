import { EChartsBaseProps } from './EChartsBase';
import { RadialGaugeDto } from './dto/radial-gauge.dto';
import * as React from 'react';
export interface RadialGaugeProps extends Omit<EChartsBaseProps, 'option'> {
    config: RadialGaugeDto;
}
export declare const RadialGauge: React.FC<RadialGaugeProps>;
