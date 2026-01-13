import * as React from 'react';
export type FileUploaderSelectedFilesLayout = 'vertical' | 'horizontal' | 'wrap';
export interface FileUploaderSelectedFilesProps extends React.HTMLAttributes<HTMLDivElement> {
    files: File[];
    imagePreviews?: Record<string, string>;
    layout?: FileUploaderSelectedFilesLayout;
    disabled?: boolean;
    allowRemove?: boolean;
    onRemove?: (index: number) => void;
}
export declare const FileUploaderSelectedFiles: React.ForwardRefExoticComponent<FileUploaderSelectedFilesProps & React.RefAttributes<HTMLDivElement>>;
