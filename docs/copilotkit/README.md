# Bộ tài liệu phân tích CopilotKit (kiến trúc & cách ứng dụng)

Thư mục này tổng hợp và phân tích kiến trúc CopilotKit để phục vụ việc thiết kế/tích hợp vào sản phẩm và SDK.

## Mục tiêu

- Nắm **kiến trúc tổng thể** CopilotKit (Frontend ↔ Runtime ↔ Agent/Protocols).
- Hiểu **các khối tính năng cốt lõi**: Actions, Shared State, Generative UI, Human-in-the-Loop.
- Có **checklist áp dụng** và **gợi ý mapping** sang SDK hiện tại.

## Nguồn tham chiếu

- Docs (live): https://docs.copilotkit.ai/
- Bản tổng hợp docs cho LLM: https://docs.copilotkit.ai/llms-full.txt
- Nguồn MDX của docs (GitHub): https://github.com/CopilotKit/CopilotKit/tree/main/docs/content/docs
- Sitemap (tham khảo route): https://docs.copilotkit.ai/sitemap.xml

## Mục lục file

- `01-tong-quan.md`
- `02-kien-truc-tong-the.md`
- `03-thanh-phan-va-trach-nhiem.md`
- `04-agentic-protocols.md`
- `05-frontend-actions.md`
- `06-backend-actions.md`
- `07-shared-state.md`
- `08-generative-ui.md`
- `09-human-in-the-loop.md`
- `10-mcp-integration.md`
- `11-checklist-ap-dung.md`
- `12-goi-y-tich-hop-vao-sdk.md`

## Cách đọc nhanh (gợi ý)

- Bắt đầu ở `01` → `02` → `04` để hiểu “trục kiến trúc”.
- Sau đó chọn nhánh theo nhu cầu: Actions/State/UI/HITL.
- Nếu bạn đang tích hợp vào repo này: đọc `12`.
