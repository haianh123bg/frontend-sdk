# Theme system

## Mục tiêu

- Dùng chung SDK cho nhiều dự án.
- Hỗ trợ nhiều theme (multi-brand) + nhiều chế độ hiển thị (light/dark/system).
- Triển khai theo hướng hiện đại: semantic tokens qua CSS variables + Tailwind.

## Khái niệm

- `ThemeMode`: `light | dark | system`
- `ThemeDefinition`: định nghĩa 1 theme bằng cách override CSS variables theo mode.
- `ThemeProvider`: áp dụng theme lên `documentElement` hoặc `body`.
- `ThemeModeSwitch`: UI switch để đổi mode (kèm nút System).

## Quick start

```tsx
import { ThemeProvider, themePresets, ThemeModeSwitch } from 'YOUR_SDK'

export function AppRoot() {
  return (
    <ThemeProvider themes={themePresets} defaultThemeName="default" defaultMode="system">
      <ThemeModeSwitch label="Dark" />
      <App />
    </ThemeProvider>
  )
}
```

## Đăng ký theme runtime (Theme registry)

Registry phù hợp khi dự án muốn load theme từ cấu hình (remote/local) rồi đăng ký trước khi render.

```ts
import { registerTheme, listRegisteredThemes } from 'YOUR_SDK'

registerTheme({
  name: 'brandA',
  vars: {
    light: {
      '--color-primary-500': '#ff0066',
      '--color-primary-foreground': '#ffffff',
    },
    dark: {
      '--color-primary-500': '#ff4d8d',
      '--color-primary-foreground': '#1a0b12',
    },
  },
})

const themes = listRegisteredThemes()
```

Sau đó:

```tsx
import { ThemeProvider, listRegisteredThemes } from 'YOUR_SDK'

<ThemeProvider themes={listRegisteredThemes()} defaultThemeName="default" />
```

## JSON schema (dành cho validate)

SDK export JSON schema để bạn dùng Ajv hoặc validator khác:

- `themeDefinitionJsonSchema`
- `themeStateJsonSchema`

Nếu không dùng Ajv, có helper:

- `isThemeDefinition()`
- `isThemeState()`
