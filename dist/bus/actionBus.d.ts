import { ActionEvent, EventHandler, Subscription } from '../events/types';

type Middleware = (next: EventHandler) => EventHandler;
export declare class ActionBus {
    private subscribers;
    private globalSubscribers;
    private middlewares;
    private handlerPipeline;
    constructor();
    use(middleware: Middleware): void;
    private rebuildPipeline;
    private notifySubscribers;
    publish(event: Omit<ActionEvent, 'id' | 'timestamp'>): void;
    subscribe(eventType: string, handler: EventHandler): Subscription;
    subscribeAll(handler: EventHandler): Subscription;
}
export declare const actionBus: ActionBus;
export {};
