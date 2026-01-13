import * as React from 'react';
export interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
}
export interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
    onChange?: (tabId: string) => void;
    className?: string;
    noBorder?: boolean;
    noDivider?: boolean;
}
export declare const Tabs: React.FC<TabsProps>;
