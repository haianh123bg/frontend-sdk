import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const entries = {
  index: path.resolve(__dirname, 'src/index.ts'),
  core: path.resolve(__dirname, 'src/core/index.ts'),
  forms: path.resolve(__dirname, 'src/forms/index.ts'),
  layout: path.resolve(__dirname, 'src/layout/index.ts'),
  typography: path.resolve(__dirname, 'src/typography/index.ts'),
  feedback: path.resolve(__dirname, 'src/feedback/index.ts'),
  navigation: path.resolve(__dirname, 'src/navigation/index.ts'),
  display: path.resolve(__dirname, 'src/display/index.ts'),
  animation: path.resolve(__dirname, 'src/animation/index.ts'),
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      entryRoot: path.resolve(__dirname, 'src'),
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.stories.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: entries,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: (id) => {
        const baseExternals = ['react', 'react-dom', 'tailwindcss', 'framer-motion']
        if (baseExternals.includes(id)) return true

        if (id.startsWith('@fullcalendar/') && !id.endsWith('.css')) return true
        if (id === 'date-fns' || id.startsWith('date-fns/')) return true

        return false
      },
      input: entries,
      output: [
        {
          format: 'es',
          entryFileNames: ({ name }) => (name === 'index' ? 'index.js' : `${name}/index.js`),
          chunkFileNames: 'chunks/[name]-[hash].js',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            tailwindcss: 'tailwindcss',
          },
        },
        {
          format: 'cjs',
          entryFileNames: ({ name }) => (name === 'index' ? 'index.cjs' : `${name}/index.cjs`),
          chunkFileNames: 'chunks/[name]-[hash].cjs',
          exports: 'named',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            tailwindcss: 'tailwindcss',
          },
        },
      ],
    },
  },
})
