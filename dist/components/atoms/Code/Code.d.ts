import * as React from 'react';
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
    block?: boolean;
}
export declare const Code: React.ForwardRefExoticComponent<CodeProps & React.RefAttributes<HTMLElement>>;
