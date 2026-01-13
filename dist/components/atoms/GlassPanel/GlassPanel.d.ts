import * as React from 'react';
export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    tone?: 'dark' | 'light';
    blur?: 'sm' | 'md' | 'lg';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    rounded?: 'md' | 'lg' | 'xl' | '2xl';
    interactive?: boolean;
}
export declare const GlassPanel: React.ForwardRefExoticComponent<GlassPanelProps & React.RefAttributes<HTMLDivElement>>;
