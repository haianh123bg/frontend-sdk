import * as React from 'react'
import { Form } from '../../../../organisms/Form/Form'
import type { SchemaComponentProps } from '../../types'

export const FormNode: React.FC<SchemaComponentProps> = ({ node, renderChildren, onAction, conversationId }) => {
    const { className, ...rest } = (node.props ?? {}) as Record<string, any>

    // FormNode delegates logic to the smart Form component
    // This supports both 'methods' injection and JSON configuration (defaultValues, schema, etc.)
    const onSubmit = (values: any) => {
        if (onAction && conversationId) {
            onAction({
                type: 'form.submit',
                conversationId,
                payload: { values }
            })
        }
    }

    return (
        <Form
            className={className}
            onSubmit={onSubmit}
            {...rest}
        >
            {renderChildren()}
        </Form>
    )
}
