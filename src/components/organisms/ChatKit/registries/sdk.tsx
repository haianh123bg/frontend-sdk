import type { ComponentRegistry } from '../types'
import { CheckboxNode } from './sdk/CheckboxNode'
import { InputNode } from './sdk/InputNode'
import { RadioNode } from './sdk/RadioNode'
import { SelectNode } from './sdk/SelectNode'
import { SliderNode } from './sdk/SliderNode'
import { SwitchNode } from './sdk/SwitchNode'
import { TextareaNode } from './sdk/TextareaNode'

export const sdkComponentRegistry: ComponentRegistry = {
  input: InputNode,
  text_input: InputNode,
  textarea: TextareaNode,
  select: SelectNode,
  checkbox: CheckboxNode,
  radio: RadioNode,
  switch: SwitchNode,
  slider: SliderNode,
}
