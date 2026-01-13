import { FieldValues, UseFormProps, UseFormReturn, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { FetchOptionsResult } from '../../atoms/Select/SelectLazy';
import { FormObjectSchema, TableOptionsSource, ViewQueryOptionsSource, LookupOptionsSource } from '../../../forms/schema';
import * as React from 'react';
export interface SchemaFormOptionsProvider {
    fetchTableOptions?: (params: {
        source: TableOptionsSource;
        page: number;
        pageSize: number;
        search?: string;
        values: Record<string, any>;
    }) => Promise<FetchOptionsResult>;
    fetchViewQueryOptions?: (params: {
        source: ViewQueryOptionsSource;
        page: number;
        pageSize: number;
        search?: string;
        values: Record<string, any>;
    }) => Promise<FetchOptionsResult>;
    fetchLookupOptions?: (params: {
        source: LookupOptionsSource;
        page: number;
        pageSize: number;
        search?: string;
        values: Record<string, any>;
    }) => Promise<FetchOptionsResult>;
}
export interface SchemaFormProps<TFieldValues extends FieldValues = FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onInvalid'> {
    schema: FormObjectSchema;
    methods?: UseFormReturn<TFieldValues>;
    formOptions?: UseFormProps<TFieldValues>;
    onSubmit?: SubmitHandler<TFieldValues>;
    onInvalid?: SubmitErrorHandler<TFieldValues>;
    optionsProvider?: SchemaFormOptionsProvider;
    gridSpacing?: 0 | 1 | 2 | 3 | 4;
    renderFooter?: (params: {
        methods: UseFormReturn<TFieldValues>;
    }) => React.ReactNode;
}
export declare function SchemaForm<TFieldValues extends FieldValues = FieldValues>({ schema, methods: methodsProp, formOptions, onSubmit, onInvalid, optionsProvider, gridSpacing, renderFooter, className, ...rest }: SchemaFormProps<TFieldValues>): import("react/jsx-runtime").JSX.Element;
