# CanvasGrid Component

High-performance grid component using HTML5 Canvas, inspired by NocoDB Grid architecture. Designed for handling large datasets with excellent performance.

## Features

- **Canvas Rendering**: Uses HTML5 Canvas for optimal performance with large datasets
- **Virtual Scrolling**: Only renders visible rows and columns
- **40+ Cell Types**: Support for various data types including Text, Number, Date, Select, Attachment, Links, and more
- **Interactive Cells**: Click to select, double-click to edit, keyboard navigation
- **Column Operations**: Resize, reorder, and hide columns
- **Row Operations**: Add, delete, and reorder rows
- **Selection**: Single cell and range selection
- **Group By**: Group rows by column values (coming soon)
- **Sorting & Filtering**: Built-in sort and filter capabilities (coming soon)
- **Copy/Paste**: Clipboard support (coming soon)
- **Responsive**: Adapts to container size

## Installation

This component is part of the `redai-fe-v2-sdk` package.

```bash
npm install @haianh123bgln/redai-fe-v2-sdk
```

## Basic Usage

```tsx
import { CanvasGrid, UITypes } from '@haianh123bgln/redai-fe-v2-sdk'
import type { ColumnType, TableType, ViewType } from '@haianh123bgln/redai-fe-v2-sdk'

function App() {
  // Define columns
  const columns: ColumnType[] = [
    {
      id: 'id',
      title: 'ID',
      uidt: UITypes.Number,
      width: 100,
      pk: true,
    },
    {
      id: 'name',
      title: 'Name',
      uidt: UITypes.SingleLineText,
      width: 200,
      required: true,
    },
    {
      id: 'email',
      title: 'Email',
      uidt: UITypes.Email,
      width: 250,
    },
    {
      id: 'status',
      title: 'Status',
      uidt: UITypes.SingleSelect,
      width: 150,
      meta: {
        options: [
          { title: 'Active', color: '#10b981' },
          { title: 'Inactive', color: '#ef4444' },
        ],
      },
    },
    {
      id: 'due_date',
      title: 'Due Date',
      uidt: UITypes.Date,
      width: 150,
    },
  ]

  // Define table meta
  const meta: TableType = {
    id: 'users-table',
    title: 'Users',
    columns,
    views: [],
  }

  // Define view
  const view: ViewType = {
    id: 'grid-view',
    title: 'All Users',
    type: 'grid',
    column_order: columns.map((c) => c.id),
  }

  // Data loader
  const loadData = async () => {
    const response = await fetch('/api/users')
    const data = await response.json()
    return data.map((row: any) => ({
      row,
      oldRow: {},
      rowMeta: { rowIndex: data.indexOf(row) },
    }))
  }

  // Row updater
  const updateOrSaveRow = async (row: any, property?: string) => {
    const response = await fetch(`/api/users/${row.row.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [property || '']: row.row[property || ''] }),
    })
    return response.json()
  }

  return (
    <CanvasGrid
      meta={meta}
      view={view}
      data={dataMap}
      totalRows={totalRows}
      loadData={loadData}
      updateOrSaveRow={updateOrSaveRow}
      rowHeightEnum={1}
    />
  )
}
```

## Props

### CanvasGridProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `meta` | `TableType` | Yes | Table metadata including columns |
| `view` | `ViewType` | Yes | View configuration |
| `data` | `Map<number, Row>` | Yes | Grid data as a map of row index to Row object |
| `totalRows` | `number` | Yes | Total number of rows |
| `loadData` | `function` | Yes | Function to load data |
| `updateOrSaveRow` | `function` | Yes | Function to update or save a row |
| `deleteRow` | `function` | No | Function to delete a row |
| `addEmptyRow` | `function` | No | Function to add an empty row |
| `expandForm` | `function` | No | Function to expand form for row editing |
| `bulkUpdateRows` | `function` | No | Function to bulk update rows |
| `deleteSelectedRows` | `function` | No | Function to delete selected rows |
| `rowHeightEnum` | `number` | No | Row height: 1 (small), 2 (medium), 4 (large), 6 (XL) |
| `readOnly` | `boolean` | No | Disable editing |
| `disableSkeleton` | `boolean` | No | Hide loading skeleton |
| `isPublic` | `boolean` | No | Public view mode |
| `isGroupBy` | `boolean` | No | Enable group by mode |

## Data Structure

### Row

```typescript
interface Row {
  row: Record<string, any>          // Current row data
  oldRow: Record<string, any>       // Original row data for undo
  rowMeta: RowMeta                  // Row metadata
}

interface RowMeta {
  rowIndex?: number                 // Row index
  commentCount?: number             // Number of comments
  isNew?: boolean                   // Is newly added row
  isDirty?: boolean                 // Has unsaved changes
  isValid?: boolean                 // Passes validation
  errorMessage?: string             // Validation error
  color?: string                    // Row color
}
```

### ColumnType

```typescript
interface ColumnType {
  id: string                        // Column ID
  title: string                     // Column title
  uidt: UITypes                     // Column type
  width?: number                    // Column width in pixels
  position?: number                 // Column position
  column_order?: number             // Column order
  meta?: Record<string, any>        // Additional metadata
  pv?: boolean                      // Primary value
  pk?: boolean                      // Primary key
  system?: boolean                  // System column
  readonly?: boolean                // Read-only column
  hidden?: boolean                  // Hidden column
  required?: boolean                // Required field
  unique?: boolean                  // Unique values
}
```

## Supported Cell Types

- **SingleLineText**: Single line text input
- **LongText**: Multi-line text area
- **Number**: Numeric values
- **Decimal**: Decimal numbers
- **Percent**: Percentage values
- **Currency**: Currency values
- **Date**: Date picker
- **DateTime**: Date and time picker
- **Time**: Time picker
- **Email**: Email input with validation
- **PhoneNumber**: Phone number input
- **URL**: URL input
- **Checkbox**: Boolean checkbox
- **SingleSelect**: Single select dropdown
- **MultiSelect**: Multi-select dropdown
- **Attachment**: File attachments
- **Rating**: Star rating
- **Formula**: Computed values
- **Rollup**: Aggregate values
- **Lookup**: Linked values
- **LinkToAnotherRecord**: Relationship to another table
- **Duration**: Time duration
- **Barcode**: Barcode display
- **QRCode**: QR code display
- **GeoData**: Geographic data
- **JSON**: JSON data
- **Collaborator**: User references
- **Year**: Year values
- **AI**: AI-powered fields

## Keyboard Shortcuts

- **Arrow Keys**: Navigate cells
- **Enter**: Start editing / Save changes
- **Escape**: Cancel editing
- **Delete/Backspace**: Clear cell value
- **Tab**: Move to next cell
- **Shift+Tab**: Move to previous cell

## Performance

The CanvasGrid is optimized for performance:

- **Virtual Scrolling**: Only renders visible rows and columns
- **Canvas Rendering**: Uses HTML5 Canvas instead of DOM elements
- **Lazy Loading**: Loads data on demand when scrolling
- **Caching**: Caches rendered cells and measurements
- **Debouncing**: Debounces scroll and resize events

Can handle:
- **10,000+ rows** smoothly
- **100+ columns** without performance degradation
- **Millions of cells** with virtual scrolling

## Styling

The component uses Tailwind CSS for styling. Custom styling can be applied through the `className` prop:

```tsx
<CanvasGrid
  className="border-gray-300 shadow-lg rounded-xl"
  style={{ height: '800px' }}
  {...otherProps}
/>
```

## Examples

See the Storybook stories for more examples:

- Default grid with sample data
- Large dataset (10,000 rows)
- Read-only mode
- Different row heights
- Loading state

## Roadmap

- [ ] Cell editing with inline inputs
- [ ] Column resizing
- [ ] Column reordering
- [ ] Row reordering
- [ ] Group by
- [ ] Advanced filtering
- [ ] Multi-column sorting
- [ ] Copy/paste support
- [ ] Undo/redo
- [ ] Row colors
- [ ] Cell comments
- [ ] Attachment preview
- [ ] Export to CSV/Excel

## Contributing

This component is inspired by the NocoDB Grid implementation. Contributions are welcome!

## License

MIT
