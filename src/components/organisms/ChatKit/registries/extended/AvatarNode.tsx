import * as React from 'react'
import { Avatar } from '../../../../atoms/Avatar/Avatar'
import type { SchemaComponentProps } from '../../types'

export const AvatarNode: React.FC<SchemaComponentProps> = ({ node }) => {
  const { src, alt, initials, size = 'md', status, shape, className, ...rest } = (node.props ?? {}) as Record<string, any>
  return <Avatar src={src} alt={alt} initials={initials} size={size} status={status} shape={shape} className={className} {...rest} />
}
