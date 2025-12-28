import { Card } from '../../atoms/Card/Card'
import { Row, Col, Box, Divider } from '../../atoms/LayoutPrimitives'
import { Text } from '../../atoms/TypographyPrimitives'
import { Image } from '../../atoms/Image/Image'
import { Button } from '../../atoms/Button/Button'
import type { ChatKitActionEvent } from './contracts'
import type { ChatKitNodeAction, ComponentRegistry, SchemaComponentProps } from './types'

function resolveActionEvent(action: ChatKitNodeAction | undefined, conversationId: string | undefined): ChatKitActionEvent | null {
  if (!action) return null
  const cid = action.conversationId ?? conversationId
  if (!cid) return null
  return { type: action.type, payload: action.payload, conversationId: cid }
}

const CardNode = ({ node, renderChildren }: SchemaComponentProps) => {
  const { title, subtitle, footer, actions, padding, media, mediaPosition, highlight, compact, className, ...rest } =
    (node.props ?? {}) as Record<string, any>

  return (
    <Card
      title={title}
      subtitle={subtitle}
      footer={footer}
      actions={actions}
      padding={padding}
      media={media}
      mediaPosition={mediaPosition}
      highlight={highlight}
      compact={compact}
      className={className}
      {...rest}
    >
      {renderChildren()}
    </Card>
  )
}

const RowNode = ({ node, renderChildren }: SchemaComponentProps) => {
  const { gap, className, ...rest } = (node.props ?? {}) as Record<string, any>
  return (
    <Row gap={gap} className={className} {...rest}>
      {renderChildren()}
    </Row>
  )
}

const ColNode = ({ node, renderChildren }: SchemaComponentProps) => {
  const { gap, className, ...rest } = (node.props ?? {}) as Record<string, any>
  return (
    <Col gap={gap} className={className} {...rest}>
      {renderChildren()}
    </Col>
  )
}

const BoxNode = ({ node, renderChildren }: SchemaComponentProps) => {
  const { padding, className, ...rest } = (node.props ?? {}) as Record<string, any>
  return (
    <Box padding={padding} className={className} {...rest}>
      {renderChildren()}
    </Box>
  )
}

const DividerNode = ({ node }: SchemaComponentProps) => {
  const { className } = (node.props ?? {}) as Record<string, any>
  return <Divider className={className} />
}

const TextNode = ({ node, renderChildren }: SchemaComponentProps) => {
  const { value, text, as, className, ...rest } = (node.props ?? {}) as Record<string, any>
  const content = value ?? text
  return (
    <Text as={as} className={className} {...rest}>
      {content != null ? String(content) : renderChildren()}
    </Text>
  )
}

const ImageNode = ({ node }: SchemaComponentProps) => {
  const { src, url, alt, className, ...rest } = (node.props ?? {}) as Record<string, any>
  return <Image src={src ?? url} alt={alt} className={className} {...rest} />
}

const ButtonNode = ({ node, renderChildren, onAction, conversationId }: SchemaComponentProps) => {
  const { label, text, action, className, onClick, ...rest } = (node.props ?? {}) as Record<string, any>
  const resolvedAction = resolveActionEvent(action as ChatKitNodeAction | undefined, conversationId)

  return (
    <Button
      className={className}
      onClick={(e) => {
        if (resolvedAction && onAction) onAction(resolvedAction)
        if (typeof onClick === 'function') onClick(e)
      }}
      {...rest}
    >
      {label != null ? String(label) : text != null ? String(text) : renderChildren()}
    </Button>
  )
}

export const defaultComponentRegistry: ComponentRegistry = {
  card: CardNode,
  row: RowNode,
  col: ColNode,
  box: BoxNode,
  divider: DividerNode,
  text: TextNode,
  image: ImageNode,
  button: ButtonNode,
}
