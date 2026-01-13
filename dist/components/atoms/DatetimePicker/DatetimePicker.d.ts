import { DatePickerLocale } from '../DatePicker/DatePicker';
import * as React from 'react';
export interface DatetimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue'> {
    error?: boolean;
    fullWidth?: boolean;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /**
     * Khi bật autoOpen, dropdown sẽ tự mở khi component render và không bị disabled.
     */
    autoOpen?: boolean;
    /**
     * Khi bật inline, chỉ render phần panel chọn ngày/giờ và không render button trigger.
     */
    inline?: boolean;
    locale?: DatePickerLocale;
    weekdayLabels?: [string, string, string, string, string, string, string];
    monthLabelFormatter?: (year: number, monthIndex: number) => string;
    hourLabel?: string;
    minuteLabel?: string;
}
export declare const DatetimePicker: React.ForwardRefExoticComponent<DatetimePickerProps & React.RefAttributes<HTMLInputElement>>;
