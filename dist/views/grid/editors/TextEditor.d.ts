import { default as React } from 'react';

interface TextEditorProps {
    value: any;
    onChange: (value: any) => void;
    onCommit: () => void;
    onCancel: () => void;
    autoFocus?: boolean;
}
declare const TextEditor: React.FC<TextEditorProps>;
export default TextEditor;
