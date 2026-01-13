import * as React from 'react';
export interface TiptapEditorProps {
    value?: string;
    onValueChange?: (html: string) => void;
    className?: string;
    placeholder?: string;
}
export declare const TiptapEditor: React.FC<TiptapEditorProps>;
