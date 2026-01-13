import * as React from 'react';
export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Giá trị rating hiện tại (mode controlled). */
    value?: number;
    /** Giá trị mặc định khi uncontrolled. */
    defaultValue?: number;
    /** Số lượng icon tối đa, mặc định 5. */
    max?: number;
    /** Chỉ hiển thị, không cho phép thay đổi. */
    readOnly?: boolean;
    /** Vô hiệu hóa tương tác. */
    disabled?: boolean;
    /** Cho phép click lại vào cùng giá trị để clear về 0. */
    allowClear?: boolean;
    /** Kích thước icon. */
    size?: 'sm' | 'md' | 'lg';
    /** Hiển thị text giá trị (vd: 3/5). */
    showValue?: boolean;
    /** Callback khi giá trị thay đổi. */
    onChange?: (value: number) => void;
}
export declare const Rating: React.ForwardRefExoticComponent<RatingProps & React.RefAttributes<HTMLDivElement>>;
