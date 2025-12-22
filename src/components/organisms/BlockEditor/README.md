# BlockEditor - Trình Editor Hiện Đại với Khả Năng Select Block

BlockEditor là một trình editor HTML hiện đại được thiết kế cho SDK, cho phép người dùng chỉnh sửa nội dung HTML với khả năng select và manipulate các block elements một cách trực quan.

## Tính Năng Chính

- ✅ **Block Selection**: Click để chọn bất kỳ element HTML nào
- ✅ **Visual Feedback**: Highlight blocks khi hover và select
- ✅ **Floating Toolbar**: Toolbar động xuất hiện khi chọn block
- ✅ **Rich Formatting**: Hỗ trợ bold, italic, underline, màu sắc, alignment
- ✅ **Block Manipulation**: Copy, delete, duplicate blocks
- ✅ **Undo/Redo**: Lịch sử chỉnh sửa với khả năng hoàn tác
- ✅ **Responsive Design**: Tối ưu cho mobile và desktop
- ✅ **TypeScript Support**: Fully typed với TypeScript

## Cài Đặt

```bash
# Import component
import { BlockEditor } from '@/components/organisms/BlockEditor'
import '@/components/organisms/BlockEditor/styles.css'
```

## Sử Dụng Cơ Bản

```tsx
import React, { useState } from 'react'
import { BlockEditor } from '@/components/organisms/BlockEditor'

function MyEditor() {
  const [content, setContent] = useState(`
    <div>
      <h1>Tiêu đề chính</h1>
      <p>Đây là một đoạn văn bản mẫu.</p>
      <img src="https://example.com/image.jpg" alt="Hình ảnh mẫu" />
      <button>Nút bấm</button>
    </div>
  `)

  return (
    <BlockEditor
      initialContent={content}
      onContentChange={setContent}
      mode="edit"
      selectionMode="normal"
      className="h-96 border rounded-lg"
    />
  )
}
```

## Props

### BlockEditorProps

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `initialContent` | `string` | `''` | Nội dung HTML ban đầu |
| `onContentChange` | `(content: string) => void` | - | Callback khi nội dung thay đổi |
| `className` | `string` | - | CSS class cho container |
| `mode` | `'edit' \| 'preview' \| 'code'` | `'edit'` | Chế độ hiển thị |
| `selectionMode` | `'normal' \| 'block-select'` | `'normal'` | Chế độ selection |
| `onBlockSelect` | `(block: SelectedBlock \| null) => void` | - | Callback khi chọn block |
| `onBlockEdit` | `(blockId: string, content: string) => void` | - | Callback khi chỉnh sửa block |

## Ref Methods

```tsx
const editorRef = useRef<BlockEditorRef>(null)

// Lấy nội dung hiện tại
const content = editorRef.current?.getContent()

// Set nội dung mới
editorRef.current?.setContent('<h1>Nội dung mới</h1>')

// Lấy block đang được chọn
const selectedBlock = editorRef.current?.getSelectedBlock()

// Bỏ chọn block
editorRef.current?.deselectBlock()

// Undo/Redo
editorRef.current?.undo()
editorRef.current?.redo()

// Focus vào editor
editorRef.current?.focus()
```

## Các Chế Độ Hoạt Động

### 1. Edit Mode (Mặc định)
- Cho phép chỉnh sửa trực tiếp nội dung
- Hiển thị toolbar khi chọn block
- Hỗ trợ drag & drop (sẽ được thêm trong tương lai)

### 2. Preview Mode
- Chỉ hiển thị nội dung, không cho phép chỉnh sửa
- Phù hợp để xem trước kết quả

### 3. Block Select Mode
- Tối ưu cho việc chọn block để tích hợp với chat/AI
- Highlight rõ ràng các block có thể chọn

## Customization

### Custom Toolbar Actions

```tsx
const customActions: BlockToolbarAction[] = [
  {
    id: 'custom-action',
    label: 'Hành động tùy chỉnh',
    icon: 'star',
    command: 'customCommand'
  }
]

<BlockEditor
  // ... other props
  onToolbarAction={(command, value) => {
    if (command === 'customCommand') {
      // Xử lý hành động tùy chỉnh
    }
  }}
/>
```

### Custom Styles

```css
/* Override default styles */
.block-editor {
  --block-editor-selected-bg: rgba(34, 197, 94, 0.1);
  --block-editor-selected-border: #22c55e;
}

.block-editor-element[data-block-type="heading"] {
  border-left: 4px solid #3b82f6;
  padding-left: 12px;
}
```

## Supported Block Types

- `text` - Văn bản thường
- `heading` - Tiêu đề (h1-h6)
- `paragraph` - Đoạn văn
- `image` - Hình ảnh
- `button` - Nút bấm
- `link` - Liên kết
- `list` - Danh sách
- `table` - Bảng
- `div` - Container
- `section` - Section
- `article` - Article

## Events

### onBlockSelect
Được gọi khi người dùng chọn một block:

```tsx
const handleBlockSelect = (block: SelectedBlock | null) => {
  if (block) {
    console.log('Selected block:', block.element.tagName, block.element.content)
  } else {
    console.log('No block selected')
  }
}
```

### onContentChange
Được gọi mỗi khi nội dung HTML thay đổi:

```tsx
const handleContentChange = (newContent: string) => {
  // Lưu vào database, localStorage, etc.
  saveContent(newContent)
}
```

## Keyboard Shortcuts

- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Y` / `Cmd+Y` - Redo
- `Ctrl+C` / `Cmd+C` - Copy selected block
- `Delete` - Delete selected block
- `Escape` - Deselect current block

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Troubleshooting

### Toolbar không hiển thị
- Đảm bảo đã import CSS file
- Kiểm tra z-index của container cha

### Block selection không hoạt động
- Đảm bảo HTML content có các data attributes cần thiết
- Kiểm tra mode và selectionMode props

### Performance issues với HTML lớn
- Sử dụng debouncing cho onContentChange
- Cân nhắc pagination hoặc lazy loading

## Roadmap

- [ ] Drag & drop để sắp xếp lại blocks
- [ ] Plugin system cho custom block types
- [ ] Collaborative editing
- [ ] Mobile touch gestures
- [ ] Accessibility improvements
- [ ] Performance optimizations
