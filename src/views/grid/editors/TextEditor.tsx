import React, { useState, useEffect, useRef } from 'react';

interface TextEditorProps {
    value: any;
    onChange: (value: any) => void;
    onCommit: () => void;
    onCancel: () => void;
    autoFocus?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, onCommit, onCancel, autoFocus = true }) => {
    const [internalValue, setInternalValue] = useState(value ?? '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [autoFocus]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onChange(internalValue);
            onCommit();
        } else if (e.key === 'Escape') {
            onCancel();
        }
    };

    const handleBlur = () => {
        onChange(internalValue);
        onCommit();
    };

    return (
        <input
            ref={inputRef}
            type="text"
            className="w-full h-full px-2 outline-none border-2 border-blue-500 bg-white shadow-sm z-50 text-sm"
            value={internalValue}
            onChange={(e) => setInternalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            style={{ minHeight: '32px' }}
        />
    );
};

export default TextEditor;
