import { CalendarEvent } from './types';
import * as React from 'react';
export interface InfiniteMonthCalendarVisibleRange {
    start: Date;
    endExclusive: Date;
}
export interface InfiniteMonthCalendarProps {
    events?: CalendarEvent[];
    defaultEvents?: CalendarEvent[];
    onEventsChange?: (events: CalendarEvent[]) => void;
    weekdayLabels?: string[];
    height?: number | string;
    className?: string;
    style?: React.CSSProperties;
    dateFnsLocale?: import('date-fns').Locale;
    initialMonth?: Date | string;
    monthsBefore?: number;
    monthsAfter?: number;
    estimateMonthHeight?: number;
    overscan?: number;
    onVisibleRangeChange?: (range: InfiniteMonthCalendarVisibleRange) => void;
    onEventCreate?: (event: CalendarEvent) => void | Promise<void>;
    onEventUpdate?: (event: CalendarEvent) => void | Promise<void>;
    onEventDelete?: (eventId: string) => void | Promise<void>;
}
export declare const InfiniteMonthCalendar: React.FC<InfiniteMonthCalendarProps>;
