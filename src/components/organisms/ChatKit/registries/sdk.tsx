import type { ComponentRegistry } from '../types'
import { AvatarUploadNode } from './sdk/AvatarUploadNode'
import { CheckboxNode } from './sdk/CheckboxNode'
import { DatePickerNode } from './sdk/DatePickerNode'
import { DatetimePickerNode } from './sdk/DatetimePickerNode'
import { ExcelGridNode } from './sdk/ExcelGridNode'
import { FileUploaderNode } from './sdk/FileUploaderNode'
import { InputNode } from './sdk/InputNode'
import { MaskedInputNode } from './sdk/MaskedInputNode'
import { RadioNode } from './sdk/RadioNode'
import { RadioGroupNode } from './sdk/RadioGroupNode'
import { SelectNode } from './sdk/SelectNode'
import { SelectLazyNode } from './sdk/SelectLazyNode'
import { SliderNode } from './sdk/SliderNode'
import { SwitchNode } from './sdk/SwitchNode'
import { ThemeSwitchNode } from './sdk/ThemeSwitchNode'
import { TextareaNode } from './sdk/TextareaNode'
import { TiptapEditorNode } from './sdk/TiptapEditorNode'

export const sdkComponentRegistry: ComponentRegistry = {
  input: InputNode,
  text_input: InputNode,
  textarea: TextareaNode,
  select: SelectNode,
  select_lazy: SelectLazyNode,
  checkbox: CheckboxNode,
  radio: RadioNode,
  radio_group: RadioGroupNode,
  switch: SwitchNode,
  theme_switch: ThemeSwitchNode,
  slider: SliderNode,
  masked_input: MaskedInputNode,
  date_picker: DatePickerNode,
  datetime_picker: DatetimePickerNode,
  file_uploader: FileUploaderNode,
  avatar_upload: AvatarUploadNode,
  tiptap_editor: TiptapEditorNode,
  excel_grid: ExcelGridNode,
}
