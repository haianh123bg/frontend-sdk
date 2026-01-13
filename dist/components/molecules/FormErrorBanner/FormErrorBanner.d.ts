import * as React from 'react';
export interface FormErrorBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    message?: string | null;
}
export declare const FormErrorBanner: React.FC<FormErrorBannerProps>;
