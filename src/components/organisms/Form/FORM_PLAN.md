# Kế hoạch phát triển hệ thống Form

## 1. Phạm vi

Hệ thống Form bao gồm:

- `Form` core: `src/components/organisms/Form/Form.tsx`
- Trường Form:
  - `FormField`
  - `FormFieldController`
- Hooks:
  - `useZodForm`
  - `useFormErrors`
  - `useFormSubmit`
- UI lỗi chung:
  - `FormErrorBanner`
- Entry tổng: `src/forms/index.ts`

## 2. Mục tiêu

- **Đơn giản hóa DX** khi xây form CRUD/API thông qua các hook & component ở mức cao hơn.
- **Chuẩn hóa xử lý lỗi** (validation + lỗi API) giữa các form.
- **Cải thiện UX**: focus/scroll tới field lỗi, hiển thị loading, banner lỗi chung.
- **Dễ mở rộng**: hỗ trợ field động, multi-step, test & stories đầy đủ.

## 3. Hiện trạng tóm tắt

- `Form`:
  - Bọc `react-hook-form` bằng `FormProvider`.
  - Cho phép:
    - Truyền `methods` (form đã khởi tạo sẵn).
    - Hoặc tự tạo form từ `options`.
    - Nhận `schema?: ZodSchema` để tự cấu hình `zodResolver`.
    - Nhận `formRef` để chia sẻ ref ra ngoài.
  - Dispatch event bus:
    - `FORM_SUBMIT` khi submit hợp lệ.
    - `FORM_VALIDATE` khi có lỗi.

- `FormField`:
  - Nếu có `name` + nằm trong `FormProvider` → tự `register`.
  - Tự đọc lỗi theo đường dẫn `name` từ `formState.errors`.
  - Render label, dấu `*` khi `required`, và message lỗi.

- `FormFieldController`:
  - Bọc `Controller` cho các component controlled.
  - Hỗ trợ `render`/`children` (render prop) để nhận `field`, `fieldState`.
  - Gắn `error` từ `fieldState.error?.message` vào `FormField`.

- `useZodForm`:
  - Helper cho `useForm` với `zodResolver(schema)`.
  - Có overload type để tận dụng `ZodSchema`.

- `useFormErrors`:
  - Nhận `methods: UseFormReturn`.
  - `setFormErrors(apiError)`:
    - Map `fieldErrors[]` → `methods.setError(field, { type: 'server', message })`.
    - Trả về `apiError.message || null` dùng cho banner.
  - Trả thêm `formRef` (dùng để truyền vào `Form`).

- `useFormSubmit`:
  - Gom logic submit async:
    - `request(values)`
    - `parseError`, `onSuccess`, `onError`, `onFinally`.
  - Quản lý state: `isSubmitting`, `formError`, `data`.

- `FormErrorBanner`:
  - Hiển thị message lỗi chung + children, style thống nhất.

- `src/forms/index.ts` export đầy đủ Form + các input/field/hook liên quan.

=> Hệ thống đã đủ dùng cho form chuẩn + lỗi API, nhưng còn lặp code trong mỗi form và thiếu một số tiện ích nâng cao.

## 4. Roadmap phát triển

### Phase 1 – Hoàn thiện core API (ưu tiên cao)

1. **Hook tổng hợp cho form API (`useApiForm`)**

   - Mục tiêu: giảm boilerplate khi kết hợp `useZodForm`, `useFormErrors`, `useFormSubmit`.
   - Đề xuất API:

   ```ts
   const {
     methods,
     formRef,
     handleSubmit,
     formError,
     isSubmitting,
     data,
   } = useApiForm<Values, Result, ApiError>({
     schema,
     defaultValues,
     request,      // gọi API
     parseError,   // map err → ApiError
     onSuccess,    // optional
     onError,      // optional, có thể trả message chung
     onFinally,    // optional
     formOptions,  // các option khác cho useForm
   })
   ```

   - Nội bộ hook:
     - Gọi `useZodForm` (hoặc `useForm` nếu không có `schema`).
     - Dùng `useFormErrors` để có `setFormErrors`, `formRef`.
     - Dùng `useFormSubmit` để wrap `request` + map lỗi API sang `setFormErrors`.

   - Lợi ích:
     - Mỗi form API chỉ cần 1 hook duy nhất để setup.
     - Chuẩn hóa pattern xử lý lỗi server.

2. **Focus/scroll tới field lỗi đầu tiên khi submit invalid**

   - Tận dụng `formRef` đã được truyền vào `Form`.
   - Khi submit invalid hoặc khi `setFormErrors` được gọi:
     - Xác định field đầu tiên có lỗi từ `formState.errors`.
     - Tìm element tương ứng trong DOM (theo `name` / `id`).
     - Gọi `focus()` + `scrollIntoView({ block: 'center' })`.
   - Có thể triển khai:
     - Trong `Form` (trong `handleInvalid`).
     - Hoặc trong một hook phụ, ví dụ `useFocusFirstError(formRef, methods)`.

3. **Siết type cho `FormFieldController`**

   - Hiện tại `control?: any` → mất type-safety.
   - Cập nhật:
     - `control?: Control<TFieldValues>`.
   - Kiểm tra lại các chỗ sử dụng để đảm bảo không bị lỗi type.

4. **Re-export hooks & types form từ `src/forms` (tùy chọn)**

   - Cân nhắc export thêm từ `forms/index.ts`:
     - `useForm`, `useFormContext`, `Controller`, `FieldValues`, `Path`, `Control`, …
   - Mục đích:
     - Đảm bảo app chỉ cần import từ 1 entry nếu muốn.

### Phase 2 – Cải thiện UX & tính năng nâng cao

5. **Abstraction cho field dynamic / field array**

   - Dựa trên `useFieldArray` của `react-hook-form`.
   - Xây các building block:
     - `FormFieldArray` / `FormList` với API kiểu:
       - `fields`, `append`, `remove`, `move`, …
       - Render-prop để render từng item.
     - Tự hiển thị lỗi cho từng item nếu cần.
   - Use-case: danh sách phone, emails, items trong giỏ hàng, v.v.

6. **Component Submit button chuẩn cho Form**

   - Xây `FormSubmitButton` hoặc `Form.Submit`:
     - Dùng `useFormContext` để đọc `formState.isSubmitting`.
     - Gắn `type="submit"`, disable + loading dựa trên `isSubmitting`.
   - Giúp các form đơn giản không cần dùng `useFormSubmit` vẫn có UX loading tốt.

7. **Cải thiện event bus / tracking**

  - Thêm prop `formId?: string` vào `FormProps` trong `Form.tsx` để định danh từng form.
  - Khi dispatch `FORM_SUBMIT` và `FORM_VALIDATE`, truyền `formId` (và/hoặc `formName`) trong payload hoặc `meta`.
  - Giúp analytics/logging phân biệt các form khác nhau.

### Phase 3 – Stories & Testing

9. **Mở rộng Storybook cho Form**

   - Bổ sung stories cho:
     - `FormFieldController` với các component controlled (Select, DatePicker, MaskedInput, …).
     - Form với field động (field array).
     - Form multi-step (nếu đã implement).
     - Demo focus vào field lỗi đầu tiên.
     - Demo form dùng `FormSubmitButton` + `formState.isSubmitting` mà không cần `useFormSubmit`.

9. **Test cho hooks & components chính**

   - `useZodForm`:
     - Đảm bảo schema được gắn đúng vào resolver.
   - `useFormErrors`:
     - Map đúng `fieldErrors` → `setError`.
     - Trả về message chung đúng.
   - `useFormSubmit`:
     - Kiểm tra `isSubmitting` trước/sau.
     - `formError` được set đúng khi `onError` trả message.
     - `onSuccess`, `onError`, `onFinally` được gọi đúng thứ tự.
   - `FormField` / `FormFieldController`:
     - Auto register khi có `name`.
     - Hiển thị lỗi field đúng với `formState.errors`.

10. **Tài liệu nội bộ / hướng dẫn sử dụng**

   - Viết một README ngắn (có thể trong cùng thư mục hoặc doc chung):
     - Cách tạo form đơn giản dùng `Form + useForm`.
     - Cách dùng `useZodForm`.
     - Cách dùng combo `useFormErrors + useFormSubmit` hoặc hook `useApiForm` (sau khi có).
     - Ví dụ chuẩn cho form API (login, contact form, form tạo bản ghi CRUD).

## 5. Danh sách công việc (checklist)

### Phase 1 – Core API

- [ ] Thiết kế chi tiết API cho `useApiForm` và implement hook.
- [ ] Thay các story/demo hiện tại dùng pattern cũ sang dùng `useApiForm` (ít nhất 1–2 form).
- [ ] Implement focus/scroll tới field lỗi đầu tiên khi submit invalid.
- [ ] Cập nhật type của `FormFieldController.control` thành `Control<TFieldValues>`.
- [ ] (Tuỳ chọn) Re-export các hook/type cần thiết từ `forms/index.ts`.

### Phase 2 – UX nâng cao

- [ ] Thiết kế API cho `FormFieldArray` / `FormList` dựa trên `useFieldArray`.
- [ ] Implement component hỗ trợ field array + ví dụ demo.
- [ ] Thiết kế và implement `FormSubmitButton` đọc `formState.isSubmitting`.
- [ ] Thêm prop `formId` vào `Form.tsx` và bổ sung `formId`/`formName` vào payload/meta khi dispatch event bus.

### Phase 3 – Stories & Test

- [ ] Viết stories mới cho `FormFieldController` với nhiều loại input controlled.
- [ ] Viết stories cho field array & (nếu có) multi-step form.
- [ ] Viết unit test/RTL test cho `useZodForm`, `useFormErrors`, `useFormSubmit`.
- [ ] Viết test cho `FormField` / `FormFieldController` (render label, error, auto register).
- [ ] Viết README/hướng dẫn sử dụng hệ thống Form.

---

Tài liệu này có thể được cập nhật dần khi yêu cầu thực tế thay đổi hoặc khi hệ thống Form phát triển thêm các tính năng mới (ví dụ: auto-save draft, optimistic update, v.v.).
