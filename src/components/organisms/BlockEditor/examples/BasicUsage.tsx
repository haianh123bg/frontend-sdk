import React, { useState, useRef } from 'react'
import { BlockEditor, type BlockEditorRef, type SelectedBlock } from '../index'
import '../styles.css'

export const BasicUsageExample: React.FC = () => {
  const [content, setContent] = useState(`
    <div>
      <h1 style="color: #1f2937; margin-bottom: 16px;">Tiêu Đề Chính</h1>
      <p style="color: #4b5563; line-height: 1.6; margin-bottom: 12px;">
        Đây là một đoạn văn bản mẫu để demonstratekhả năng chỉnh sửa của BlockEditor. 
        Bạn có thể click vào bất kỳ element nào để chọn và chỉnh sửa.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop" 
        alt="Hình ảnh mẫu" 
        style="width: 100%; max-width: 400px; height: 200px; object-fit: cover; border-radius: 8px; margin: 16px 0;"
      />
      <button style="background-color: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
        Nút Hành Động
      </button>
      <ul style="margin-top: 16px; padding-left: 20px;">
        <li style="margin-bottom: 8px;">Mục danh sách thứ nhất</li>
        <li style="margin-bottom: 8px;">Mục danh sách thứ hai</li>
        <li style="margin-bottom: 8px;">Mục danh sách thứ ba</li>
      </ul>
    </div>
  `)

  const [selectedBlock, setSelectedBlock] = useState<SelectedBlock | null>(null)
  const editorRef = useRef<BlockEditorRef>(null)

  const handleBlockSelect = (block: SelectedBlock | null) => {
    setSelectedBlock(block)
    console.log('Block selected:', block?.element.tagName, block?.element.content)
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    console.log('Content changed:', newContent.length, 'characters')
  }

  const handleUndo = () => {
    editorRef.current?.undo()
  }

  const handleRedo = () => {
    editorRef.current?.redo()
  }

  const handleClearContent = () => {
    editorRef.current?.setContent('<div><p>Nội dung mới</p></div>')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">BlockEditor - Basic Usage</h2>
          <p className="text-sm text-gray-600 mt-1">
            Click vào bất kỳ element nào để chọn và chỉnh sửa. Sử dụng toolbar để format.
          </p>
        </div>

        <div className="p-4">
          {/* Controls */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleUndo}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
            >
              ↶ Undo
            </button>
            <button
              onClick={handleRedo}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
            >
              ↷ Redo
            </button>
            <button
              onClick={handleClearContent}
              className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded border border-red-200"
            >
              🗑 Clear
            </button>
          </div>

          {/* Editor */}
          <div className="border rounded-lg overflow-hidden">
            <BlockEditor
              ref={editorRef}
              initialContent={content}
              onContentChange={handleContentChange}
              onBlockSelect={handleBlockSelect}
              mode="edit"
              selectionMode="normal"
              className="h-96"
            />
          </div>

          {/* Selected Block Info */}
          {selectedBlock && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <h3 className="font-medium text-blue-900">Selected Block:</h3>
              <div className="text-sm text-blue-700 mt-1">
                <div><strong>Tag:</strong> {selectedBlock.element.tagName}</div>
                <div><strong>Type:</strong> {selectedBlock.element.type}</div>
                <div><strong>Content Length:</strong> {selectedBlock.element.content.length} chars</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HTML Output */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-medium text-gray-900">HTML Output</h3>
        </div>
        <div className="p-4">
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
            <code>{content}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default BasicUsageExample
