import * as React from 'react';
export interface AccordionItem {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}
export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    items: AccordionItem[];
    defaultOpenIds?: string[];
    multiple?: boolean;
    onChange?: (openIds: string[]) => void;
}
export declare const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
