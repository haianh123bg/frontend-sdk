import { JSONContent } from '@tiptap/core';

export type SimpleEditorContentType = "json" | "html";
type SimpleEditorJsonProps = {
    contentType?: "json";
    applyValue?: JSONContent;
    applyValueKey?: string;
    onValueChange?: (value: JSONContent) => void;
};
type SimpleEditorHtmlProps = {
    contentType: "html";
    applyValue?: string;
    applyValueKey?: string;
    onValueChange?: (value: string) => void;
};
export type SimpleEditorProps = SimpleEditorJsonProps | SimpleEditorHtmlProps;
export declare function SimpleEditor(props: SimpleEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
