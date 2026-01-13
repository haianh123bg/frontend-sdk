import { CalendarViewType } from './types';
import * as React from 'react';
export interface CalendarToolbarProps {
    title: string;
    view: CalendarViewType;
    onPrev: () => void;
    onNext: () => void;
    onToday: () => void;
    onViewChange: (view: CalendarViewType) => void;
    isToday?: boolean;
    className?: string;
}
export declare const CalendarToolbar: React.FC<CalendarToolbarProps>;
