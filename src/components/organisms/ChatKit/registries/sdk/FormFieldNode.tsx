import * as React from 'react'
import { FormField } from '../../../../molecules/FormField/FormField'
import type { SchemaComponentProps } from '../../types'

export const FormFieldNode: React.FC<SchemaComponentProps> = ({ node, renderChildren }) => {
    const { label, required, name, error, className, ...rest } = (node.props ?? {}) as Record<string, any>

    return (
        <FormField
            label={label}
            required={required}
            name={name}
            error={error}
            className={className}
            {...rest}
        >
            {renderChildren()}
        </FormField>
    )
}
