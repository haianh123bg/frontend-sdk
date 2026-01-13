import * as React from 'react';
export interface TitleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    fullWidth?: boolean;
}
export declare const TitleInput: React.ForwardRefExoticComponent<TitleInputProps & React.RefAttributes<HTMLInputElement>>;
