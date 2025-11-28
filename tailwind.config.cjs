/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '.theme-dark'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Use CSS variables for theming
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        primary: {
          DEFAULT: 'var(--color-primary-500)',
          foreground: 'var(--color-primary-foreground)',
          ...Array.from({ length: 9 }, (_, i) => i + 1).reduce(
            (acc, i) => ({
              ...acc,
              [`${i}00`]: `var(--color-primary-${i}00)`,
            }),
            {}
          ),
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        border: 'transparent', // Explicitly removing borders by default logic
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        // Removing standard shadows, adding only glow/soft effects if needed
        none: 'none',
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
