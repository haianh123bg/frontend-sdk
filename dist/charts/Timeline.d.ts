import { EChartsBaseProps } from './EChartsBase';
import { TimelineDto } from './dto/timeline.dto';
import * as React from 'react';
export interface TimelineProps extends Omit<EChartsBaseProps, 'option'> {
    config: TimelineDto;
}
export declare const Timeline: React.FC<TimelineProps>;
