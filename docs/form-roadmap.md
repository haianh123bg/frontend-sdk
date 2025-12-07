# Kế hoạch triển khai hệ thống Form toàn diện

## 1. Kiến trúc hiện tại

### 1.1. `Form` (organism)
- Dựa trên `react-hook-form`.
- Props chính:
  - `schema?: ZodSchema<T>`: nếu truyền, `Form` sẽ dùng `zodResolver(schema)` để validate (cần deps `zod`, `@hookform/resolvers`).
  - `methods?: UseFormReturn<T>`: cho phép truyền instance bên ngoài vào.
  - `onSubmit?: SubmitHandler<T>`: callback khi submit hợp lệ.
  - `onInvalid?: SubmitErrorHandler<T>`: callback khi submit lỗi.
  - `options?: UseFormProps<T>`: cấu hình cho `useForm` khi `methods` không được truyền.
- Hành vi:
  - Tự tạo `formMethods` nếu không có `methods` từ ngoài.
  - Nếu có `schema`, khởi tạo `useForm` với `resolver: zodResolver(schema)`.
  - Dùng `FormProvider` để children có thể `useFormContext`.
  - Khi submit hợp lệ:
    - Dispatch `EventType.FORM_SUBMIT` với `{ formData }` (flags.persist = true).
    - Gọi `onSubmit` nếu có.
  - Khi submit lỗi:
    - Dispatch `EventType.FORM_VALIDATE` với `{ success: false, errors }`.
    - Gọi `onInvalid` nếu có.

### 1.2. `FormField` (molecule)
- Pure UI wrapper:
  - Hiển thị `label`, `required *`, `children`, `error` text.
- Chưa gắn chặt với `react-hook-form` hay Zod.
- Có thể tái sử dụng cho mọi control (Input, Select, Textarea, ...).
- Khi dùng `FormField` trong form thực tế, Input không cần tự nhận prop `error` vì wrapper đã hiển thị lỗi. Ví dụ sử dụng tối giản:

```tsx
<FormField name="fieldKey" label={t('marketing:customField.form.fieldKey')} required>
  <Input fullWidth maxLength={50} />
</FormField>
```

### 1.3. `Input` (atom)
- Wrapper quanh `<input />` với style + telemetry:
  - Props: `error?: boolean`, `fullWidth?: boolean`, + mọi props chuẩn của `input`.
  - Dispatch `EventType.UI_CHANGE` khi `onChange`:
    - `meta: { component: 'Input', type }`.
    - `flags.sensitive` cho `password`/`email`.
- Không biết gì về form, validation, error message.

### 1.4. Story hiện tại
- `Form.stories.tsx` dùng thẳng `react-hook-form` trong story:
  - `methods = useForm<ContactFormValues>({...})`.
  - Register field bằng `methods.register('name', { required: true })`.
  - Không có Zod, không có hiển thị error (chỉ alert JSON).

## 2. Mục tiêu hệ thống Form

1. **Validation nhất quán với Zod**
   - Định nghĩa schema một lần.
   - Reuse cho cả client validation và typing.
2. **Handling error hiển thị rõ ràng**
   - Error cho từng field, phù hợp với `FormField` + `Input`.
   - Hỗ trợ error từ API (server-side) đổ ngược vào form.
3. **Tích hợp API**
   - Chuẩn hoá luồng submit: loading, success, error.
   - Dễ gắn vào SDK call / REST fetch.
4. **DX/UX tốt**
   - API đơn giản khi dùng: `useZodForm` + `Form`, `FormField`, `Input`.
   - Storybook demo đầy đủ các case.

## 3. Thiết kế kiến trúc đề xuất

### 3.1. Zod + React Hook Form

1. Thêm helper `useZodForm`:
   - Vị trí gợi ý: `src/forms/useZodForm.ts` hoặc `src/forms/hooks/useZodForm.ts`.
   - Chức năng:
     - Nhận `schema: ZodSchema<T>` và optional `defaultValues`.
     - Trả về `UseFormReturn<T>` sử dụng `zodResolver`.
   - Implementation (ý tưởng):
     - Cài thêm `@hookform/resolvers` và `zod`.
     - Dùng `useForm<T>({ resolver: zodResolver(schema), defaultValues, mode: 'onChange' | 'onBlur' })`.

2. Typing chung:
   - Tạo type alias `ZodForm<TSchema extends ZodSchema>` để lấy ra `FieldValues` từ schema.

### 3.2. Liên kết `FormField` + `react-hook-form`

1. Cách đơn giản ưu tiên: dùng `FormField` trực tiếp (không cần controller) vì `FormField` tự hiển thị lỗi từ context:

```tsx
<FormField
  name="displayName"
  label={t('marketing:customField.form.displayName')}
  required
>
  <Input
    fullWidth
    placeholder={t('marketing:customField.form.displayNamePlaceholder')}
    maxLength={100}
  />
</FormField>
```

2. Tuỳ chọn nâng cao (nếu cần `Controller` cho custom control): tạo `FormFieldController` ở `src/components/molecules/FormField/FormFieldController.tsx`.
   - Sử dụng `useFormContext` + `Controller` hoặc `register`.
   - Props:
     - `name: Path<T>` (từ `react-hook-form`).
     - `label`, `required`, `helperText`.
     - `render` hoặc `children` (có thể chỉ cần `{ field }`, `error` vẫn do `FormField` hiển thị).
   - Trách nhiệm:
     - Lấy `error` từ `formState.errors[name]` và truyền vào `FormField` (`error={message}`) nếu cần override.

### 3.3. Handling error từ Zod & API

1. **Error từ Zod** (client-side):
   - Đã được `react-hook-form` map sang `formState.errors`.
   - `FormFieldController` dùng `fieldState.error?.message` để hiển thị.

2. **Error từ API** (server-side):
   - Chuẩn hoá format error từ API, ví dụ:

```ts
interface ApiFieldError {
  field: string // path trong form (vd: 'email')
  message: string
}

interface ApiErrorResponse {
  message?: string
  fieldErrors?: ApiFieldError[]
}
```

   - Khi submit:
     - Nếu API trả lỗi `fieldErrors`, dùng `methods.setError(field, { type: 'server', message })`.
     - Nếu chỉ có `message` chung, hiển thị ở `Form` level (banner/alert).

3. Hook gợi ý để map lỗi API vào form (tham khảo ý tưởng kiểu `useFormErrors`):

```ts
// src/forms/hooks/useFormErrors.ts (đề xuất)
import { useCallback } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export interface ApiFieldError {
  field: string
  message: string
}
export interface ApiErrorResponse {
  message?: string
  fieldErrors?: ApiFieldError[]
}

export function useFormErrors<TFieldValues extends FieldValues>(methods: UseFormReturn<TFieldValues>) {
  const setFormErrors = useCallback(
    (apiError: ApiErrorResponse) => {
      if (apiError.fieldErrors) {
        apiError.fieldErrors.forEach((err) => {
          methods.setError(err.field as Path<TFieldValues>, { type: 'server', message: err.message })
        })
      }
      return apiError.message || null // trả về lỗi chung để hiển thị banner nếu cần
    },
    [methods]
  )

  return { setFormErrors }
}
```

Cách dùng trong submit:

```ts
const methods = useForm<YourValues>({ ... })
const { setFormErrors } = useFormErrors(methods)
const [formError, setFormError] = useState<string | null>(null)

const onSubmit = async (values: YourValues) => {
  setFormError(null)
  try {
    await apiCall(values)
  } catch (err) {
    const apiError = parseApiError(err) // map về ApiErrorResponse
    const commonMessage = setFormErrors(apiError)
    if (commonMessage) setFormError(commonMessage)
  }
}
```

3. Thêm `FormErrorBanner` optional:
   - Vị trí: `src/components/molecules/FormErrorBanner/FormErrorBanner.tsx`.
   - Props: `message?: string`.
   - Dùng trong các form lớn cần thông báo lỗi tổng.

### 3.4. Luồng submit & trạng thái loading

1. Chuẩn hoá pattern submit async (dùng hook để tránh `useState` thủ công). Gợi ý hook `useFormSubmit` (chưa implement) trả về `handleSubmit`, `formError`, `isSubmitting` và nhận vào `setFormErrors` từ `useFormErrors`:

```ts
// pseudo: src/forms/hooks/useFormSubmit.ts (đề xuất)
const methods = useZodForm({ schema, defaultValues })
const { setFormErrors } = useFormErrors(methods)
const { handleSubmit, formError, isSubmitting } = useFormSubmit({
  request: apiCall,
  parseError: parseApiError, // map -> ApiErrorResponse
  onError: (apiError) => setFormErrors(apiError), // trả về message chung nếu có
})

// Trong form:
<Form methods={methods} onSubmit={handleSubmit}>
  {/* fields ... */}
  {formError && <FormErrorBanner message={formError} />}
  <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
    Submit
  </Button>
</Form>
```

2. `Form` component hiện tại không quản lý `loading` → để ở hook/use case:
   - Có thể thêm 1 hook `useFormSubmit` gói logic:
     - Giữ `isSubmitting`, `apiError`, helper `handleSubmit`.
   - Tuy nhiên, `react-hook-form` đã có `formState.isSubmitting`, có thể dùng trực tiếp.

3. Button submit:
   - Trong story & example nên disable khi `isSubmitting` và hiển thị spinner.

### 3.5. API integration layer

1. Tạo một lớp helper SDK-friendly, ví dụ `src/forms/api.ts`:
   - Hàm `submitForm<TInput, TOutput>(config: { request: (input: TInput) => Promise<TOutput>; mapError?: ... })`.
   - Trả về `{ execute, loading, error, data }` hoặc tích hợp với `useMutation` nếu dùng TanStack Query sau này.

2. Trong ví dụ SDK:
   - Sử dụng `submitForm` trong story/guide để minh hoạ pattern.

## 4. Các bước triển khai cụ thể

### Bước 1: Thêm dependency

- Thêm vào `package.json` (dev hoặc deps):
  - `zod`
  - `@hookform/resolvers`

### Bước 2: Tạo helper `useZodForm`

- File: `src/forms/useZodForm.ts`.
- Chức năng:
  - Nhận `schema`, `defaultValues`, `mode`, `reValidateMode`.
  - Bọc `useForm` + `zodResolver`.
- Export từ SDK để người dùng có thể xài ngoài `Form` nếu muốn.

### Bước 3: Tạo `FormFieldController`

- File: `src/components/molecules/FormField/FormFieldController.tsx`.
- API đề xuất:

```ts
interface FormFieldControllerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  label?: string
  required?: boolean
  helperText?: string
  children?: (params: { field: ControllerRenderProps<TFieldValues>; fieldState: ControllerFieldState }) => ReactNode
  render?: (params: { field: ControllerRenderProps<TFieldValues>; fieldState: ControllerFieldState }) => ReactNode
}
```

- Implementation:
  - Dùng `useFormContext<TFieldValues>()` và `Controller` hoặc `register` tuỳ control.
  - Lấy `error` từ `formState.errors[name]`.
  - Render `FormField` với `error={error?.message}`.

### Bước 4: Cập nhật story `Form`

1. Tạo story mới `WithZodAndErrors`:
   - Định nghĩa `zod` schema cho `ContactFormValues`.
   - Dùng `useZodForm({ schema, defaultValues })`.
   - Form dùng `FormFieldController` + `Input`/`Textarea`.
   - Hiển thị error dưới từng field.

2. Tạo thêm story `WithApiErrors`:
   - Mock API trả lỗi:
     - VD: email đã tồn tại, message quá ngắn.
   - Dùng `setError` để map error server vào field.
   - Hiển thị một `FormErrorBanner` cho lỗi chung.

### Bước 5: Ví dụ tích hợp API thực tế

- Trong README/docs, thêm section "Form + Zod + API":
  - Ví dụ dùng với `fetch` / SDK request.
  - Pattern xử lý lỗi 400 (validation) vs 500 (server error).

### Bước 6: Export public API

- Từ `src/index.ts` export thêm:
  - `useZodForm` (và/hoặc `zodResolver` helper nếu cần).
  - `FormField` và `FormFieldController`.
  - `FormErrorBanner` (nếu triển khai).

## 5. Rủi ro & lưu ý

1. **Bundle size**:
   - Thêm `zod` và `@hookform/resolvers` sẽ tăng kích thước SDK.
   - Có thể chấp nhận vì lợi ích DX, hoặc export ở namespace phụ (vd: `forms`).

2. **Breaking changes**:
   - Giữ `Form` backward-compatible: không bắt buộc dùng Zod.
   - `FormField` vẫn là UI thuần, không thay đổi.

3. **Type complexity**:
   - Cẩn thận generic `TFieldValues` để TS không quá nặng.

4. **API đa ngôn ngữ lỗi**:
   - Kiểu lỗi từ API có thể khác nhau giữa project; nên để `mapError` có thể tuỳ biến.

## 6. Ưu tiên triển khai

1. **MVP** (nên làm ngay):
   - Thêm `zod` + `@hookform/resolvers`.
   - `useZodForm` helper.
   - Story `Form` với Zod + error hiển thị qua `FormField`.

2. **V2**:
   - `FormFieldController` generic.
   - Story `WithApiErrors` + `FormErrorBanner`.

3. **V3** (nếu cần):
   - Helper `submitForm` / `useFormSubmit` tích hợp API.
   - Docs chi tiết + snippet cho người dùng SDK.
