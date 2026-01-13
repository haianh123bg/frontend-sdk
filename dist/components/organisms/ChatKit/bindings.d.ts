import { ChatKitState } from './contracts';

export type BindingSpec = {
    path: string;
    default?: any;
};
export type BindingsMap = Record<string, BindingSpec>;
export declare function getStateValue(state: ChatKitState | undefined, path: string): any;
export declare function resolveBindings(props: Record<string, any> | undefined, state: ChatKitState | undefined): Record<string, any> | undefined;
