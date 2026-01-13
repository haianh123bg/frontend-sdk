import { ButtonProps } from '../../atoms/Button/Button';
import * as React from 'react';
export interface FormSubmitButtonProps extends Omit<ButtonProps, 'type'> {
}
export declare const FormSubmitButton: React.ForwardRefExoticComponent<FormSubmitButtonProps & React.RefAttributes<HTMLButtonElement>>;
