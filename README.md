# Redai Frontend SDK Template

## Overview
This is a comprehensive React TypeScript SDK template designed for building modern, flat-design component libraries. It features a built-in ActionBus for telemetry/events, strict TypeScript typings, and a utility-first styling approach using Tailwind CSS.

## Features
- **Architecture:** Library mode (Vite), ESM/CJS output.
- **Core:** In-memory `ActionBus` with middleware support (PII filtering, Audit logging).
- **Styling:** Tailwind CSS with CSS Variables for theming (Dark/Light mode ready).
- **Design:** Flat design, soft rounded corners, no borders/shadows.
- **Components:** 40+ Production-ready components across all categories.
- **Quality:** ESLint, Prettier, Vitest, Storybook.

## Installation

```bash
npm install
# or
pnpm install
```

## Commands

- `pnpm dev`: Start dev server (if applicable)
- `pnpm build`: Build the library for distribution (dist/)
- `pnpm storybook`: Launch Storybook documentation
- `pnpm test`: Run unit tests (Vitest)
- `pnpm lint`: Lint code
- `pnpm format`: Format code

## Usage

### Theming
Import the base styles in your app's entry point:
```tsx
import 'redai-fe-v2-sdk/dist/style.css'
```

To switch themes, toggle the `.theme-dark` class on the `html` or `body` tag.

### Component Usage
```tsx
import { Button, Input, useDispatchAction } from 'redai-fe-v2-sdk'

const MyForm = () => {
  const dispatch = useDispatchAction()
  
  return (
    <div>
      <Input placeholder="Enter data..." />
      <Button onClick={() => console.log('Clicked')}>Submit</Button>
    </div>
  )
}
```

### Telemetry / ActionBus
Events are automatically dispatched by interactive components. You can also subscribe globally:

```tsx
import { actionBus } from 'redai-fe-v2-sdk'

actionBus.subscribeAll((event) => {
  console.log('Telemetry Event:', event)
})
```

## Publishing
1. Update version in `package.json`
2. Run `pnpm build`
3. Run `npm publish`

## Component Catalog

### Data Entry
- **Button** - Primary, Secondary, Ghost, Danger variants with loading states
- **Input** - Text input with error states and validation
- **Textarea** - Multi-line text input with resize options
- **Checkbox** - Custom styled checkbox with label support
- **Radio** - Radio button with label
- **RadioGroup** - Group of radio buttons with orientation control
- **Select** - Dropdown select with custom options
- **DatePicker** - Native date picker with custom styling

### Form
- **Form** - Context provider with validation and ActionBus integration
- **FormField** - Wrapper component with label and error display

### Layout
- **Box, Row, Col** - Flexbox primitives
- **Grid** - Responsive grid system (1-12 columns)
- **Stack** - Flexible stack layout (horizontal/vertical)
- **Container** - Max-width container with responsive padding
- **Spacer, Divider** - Visual separators
- **DashboardLayout** - Complete dashboard layout with sidebar and header

### Typography
- **Heading (H1-H6)** - Heading hierarchy with size variants
- **Text, Title, Caption, Label** - Text primitives
- **Typography** - Polymorphic text component
- **Code** - Inline and block code display

### Display
- **Badge** - Status badges with variants (success, error, warning, info)
- **Image** - Image with fallback support and aspect ratios
- **Icon** - SVG icon wrapper with size variants
- **Spinner** - Loading spinner with size and color variants

### Feedback
- **Modal** - Dialog/modal with backdrop and sizes
- **Toast** - Notification toast with auto-dismiss
- **Tooltip** - Hover tooltip with positioning

### Navigation
- **Tabs** - Tab navigation with content panels
- **Breadcrumb** - Breadcrumb navigation
- **Pagination** - Page navigation with ellipsis

## Project Structure
- `src/bus`: ActionBus logic
- `src/components`: UI Components (Atoms, Molecules, Organisms)
- `src/middleware`: Event middleware (PII, Logger)
- `src/styles`: Design tokens and CSS
