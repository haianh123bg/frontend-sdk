import * as React from 'react'
import { Badge } from '../../../../atoms/Badge/Badge'
import type { SchemaComponentProps } from '../../types'

export const BadgeNode: React.FC<SchemaComponentProps> = ({ node, renderChildren }) => {
  const { text, variant = 'default', size = 'sm', className, ...rest } = (node.props ?? {}) as Record<string, any>
  return (
    <Badge variant={variant} size={size} className={className} {...rest}>
      {text != null ? String(text) : renderChildren()}
    </Badge>
  )
}
