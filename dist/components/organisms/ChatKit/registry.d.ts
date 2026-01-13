import { ComponentRegistry, SchemaComponent } from './types';

export declare function createComponentRegistry(initial?: ComponentRegistry): ComponentRegistry;
export declare function registerComponent(registry: ComponentRegistry, type: string, component: SchemaComponent): ComponentRegistry;
export declare function mergeComponentRegistry(...registries: Array<ComponentRegistry | undefined>): ComponentRegistry;
