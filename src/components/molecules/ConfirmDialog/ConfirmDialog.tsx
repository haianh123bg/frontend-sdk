// File: src/components/molecules/ConfirmDialog/ConfirmDialog.tsx
import * as React from 'react'
import { Button } from '../../atoms/Button/Button'
import { Modal } from '../Modal/Modal'

export interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  isLoading,
  onConfirm,
  onCancel,
}) => {
  const [internalLoading, setInternalLoading] = React.useState(false)

  const handleClose = () => {
    if (internalLoading || isLoading) return
    onOpenChange(false)
    onCancel?.()
  }

  const handleConfirm = async () => {
    if (!onConfirm) {
      onOpenChange(false)
      return
    }
    try {
      setInternalLoading(true)
      await onConfirm()
      onOpenChange(false)
    } finally {
      setInternalLoading(false)
    }
  }

  const loading = isLoading ?? internalLoading

  return (
    <Modal open={open} onClose={handleClose} title={title} size="sm">
      {description && <p className="mb-4 text-sm text-text-secondary">{description}</p>}
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={handleClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant={confirmVariant}
          onClick={handleConfirm}
          isLoading={loading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}

ConfirmDialog.displayName = 'ConfirmDialog'
