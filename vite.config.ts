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
      external: ['react', 'react-dom', 'tailwindcss'],
      input: entries,
      output: [
        {
          format: 'es',
          entryFileNames: ({ name }) => `${name}.js`,
          chunkFileNames: 'chunks/[name]-[hash].js',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            tailwindcss: 'tailwindcss',
          },
        },
        {
          format: 'cjs',
          entryFileNames: ({ name }) => `${name}.cjs`,
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
