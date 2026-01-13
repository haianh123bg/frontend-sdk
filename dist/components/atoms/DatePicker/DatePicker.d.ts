import * as React from 'react';
export type DatePickerLocale = 'vi-VN' | 'en-US' | 'zh-CN' | 'ja-JP';
export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue'> {
    error?: boolean;
    fullWidth?: boolean;
    /**
     * Hiển thị placeholder cho trigger, ví dụ: "dd/mm/yyyy".
     */
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (date: string) => void;
    /**
     * Khi bật autoOpen, calendar sẽ tự mở khi component render và không bị disabled.
     */
    autoOpen?: boolean;
    /**
     * Khi bật inline, chỉ render phần calendar (như dropdown content) và không render input trigger.
     */
    inline?: boolean;
    /**
     * Locale để định dạng tên tháng, mặc định là "vi-VN".
     */
    locale?: DatePickerLocale;
    /**
     * Nhãn cho các thứ trong tuần.
     */
    weekdayLabels?: [string, string, string, string, string, string, string];
    /**
     * Cho phép custom formatter tên tháng.
     */
    monthLabelFormatter?: (year: number, monthIndex: number) => string;
}
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLInputElement>>;
