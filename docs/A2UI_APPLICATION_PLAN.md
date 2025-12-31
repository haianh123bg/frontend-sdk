# Kế hoạch (để dành): Ứng dụng A2UI trong ChatKit / RedAI SDK

## 1) Mục tiêu
- Đánh giá khả năng **interop** với A2UI (một generative UI spec) khi backend/agent trả về UI theo A2UI.
- Xác định phương án triển khai phù hợp với ChatKit (đang dùng `UISchemaDocument` + `UIComponent` DSL):
  - Adapter A2UI -> ChatKit DSL
  - Hoặc renderer A2UI song song

## 2) Câu hỏi cần trả lời
- A2UI schema cụ thể gồm những node types/props/interaction model nào?
- A2UI có cơ chế data-binding/state không? Nếu có, format ra sao?
- Luồng action/submit của A2UI: event name/payload contract như nào?
- A2UI có quy ước về validation/whitelisting và sandboxing không?

## 3) Phương án kỹ thuật

### 3.1 Adapter A2UI -> ChatKit DSL (khuyến nghị nếu muốn giữ ChatKit renderer)
- Parse payload A2UI.
- Validate + normalize.
- Map node types A2UI sang ChatKit `UIComponent.type`.
- Map props và children.
- Map interactions sang `ChatKitActionEvent`.

Ưu:
- Reuse `SchemaRenderer` + registries + styling.
- Ít bề mặt code.

Nhược:
- Không hỗ trợ 100% A2UI nếu spec có component/behavior ChatKit chưa có.

### 3.2 Renderer A2UI riêng
- Implement `A2uiRenderer` + `A2uiRegistry`.
- Render trực tiếp A2UI schema.

Ưu:
- Bám chuẩn A2UI tốt hơn.

Nhược:
- Tốn công (component set, theme, action model, security).

## 4) Tích hợp với realtime/state
- Nếu A2UI chỉ mô tả UI structure: kết hợp với kế hoạch `CHATKIT_STATE_ACTIVITY_PLAN.md` để:
  - giữ UI structure tương đối ổn định
  - cập nhật data qua `state/activity delta`

## 5) Deliverables
- 1 adapter/renderer POC.
- Bộ test fixtures (schema mẫu) + storybook.
- Tài liệu mapping table A2UI -> ChatKit.

## 6) Status
- File này là kế hoạch để dành; chưa triển khai.
