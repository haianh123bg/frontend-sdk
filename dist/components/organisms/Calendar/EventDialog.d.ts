import { CalendarEvent } from './types';
import * as React from 'react';
export interface EventDialogValue {
    id?: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    timezone: string;
    color?: string;
}
export interface EventDialogProps {
    open: boolean;
    mode: 'create' | 'edit';
    value: EventDialogValue;
    dateFnsLocale?: import('date-fns').Locale;
    onCancel: () => void;
    onSave: (value: EventDialogValue) => void;
    onDelete?: () => void;
}
export declare const EventDialog: React.FC<EventDialogProps>;
export declare const eventToDialogValue: (event: CalendarEvent) => EventDialogValue;
