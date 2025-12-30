import * as React from 'react'
import { Progress } from '../../../../atoms/Progress/Progress'
import type { SchemaComponentProps } from '../../types'

export const ProgressNode: React.FC<SchemaComponentProps> = ({ node }) => {
  const { value, max, variant, showLabel, type, size, className, ...rest } = (node.props ?? {}) as Record<string, any>

  return (
    <Progress
      value={value != null ? Number(value) : undefined}
      max={max != null ? Number(max) : undefined}
      variant={variant}
      showLabel={Boolean(showLabel)}
      type={type}
      size={size}
      className={className}
      {...rest}
    />
  )
}
