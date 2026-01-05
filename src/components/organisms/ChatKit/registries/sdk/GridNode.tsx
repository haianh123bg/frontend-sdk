import * as React from 'react'
import { Grid } from '../../../../atoms/Grid/Grid'
import type { SchemaComponentProps } from '../../types'

export const GridNode: React.FC<SchemaComponentProps> = ({ node, renderChildren }) => {
    const { container, spacing, size, className, ...rest } = (node.props ?? {}) as Record<string, any>

    return (
        <Grid
            container={container}
            spacing={spacing}
            size={size}
            className={className}
            {...rest}
        >
            {renderChildren()}
        </Grid>
    )
}
