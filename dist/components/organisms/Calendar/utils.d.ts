import { CalendarViewType } from './types';

export declare const getLocalTimeZone: () => string;
export declare const toDateString: (date: Date, locale?: import('date-fns').Locale) => string;
export declare const toDateTimeString: (date: Date, locale?: import('date-fns').Locale) => string;
export declare const parseDateString: (value?: string) => Date | undefined;
export declare const parseDateTimeString: (value?: string) => Date | undefined;
export declare const formatRangeTitle: (start: Date, endExclusive: Date, view: CalendarViewType, locale?: import('date-fns').Locale) => string;
export declare const normalizeEnd: (start: Date, end: Date | null, allDay: boolean) => Date;
