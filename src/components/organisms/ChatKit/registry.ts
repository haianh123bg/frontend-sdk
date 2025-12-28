import type { ComponentRegistry, SchemaComponent } from './types'

export function createComponentRegistry(initial?: ComponentRegistry): ComponentRegistry {
  return { ...(initial ?? {}) }
}

export function registerComponent(registry: ComponentRegistry, type: string, component: SchemaComponent): ComponentRegistry {
  return { ...registry, [type]: component }
}

export function mergeComponentRegistry(...registries: Array<ComponentRegistry | undefined>): ComponentRegistry {
  return Object.assign({}, ...(registries.filter(Boolean) as ComponentRegistry[])) as ComponentRegistry
}
