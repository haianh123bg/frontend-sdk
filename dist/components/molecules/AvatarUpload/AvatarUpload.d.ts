import * as React from 'react';
export type AvatarUploadShape = 'circle' | 'square' | 'rect';
export type AvatarUploadSize = 'sm' | 'md' | 'lg';
export interface AvatarUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onBlur' | 'onChange'> {
    name?: string;
    value?: File | string | null;
    defaultValue?: File | string | null;
    onValueChange?: (value: File | string | null) => void;
    onChange?: (value: File | string | null) => void;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    accept?: string;
    shape?: AvatarUploadShape;
    size?: AvatarUploadSize;
    alt?: string;
    placeholder?: React.ReactNode;
    allowClear?: boolean;
    allowReplace?: boolean;
}
export declare const AvatarUpload: React.ForwardRefExoticComponent<AvatarUploadProps & React.RefAttributes<HTMLDivElement>>;
