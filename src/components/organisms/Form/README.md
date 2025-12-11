# Hệ thống Form

Tài liệu này mô tả nhanh cách sử dụng hệ thống Form trong SDK, bao gồm `Form`, các hook và helper liên quan.

> Mục tiêu: giảm boilerplate khi làm form CRUD/API, chuẩn hoá validation (Zod) + lỗi API, và cải thiện UX (focus lỗi, loading, banner lỗi chung).

---

## 1. Form cơ bản với `useForm`

```tsx
import { Form, FormField, Input, Textarea, Button, useForm } from 'redai-fe-v2-sdk'

interface ContactFormValues {
  name: string
  email: string
  message: string
}

export function BasicContactForm() {
  const methods = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = (values: ContactFormValues) => {
    console.log(values)
  }

  return (
    <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
      <FormField name="name" label="Name" required>
        <Input placeholder="Jane Cooper" />
      </FormField>
      <FormField name="email" label="Email" required>
        <Input type="email" placeholder="jane@company.com" />
      </FormField>
      <FormField name="message" label="Message">
        <Textarea rows={4} placeholder="How can we help?" />
      </FormField>
      <Button type="submit" className="w-full">
        Send message
      </Button>
    </Form>
  )
}
```

---

## 2. Dùng `useZodForm` cho validation với Zod

```tsx
import { z } from 'zod'
import { Form, FormField, Input, Textarea, Button, useZodForm } from 'redai-fe-v2-sdk'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email không hợp lệ'),
  message: z.string().min(5, 'Message tối thiểu 5 ký tự'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ZodContactForm() {
  const methods = useZodForm<ContactFormValues>({
    schema: contactSchema,
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = (values: ContactFormValues) => {
    console.log(values)
  }

  return (
    <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
      {/* giống ví dụ Basic ở trên */}
    </Form>
  )
}
```

---

## 3. Xử lý lỗi API với `useFormErrors` + `useFormSubmit` (pattern low-level)

Nếu muốn toàn quyền kiểm soát, bạn có thể kết hợp `useFormErrors` và `useFormSubmit` trực tiếp.

```tsx
import { Form, FormField, Input, FormErrorBanner, useZodForm } from 'redai-fe-v2-sdk'
import { useFormErrors, useFormSubmit } from 'redai-fe-v2-sdk'

interface LoginValues {
  email: string
  password: string
}

export function LoginFormLowLevel() {
  const methods = useZodForm<LoginValues>({
    schema: loginSchema,
    defaultValues: { email: '', password: '' },
  })

  const { setFormErrors, formRef } = useFormErrors<LoginValues>(methods)

  const { handleSubmit, isSubmitting, formError } = useFormSubmit<LoginValues, { token: string }, ApiErrorResponse>({
    request: async (values) => {
      // gọi API login
    },
    parseError: (err) => err as ApiErrorResponse,
    onError: (apiError) => {
      // map fieldErrors vào form + trả về message chung
      return setFormErrors(apiError)
    },
  })

  return (
    <Form methods={methods} onSubmit={handleSubmit} formRef={formRef} className="space-y-4">
      <FormErrorBanner message={formError} />
      {/* fields */}
    </Form>
  )
}
```

> Lưu ý: `formRef` sẽ được Form gắn vào DOM form, giúp SDK tự focus/scroll tới field lỗi đầu tiên (kể cả khi lỗi từ API).

---

## 4. Pattern khuyến nghị: `useApiForm`

Trong hầu hết các form API, nên dùng hook tổng hợp `useApiForm` để giảm boilerplate:

```tsx
import { z } from 'zod'
import {
  Form,
  FormField,
  Input,
  FormErrorBanner,
  useApiForm,
} from 'redai-fe-v2-sdk'

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
})

type LoginValues = z.infer<typeof loginSchema>

interface ApiErrorResponse {
  message?: string
  fieldErrors?: { field: string; message: string }[]
}

export function LoginForm() {
  const { methods, formRef, handleSubmit, formError, isSubmitting } = useApiForm<
    LoginValues,
    { token: string },
    ApiErrorResponse
  >({
    schema: loginSchema,
    formOptions: {
      defaultValues: { email: '', password: '' },
    },
    request: async (values) => {
      // gọi API login
      return { token: 'mock-token' }
    },
    parseError: (err) => err as ApiErrorResponse,
  })

  return (
    <Form methods={methods} onSubmit={handleSubmit} formRef={formRef} className="space-y-4">
      <FormErrorBanner message={formError} />
      <FormField name="email" label="Email" required>
        <Input type="email" placeholder="you@example.com" />
      </FormField>
      <FormField name="password" label="Password" required>
        <Input type="password" placeholder="••••••••" />
      </FormField>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </button>
    </Form>
  )
}
```

`useApiForm` sẽ:

- Khởi tạo form (với `useZodForm` nếu có `schema`).
- Kết hợp `useFormErrors` để map lỗi API → `setError` + auto-focus field lỗi đầu tiên.
- Kết hợp `useFormSubmit` để quản lý `isSubmitting`, `formError`, `data`.

---

## 5. Một số tiện ích khác

- **`FormFieldController`**: Dùng cho các input controlled (Select, DatePicker, v.v.).
- **`FormFieldArray`**: Abstraction cho field động (danh sách email, phone, items…).
- **`FormSubmitButton`**: Nút submit đọc `formState.isSubmitting` tự động bật loading/disabled.
- **`useFormWizard`**: Hỗ trợ multi-step form (wizard) với validate theo từng bước.

Xem thêm các ví dụ chi tiết trong `Form.stories.tsx` (Storybook).
