import { EChartsBaseProps } from './EChartsBase';
import { CalendarViewDto } from './dto/calendar-view.dto';
import * as React from 'react';
export interface CalendarViewProps extends Omit<EChartsBaseProps, 'option'> {
    config: CalendarViewDto;
}
export declare const CalendarView: React.FC<CalendarViewProps>;
