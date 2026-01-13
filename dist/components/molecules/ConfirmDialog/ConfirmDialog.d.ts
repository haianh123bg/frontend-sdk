import * as React from 'react';
export interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
}
export declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
