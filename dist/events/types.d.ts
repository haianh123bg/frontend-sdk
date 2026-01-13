export declare enum EventType {
    UI_CLICK = "UI.CLICK",
    UI_HOVER = "UI.HOVER",
    UI_CHANGE = "UI.CHANGE",
    FORM_SUBMIT = "FORM.SUBMIT",
    FORM_VALIDATE = "FORM.VALIDATE",
    SYSTEM_INIT = "SYSTEM.INIT",
    SYSTEM_ERROR = "SYSTEM.ERROR",
    NAV_ROUTE = "NAV.ROUTE"
}
export interface ActionEvent<T = any> {
    id: string;
    type: EventType | string;
    timestamp: number;
    source?: string;
    payload: T;
    meta?: {
        component?: string;
        version?: string;
        correlationId?: string;
        [key: string]: any;
    };
    flags?: {
        sensitive?: boolean;
        persist?: boolean;
        priority?: 'low' | 'medium' | 'high';
    };
}
export type EventHandler<T = any> = (event: ActionEvent<T>) => void | Promise<void>;
export interface Subscription {
    unsubscribe: () => void;
}
