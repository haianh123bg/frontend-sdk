import { ChipVariant } from '../../atoms/Chip/Chip';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';
export interface TableFilterFieldDefinition {
    id: string;
    label: string;
    icon?: LucideIcon;
    type?: string;
    options?: {
        label: string;
        value: string;
    }[];
    meta?: Record<string, unknown>;
}
export interface TableFilterInstance {
    fieldId: string;
    operator?: string;
    value?: unknown;
}
export type TableFilterToolbarI18n = {
    buttonLabel: string;
    searchPlaceholder: string;
    emptyLabel: string;
    appliedFiltersLabel: string;
    clearAllLabel: string;
    yesLabel: string;
    noLabel: string;
    rangeFromPlaceholder: string;
    rangeToPlaceholder: string;
    rangeGtePrefix: string;
    rangeLtePrefix: string;
    rangeSeparator: string;
    operators: {
        from: string;
        to: string;
        between: string;
        empty: string;
        notEmpty: string;
        eq: string;
        neq: string;
        gt: string;
        gte: string;
        lt: string;
        lte: string;
        contains: string;
        notContains: string;
        startsWith: string;
        endsWith: string;
        is: string;
        isNot: string;
        in: string;
        notIn: string;
    };
};
type TableFilterToolbarI18nInput = Partial<Omit<TableFilterToolbarI18n, 'operators'>> & {
    operators?: Partial<TableFilterToolbarI18n['operators']>;
};
export type TableFilterToolbarChipGroup = 'filter' | 'sort';
export type TableFilterToolbarChipVariantConfig = {
    active?: ChipVariant;
    inactive?: ChipVariant;
};
export interface TableFilterToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    fields: TableFilterFieldDefinition[];
    filters: TableFilterInstance[];
    onFiltersChange: (filters: TableFilterInstance[]) => void;
    i18n?: TableFilterToolbarI18nInput;
    chipVariants?: Partial<Record<TableFilterToolbarChipGroup, TableFilterToolbarChipVariantConfig>>;
    getChipVariant?: (params: {
        group: TableFilterToolbarChipGroup;
        field: TableFilterFieldDefinition;
        filter: TableFilterInstance;
        hasValue: boolean;
    }) => ChipVariant | undefined;
    addButtonChipVariant?: ChipVariant;
    renderFieldEditor?: (params: {
        field: TableFilterFieldDefinition;
        filter: TableFilterInstance;
        onChange: (value: unknown) => void;
    }) => React.ReactNode;
    formatValue?: (field: TableFilterFieldDefinition, value: unknown) => string;
}
export declare const TableFilterToolbar: React.ForwardRefExoticComponent<TableFilterToolbarProps & React.RefAttributes<HTMLDivElement>>;
export {};
