import { ChatKitActionEvent } from '../../contracts';
import { ChatKitNodeAction } from '../../types';

export declare function resolveActionEvent(action: ChatKitNodeAction | undefined, conversationId: string | undefined): ChatKitActionEvent | null;
