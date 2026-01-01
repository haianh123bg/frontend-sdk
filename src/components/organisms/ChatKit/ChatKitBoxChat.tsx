import * as React from 'react'
import { BoxChat, type BoxChatProps } from '../Chat/BoxChat'
import type { ChatMessage } from '../Chat/types'
import type { ChatKitActivity, ChatKitState } from './contracts'
import type { ComponentRegistry, UIComponent } from './types'
import type { ChatTransport } from './transport'
import { ChatRuntimeProvider, useChatRuntime } from './runtime'
import { ChatKitViewPanel } from './ChatKitViewPanel'
import type { ActivityRegistry } from './ActivityRenderer'

export interface ChatKitBoxChatProps
  extends Omit<
    BoxChatProps,
    | 'messages'
    | 'onSend'
    | 'widgets'
    | 'onWidgetAction'
    | 'agentThinking'
    | 'typingText'
    | 'onLoadOlder'
    | 'hasMoreOlder'
    | 'isLoadingOlder'
    | 'enableOptimistic'
    | 'view'
  > {
  transport: ChatTransport
  initialMessages?: ChatMessage[]
  initialWidgets?: UIComponent[]
  initialState?: ChatKitState
  initialActivities?: ChatKitActivity[]
  runtimeEnableOptimistic?: boolean
  renderWidgetsInChat?: boolean
  view?: React.ReactNode
  viewTitle?: React.ReactNode
  activityRegistry?: ActivityRegistry
  viewWidgetRegistry?: ComponentRegistry
}

type InnerProps = {
  boxChatProps: Omit<
    ChatKitBoxChatProps,
    | 'transport'
    | 'initialMessages'
    | 'initialWidgets'
    | 'initialState'
    | 'initialActivities'
    | 'runtimeEnableOptimistic'
    | 'renderWidgetsInChat'
    | 'view'
    | 'viewTitle'
    | 'viewWidgetRegistry'
  >
  renderWidgetsInChatResolved: boolean
  viewOverride?: React.ReactNode
  viewTitle?: React.ReactNode
  viewWidgetRegistry?: ComponentRegistry
}

const ChatKitBoxChatInner: React.FC<InnerProps> = ({
  boxChatProps,
  renderWidgetsInChatResolved,
  viewOverride,
  viewTitle,
  viewWidgetRegistry,
}) => {
  const rt = useChatRuntime()

  const view = React.useMemo(() => {
    if (viewOverride != null) return viewOverride

    return (
      <ChatKitViewPanel
        title={viewTitle}
        widgets={rt.widgets}
        state={rt.state}
        widgetRegistry={viewWidgetRegistry}
        conversationId={rt.conversationId}
        onAction={(e) => void rt.emitAction(e)}
      />
    )
  }, [rt, viewOverride, viewTitle, viewWidgetRegistry])

  return (
    <BoxChat
      {...boxChatProps}
      messages={rt.messages}
      widgets={renderWidgetsInChatResolved ? rt.widgets : undefined}
      onWidgetAction={(e) => void rt.emitAction(e)}
      agentThinking={rt.agentThinking}
      typingText={rt.typingText}
      onSend={(input) => rt.sendMessage(input)}
      onLoadOlder={() => rt.loadOlder()}
      hasMoreOlder={rt.hasMoreOlder}
      isLoadingOlder={rt.isLoadingOlder}
      enableOptimistic={false}
      view={view}
    />
  )
}

ChatKitBoxChatInner.displayName = 'ChatKitBoxChatInner'

export const ChatKitBoxChat: React.FC<ChatKitBoxChatProps> = ({
  transport,
  initialMessages,
  initialWidgets,
  initialState,
  initialActivities,
  runtimeEnableOptimistic = true,
  renderWidgetsInChat,
  view,
  viewTitle,
  activityRegistry: _activityRegistry,
  viewWidgetRegistry,
  mode = 'floating',
  open,
  ...rest
}) => {
  if (mode !== 'split' && !open) return null

  const renderWidgetsInChatResolved =
    typeof renderWidgetsInChat === 'boolean' ? renderWidgetsInChat : mode !== 'split'

  return (
    <ChatRuntimeProvider
      conversationId={rest.conversationId}
      transport={transport}
      currentUserId={rest.currentUserId}
      currentUserName={rest.currentUserName}
      currentUserAvatarUrl={rest.currentUserAvatarUrl}
      initialMessages={initialMessages}
      initialWidgets={initialWidgets}
      initialState={initialState}
      initialActivities={initialActivities}
      enableOptimistic={runtimeEnableOptimistic}
    >
      <ChatKitBoxChatInner
        boxChatProps={{ mode, open, ...rest }}
        renderWidgetsInChatResolved={renderWidgetsInChatResolved}
        viewOverride={view}
        viewTitle={viewTitle}
        viewWidgetRegistry={viewWidgetRegistry ?? rest.widgetRegistry}
      />
    </ChatRuntimeProvider>
  )
}

ChatKitBoxChat.displayName = 'ChatKitBoxChat'
