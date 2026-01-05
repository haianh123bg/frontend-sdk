import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { ChatKitBoxChat } from './ChatKitBoxChat'
import type { ChatKitActionEvent, ChatResponse } from './contracts'
import type { SendMessageInput } from '../Chat/types'
import type { ChatTransport, ChatStreamHandlers, Unsubscribe } from './transport'
import { defaultComponentRegistry } from './defaultRegistry'
import { sdkComponentRegistry } from './registries/sdk'
import { extendedComponentRegistry } from './registries/extended'

// --- 1. Registry Setup ---

// Combine default (layout), sdk (forms), and extended (rich UI) registries
const fullRegistry = {
  ...defaultComponentRegistry,
  ...sdkComponentRegistry,
  ...extendedComponentRegistry,
}

// --- 2. Scenarios Data (JSON Schemas) ---

const SCENARIOS = {
  welcome: {
    message: "Xin chào! Tôi là trợ lý ảo Redon. Tôi có thể giúp gì cho bạn hôm nay?\n\n*Gợi ý: Thử nhập 'tạo chiến dịch', 'danh sách khóa học', 'báo cáo', hoặc 'hóa đơn'.*",
    ui: null
  },
  dashboard: {
    message: "Dưới đây là báo cáo tổng quan về hiệu suất kinh doanh tháng này.",
    ui: {
      type: 'col',
      props: { gap: 4 },
      children: [
        { type: 'text', props: { text: "Thống kê tháng 10/2025", className: "text-lg font-bold text-slate-800" } },
        {
          type: 'row',
          props: { gap: 3, className: "grid grid-cols-2" },
          children: [
            // Stat Card via Composition
            {
              type: 'card', props: { padding: 4, className: "bg-white shadow-sm border border-slate-100 rounded-xl" }, children: [
                { type: 'text', props: { text: "Doanh thu", className: "text-xs font-medium text-slate-500 mb-2" } },
                {
                  type: 'row', props: { className: "justify-between items-end" }, children: [
                    { type: 'price', props: { value: 125400000, currency: 'VND', className: "text-2xl font-bold text-slate-800" } },
                    { type: 'text', props: { text: "↑ 12%", className: "text-xs font-medium text-green-600" } }
                  ]
                }
              ]
            },
            {
              type: 'card', props: { padding: 4, className: "bg-white shadow-sm border border-slate-100 rounded-xl" }, children: [
                { type: 'text', props: { text: "Người dùng", className: "text-xs font-medium text-slate-500 mb-2" } },
                {
                  type: 'row', props: { className: "justify-between items-end" }, children: [
                    { type: 'text', props: { text: "3,402", className: "text-2xl font-bold text-slate-800" } },
                    { type: 'text', props: { text: "↑ 5%", className: "text-xs font-medium text-green-600" } }
                  ]
                }
              ]
            },
            {
              type: 'card', props: { padding: 4, className: "bg-white shadow-sm border border-slate-100 rounded-xl" }, children: [
                { type: 'text', props: { text: "Đơn hàng", className: "text-xs font-medium text-slate-500 mb-2" } },
                {
                  type: 'row', props: { className: "justify-between items-end" }, children: [
                    { type: 'text', props: { text: "856", className: "text-2xl font-bold text-slate-800" } },
                    { type: 'text', props: { text: "↓ 2%", className: "text-xs font-medium text-red-500" } }
                  ]
                }
              ]
            },
            {
              type: 'card', props: { padding: 4, className: "bg-white shadow-sm border border-slate-100 rounded-xl" }, children: [
                { type: 'text', props: { text: "Chuyển đổi", className: "text-xs font-medium text-slate-500 mb-2" } },
                {
                  type: 'row', props: { className: "justify-between items-end" }, children: [
                    { type: 'text', props: { text: "3.2%", className: "text-2xl font-bold text-slate-800" } },
                    { type: 'text', props: { text: "↑ 0.5%", className: "text-xs font-medium text-green-600" } }
                  ]
                }
              ]
            },
          ]
        },
        { type: 'divider' },
        {
          type: 'card',
          props: { title: "Top sản phẩm bán chạy" },
          children: [
            {
              type: 'col', props: { gap: 2 }, children: [
                {
                  type: 'row', props: { className: "justify-between" }, children: [
                    { type: 'text', props: { text: "Khóa học React Advanced" } },
                    { type: 'price', props: { value: 45000000 } }
                  ]
                },
                {
                  type: 'col', props: { gap: 1 }, children: [
                    {
                      type: 'row', props: { className: "justify-between text-xs text-slate-500" }, children: [
                        { type: 'text', props: { text: "Đã bán 150/200" } },
                        { type: 'text', props: { text: "75%" } }
                      ]
                    },
                    { type: 'progress', props: { value: 75, variant: 'primary', size: 'sm' } }
                  ]
                },
                { type: 'spacer', props: { size: 2 } },
                {
                  type: 'row', props: { className: "justify-between" }, children: [
                    { type: 'text', props: { text: "Ebook System Design" } },
                    { type: 'price', props: { value: 12000000 } }
                  ]
                },
                {
                  type: 'col', props: { gap: 1 }, children: [
                    {
                      type: 'row', props: { className: "justify-between text-xs text-slate-500" }, children: [
                        { type: 'text', props: { text: "Đã bán 300+" } },
                        { type: 'text', props: { text: "45%" } }
                      ]
                    },
                    { type: 'progress', props: { value: 45, variant: 'success', size: 'sm' } }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  campaign: {
    message: "Tôi đã chuẩn bị mẫu tạo chiến dịch Email Marketing. Vui lòng điền thông tin chi tiết.",
    ui: {
      type: 'card',
      props: { title: "Tạo chiến dịch mới", className: "bg-white" },
      children: [
        {
          type: 'col',
          props: { gap: 3 },
          children: [
            // Strict Standard Form Layout: <Form> <Grid container> <Grid item> ...

            {
              type: 'form',
              props: {
                className: "space-y-4",
                defaultValues: {
                  name: 'ChatKit Special Deal',
                  type: 'pro',
                  priority: 'normal'
                },
                bindings: {
                  values: { path: '/campaign/formData', default: {} }
                }
              },
              children: [
                {
                  type: 'grid',
                  props: { container: true, spacing: 2 },
                  children: [
                    // Name: 12 cols (full)
                    {
                      type: 'grid',
                      props: { size: 12 },
                      children: [
                        {
                          type: 'form_field',
                          props: { label: "Tên chiến dịch", required: true },
                          children: [
                            { type: 'input', props: { placeholder: "Ví dụ: Sale 11/11", name: "name" } }
                          ]
                        }
                      ]
                    },
                    // Subject: 12 cols (full)
                    {
                      type: 'grid',
                      props: { size: 12 },
                      children: [
                        {
                          type: 'form_field',
                          props: { label: "Tiêu đề Email", required: true },
                          children: [
                            { type: 'input', props: { placeholder: "Hot! Giảm giá 50% hôm nay" } }
                          ]
                        }
                      ]
                    },
                    // Type: 6 cols
                    {
                      type: 'grid',
                      props: { size: { xs: 12, sm: 6 } },
                      children: [
                        {
                          type: 'form_field',
                          props: { label: "Loại chiến dịch" },
                          children: [
                            { type: 'select', props: { placeholder: "Chọn loại", options: [{ label: "Khuyến mãi", value: "pro" }, { label: "Tin tức", value: "news" }], name: "type" } }
                          ]
                        }
                      ]
                    },
                    // Priority: 6 cols
                    {
                      type: 'grid',
                      props: { size: { xs: 12, sm: 6 } },
                      children: [
                        {
                          type: 'form_field',
                          props: { label: "Độ ưu tiên" },
                          children: [
                            { type: 'select', props: { placeholder: "Chọn mức", options: [{ label: "Cao", value: "high" }, { label: "Thường", value: "normal" }], name: "priority" } }
                          ]
                        }
                      ]
                    },
                    // Date: 6 cols
                    {
                      type: 'grid',
                      props: { size: { xs: 12, sm: 6 } },
                      children: [
                        {
                          type: 'form_field',
                          props: { label: "Ngày gửi", required: true },
                          children: [
                            { type: 'date_picker', props: { placeholder: "Chọn ngày", name: "date" } }
                          ]
                        }
                      ]
                    },
                    // Time: 6 cols
                    {
                      type: 'grid',
                      props: { size: { xs: 12, sm: 6 } },
                      children: [
                        {
                          type: 'form_field',
                          props: { label: "Giờ gửi", required: true },
                          children: [
                            { type: 'datetime_picker', props: { placeholder: "Chọn giờ", name: "time" } }
                          ]
                        }
                      ]
                    },
                    // Note: 12 cols
                    {
                      type: 'grid',
                      props: { size: 12 },
                      children: [
                        {
                          type: 'form_field',
                          props: { label: "Nội dung ghi chú" },
                          children: [
                            { type: 'textarea', props: { placeholder: "Ghi chú thêm cho đội marketing...", rows: 3 } }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },

            { type: 'divider' },

            { type: 'text', props: { text: "Đối tượng gửi", className: "text-sm font-medium text-slate-700" } },
            {
              type: 'row',
              props: { gap: 2 },
              children: [
                { type: 'chip', props: { label: "Khách VIP", active: true } },
                { type: 'chip', props: { label: "Đã mua hàng", active: false } },
                { type: 'chip', props: { label: "+ Thêm tag", className: "border-dashed" } },
              ]
            },

            { type: 'spacer', props: { size: 4 } },

            {
              type: 'row', props: { gap: 2, className: "mt-auto" }, children: [
                { type: 'button', props: { label: "Hủy", variant: "secondary", className: "flex-1" } },
                { type: 'button', props: { label: "Lên lịch gửi", variant: "primary", className: "flex-1" } }
              ]
            }
          ]
        }
      ]
    }
  },
  courses: {
    message: "Tìm thấy 3 khóa học phù hợp với yêu cầu của bạn.",
    ui: {
      type: 'col',
      props: { gap: 3 },
      children: [
        { type: 'text', props: { text: "Kết quả tìm kiếm", className: "font-semibold pl-1" } },
        {
          type: 'card',
          props: { padding: "none", className: "overflow-hidden" },
          children: [
            { type: 'box', props: { className: "h-32 w-full bg-slate-200 bg-cover bg-center", style: { backgroundImage: "url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800')" } } },
            {
              type: 'box', props: { padding: 3 }, children: [
                { type: 'badge', props: { text: "Bestseller", variant: "warning", className: "mb-2" } },
                { type: 'text', props: { text: "React & Next.js Pro", className: "font-bold text-base mb-1" } },
                { type: 'text', props: { text: "Làm chủ Modern Web với Server Components và AI integration.", className: "text-sm text-slate-500 mb-3" } },
                { type: 'rating', props: { value: 4.8, count: 120 } },
                { type: 'spacer', props: { size: 2 } },
                {
                  type: 'row', props: { className: "justify-between items-center" }, children: [
                    { type: 'price', props: { value: 1290000 } },
                    { type: 'button', props: { label: "Xem ngay", className: "text-xs px-3 py-1 bg-slate-900 text-white rounded" } }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'card',
          props: { padding: 3 },
          children: [
            {
              type: 'row', props: { gap: 3 }, children: [
                { type: 'avatar', props: { src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800", size: "lg", shape: "square", className: "rounded-lg" } },
                {
                  type: 'col', props: { className: "flex-1" }, children: [
                    { type: 'text', props: { text: "UI/UX Design Master", className: "font-bold" } },
                    { type: 'text', props: { text: "Figma to Code", className: "text-xs text-slate-500" } },
                    { type: 'spacer', props: { size: 1 } },
                    {
                      type: 'row', props: { className: "items-center gap-2" }, children: [
                        { type: 'badge', props: { text: "New", variant: "success" } },
                        { type: 'rating', props: { value: 5.0 } }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  invoice: {
    message: "Chi tiết hóa đơn #INV-2025-009.",
    ui: {
      type: 'card',
      props: { className: "bg-white" },
      children: [
        {
          type: 'row', props: { className: "justify-between items-center mb-4" }, children: [
            { type: 'text', props: { text: "INVOICE", className: "tracking-widest text-slate-400 font-bold" } },
            { type: 'badge', props: { text: "Pending", variant: "warning" } }
          ]
        },
        {
          type: 'col', props: { gap: 1, className: "mb-6" }, children: [
            { type: 'text', props: { text: "Tới: Công ty ABC", className: "font-bold" } },
            { type: 'text', props: { text: "Ngày: 05 Jan 2026", className: "text-sm text-slate-500" } },
          ]
        },
        {
          type: 'col', props: { gap: 2 }, children: [
            {
              type: 'row', props: { className: "justify-between text-sm py-2 border-b" }, children: [
                { type: 'text', props: { text: "Gói Enterprise (Năm)" } },
                { type: 'price', props: { value: 24000000 } }
              ]
            },
            {
              type: 'row', props: { className: "justify-between text-sm py-2 border-b" }, children: [
                { type: 'text', props: { text: "Setup Fee" } },
                { type: 'price', props: { value: 1000000 } }
              ]
            },
            {
              type: 'row', props: { className: "justify-between font-bold text-lg pt-2" }, children: [
                { type: 'text', props: { text: "Tổng cộng" } },
                { type: 'price', props: { value: 25000000, className: "text-blue-600" } }
              ]
            }
          ]
        },
        { type: 'spacer', props: { size: 4 } },
        { type: 'button', props: { label: "Thanh toán ngay", className: "w-full bg-slate-900 text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all" } }
      ]
    }
  }
}

// --- 3. Simulated Transport ---

class SimulatedTransport implements ChatTransport {
  private handlers?: ChatStreamHandlers

  async sendMessage(input: SendMessageInput): Promise<ChatResponse> {
    const text = input.text?.toLowerCase() || ''

    // Check for Update Commands FIRST
    if (text.includes("sửa tên") || text.includes("đổi tên") || text.includes("loại") || text.includes("ưu tiên") || text.includes("ngày") || text.includes("giờ")) {

      const delta: any[] = []
      let responseText = ""

      // 1. Name
      if (text.includes("sửa tên") || text.includes("đổi tên")) {
        const newName = "Black Friday Special Sale"
        delta.push({ op: 'add', path: '/campaign/formData/name', value: newName })
        responseText = `Đã cập nhật tên chiến dịch thành "${newName}".`
      }

      // 2. Type
      if (text.includes("loại") && text.includes("tin tức")) {
        delta.push({ op: 'add', path: '/campaign/formData/type', value: 'news' })
        responseText = `Đã chuyển loại chiến dịch sang "Tin tức".`
      } else if (text.includes("loại") && text.includes("khuyến mãi")) {
        delta.push({ op: 'add', path: '/campaign/formData/type', value: 'pro' })
        responseText = `Đã chuyển loại chiến dịch sang "Khuyến mãi".`
      }

      // 3. Priority
      if (text.includes("ưu tiên") && text.includes("cao")) {
        delta.push({ op: 'add', path: '/campaign/formData/priority', value: 'high' })
        responseText = `Đã set độ ưu tiên lên mức "Cao".`
      } else if (text.includes("ưu tiên") && text.includes("thường")) {
        delta.push({ op: 'add', path: '/campaign/formData/priority', value: 'normal' })
        responseText = `Đã set độ ưu tiên về mức "Thường".`
      }

      // 4. Date
      if (text.includes("ngày")) {
        const newDate = new Date(Date.now() + 86400000).toISOString() // Tomorrow
        delta.push({ op: 'add', path: '/campaign/formData/date', value: newDate })
        responseText = `Đã chọn ngày gửi là ngày mai.`
      }

      // 5. Time
      if (text.includes("giờ")) {
        const newTime = new Date().toISOString() // Current time acting as dummy
        delta.push({ op: 'add', path: '/campaign/formData/time', value: newTime })
        responseText = `Đã cập nhật giờ gửi.`
      }

      if (delta.length > 0) {
        setTimeout(() => {
          this.handlers?.onEvent?.({
            type: 'message.final',
            conversationId: 'demo',
            message: {
              id: Date.now().toString(),
              clientId: Date.now().toString(),
              senderId: 'assistant',
              conversationId: 'demo',
              direction: 'incoming',
              content: { type: 'text', text: responseText || "Đã cập nhật thông tin." },
              createdAt: new Date().toISOString()
            }
          })

          // Patch the State
          this.handlers?.onEvent?.({
            type: 'state.delta',
            conversationId: 'demo',
            delta: [
              { op: 'add', path: '/campaign', value: {} }, // ensure path exists
              { op: 'add', path: '/campaign/formData', value: {} },
              ...delta
            ]
          })
        }, 600)
        return { conversationId: 'demo', messages: [] }
      }
    }

    // Determine Scenario
    let scenarioKey = 'welcome'
    if (text.includes('chiến dịch') || text.includes('email')) scenarioKey = 'campaign'
    else if (text.includes('khóa học') || text.includes('sản phẩm')) scenarioKey = 'courses'
    else if (text.includes('báo cáo') || text.includes('doanh thu')) scenarioKey = 'dashboard'
    else if (text.includes('hóa đơn')) scenarioKey = 'invoice'
    else if (text === 'hello' || text === 'hi') scenarioKey = 'welcome'
    else {
      // Default fallback
      setTimeout(() => this.streamResponse("Tôi chưa hiểu ý bạn. Thử 'xem báo cáo' hoặc 'tạo chiến dịch' xem sao?", null), 500)
      return { conversationId: 'demo', messages: [] }
    }

    // Simulate thinking and streaming
    const scenario = JSON.parse(JSON.stringify(SCENARIOS[scenarioKey as keyof typeof SCENARIOS]))

    // Inject Bindings for Campaign Scenario
    if (scenarioKey === 'campaign') {
      // Bind the Form values to state path '/campaign/formData'
      const formNode = scenario.ui.children[0].children[0].children[0] // navigate to FormNode
      if (formNode.type === 'form') {
        formNode.props.bindings = {
          values: { path: '/campaign/formData', default: {} }
        }
      }
    }


    setTimeout(() => this.streamResponse(scenario.message, scenario.ui), 600)

    return { conversationId: 'demo', messages: [] }
  }

  async sendAction(_event: ChatKitActionEvent): Promise<ChatResponse> {
    // Simulate action response
    setTimeout(() => {
      this.handlers?.onEvent?.({
        type: 'message.final',
        conversationId: 'demo',
        message: {
          id: Date.now().toString(),
          clientId: Date.now().toString(),
          senderId: 'assistant',
          conversationId: 'demo',
          direction: 'incoming',
          content: { type: 'text', text: "Thao tác thành công! (Demo)" },
          createdAt: new Date().toISOString()
        }
      })
    }, 500)
    return { conversationId: 'demo', messages: [] }
  }

  subscribe(conversationId: string, handlers: ChatStreamHandlers): Unsubscribe {
    this.handlers = handlers
    return () => { this.handlers = undefined }
  }

  private async streamResponse(fullText: string, ui: any) {
    if (!this.handlers?.onEvent) return

    // 1. Typing
    this.handlers.onEvent({ type: 'typing', isTyping: true, conversationId: 'demo' })
    await new Promise(r => setTimeout(r, 800))
    this.handlers.onEvent({ type: 'typing', isTyping: false, conversationId: 'demo' })

    // 2. Stream Text
    const messageId = Date.now().toString()
    const chunks = fullText.split(' ')
    for (const chunk of chunks) {
      this.handlers.onEvent({
        type: 'message.delta',
        conversationId: 'demo',
        messageId,
        text: chunk + ' '
      })
      await new Promise(r => setTimeout(r, 50)) // Typing effect
    }

    // 3. Finalize Message
    this.handlers.onEvent({
      type: 'message.final',
      conversationId: 'demo',
      message: {
        id: messageId,
        clientId: messageId,
        conversationId: 'demo',
        senderId: 'assistant',
        direction: 'incoming',
        content: { type: 'markdown', markdown: fullText },
        createdAt: new Date().toISOString()
      }
    })

    // 4. Update UI (View Panel)
    if (ui) {
      this.handlers.onEvent({
        type: 'ui.patch',
        conversationId: 'demo',
        ui: { version: 1, nodes: [ui] }
      })
    }
  }
}

// --- 4. Story Definition ---

const meta: Meta<typeof ChatKitBoxChat> = {
  title: 'Organisms/ChatKit/InteractiveDemo',
  component: ChatKitBoxChat,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ChatKitBoxChat>

export const AgentSimulator: Story = {
  args: {
    transport: new SimulatedTransport(),
    mode: 'split',
    open: true,
    viewWidgetRegistry: fullRegistry, // Use the real system registry
    viewTitle: <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> <span>Agent View</span></div>,
    conversationId: 'demo',
    currentUserId: 'user1',
    agent: {
      name: 'Redon Assistant',
      logoUrl: 'https://ui-avatars.com/api/?name=Redon+AI&background=0D8ABC&color=fff',
      status: 'online'
    },
    initialMessages: [
      {
        id: 'welcome',
        clientId: 'welcome',
        conversationId: 'demo',
        senderId: 'assistant',
        direction: 'incoming',
        senderName: 'Assistant',
        content: { type: 'markdown', markdown: "👋 Chào bạn! Hãy thử nhập:\n- **\"Tôi muốn tạo chiến dịch email\"**\n- **\"Xem báo cáo doanh thu\"**\n- **\"Tìm khóa học React\"**\n- **\"Xem hóa đơn thanh toán\"**" },
        createdAt: new Date().toISOString()
      }
    ],
    initialWidgets: [], // Start empty
    initialState: { campaign: { formData: {} } },
  },
  render: (args) => {
    return (
      <div className="h-screen w-full bg-slate-50 p-4">
        <div className="mx-auto h-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <ChatKitBoxChat {...args} />
        </div>
      </div>
    )
  }
}
