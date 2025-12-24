// vite.config.ts
import { defineConfig } from "file:///F:/Redon/sdk/redai-fe-v2-sdk/node_modules/vite/dist/node/index.js";
import react from "file:///F:/Redon/sdk/redai-fe-v2-sdk/node_modules/@vitejs/plugin-react/dist/index.js";
import dts from "file:///F:/Redon/sdk/redai-fe-v2-sdk/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///F:/Redon/sdk/redai-fe-v2-sdk/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var entries = {
  index: path.resolve(__dirname, "src/index.ts"),
  core: path.resolve(__dirname, "src/core/index.ts"),
  forms: path.resolve(__dirname, "src/forms/index.ts"),
  layout: path.resolve(__dirname, "src/layout/index.ts"),
  typography: path.resolve(__dirname, "src/typography/index.ts"),
  feedback: path.resolve(__dirname, "src/feedback/index.ts"),
  navigation: path.resolve(__dirname, "src/navigation/index.ts"),
  display: path.resolve(__dirname, "src/display/index.ts"),
  animation: path.resolve(__dirname, "src/animation/index.ts")
};
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      entryRoot: path.resolve(__dirname, "src"),
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/**/*.stories.tsx"]
    })
  ],
  build: {
    lib: {
      entry: entries,
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss", "framer-motion"],
      input: entries,
      output: [
        {
          format: "es",
          entryFileNames: ({ name }) => name === "index" ? "index.js" : `${name}/index.js`,
          chunkFileNames: "chunks/[name]-[hash].js",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            tailwindcss: "tailwindcss"
          }
        },
        {
          format: "cjs",
          entryFileNames: ({ name }) => name === "index" ? "index.cjs" : `${name}/index.cjs`,
          chunkFileNames: "chunks/[name]-[hash].cjs",
          exports: "named",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            tailwindcss: "tailwindcss"
          }
        }
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxSZWRvblxcXFxzZGtcXFxccmVkYWktZmUtdjItc2RrXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxSZWRvblxcXFxzZGtcXFxccmVkYWktZmUtdjItc2RrXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9SZWRvbi9zZGsvcmVkYWktZmUtdjItc2RrL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCdcclxuXHJcbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybClcclxuY29uc3QgX19kaXJuYW1lID0gcGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpXHJcblxyXG5jb25zdCBlbnRyaWVzID0ge1xyXG4gIGluZGV4OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXHJcbiAgY29yZTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb3JlL2luZGV4LnRzJyksXHJcbiAgZm9ybXM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvZm9ybXMvaW5kZXgudHMnKSxcclxuICBsYXlvdXQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvbGF5b3V0L2luZGV4LnRzJyksXHJcbiAgdHlwb2dyYXBoeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy90eXBvZ3JhcGh5L2luZGV4LnRzJyksXHJcbiAgZmVlZGJhY2s6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvZmVlZGJhY2svaW5kZXgudHMnKSxcclxuICBuYXZpZ2F0aW9uOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL25hdmlnYXRpb24vaW5kZXgudHMnKSxcclxuICBkaXNwbGF5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Rpc3BsYXkvaW5kZXgudHMnKSxcclxuICBhbmltYXRpb246IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYW5pbWF0aW9uL2luZGV4LnRzJyksXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIGR0cyh7XHJcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXHJcbiAgICAgIGVudHJ5Um9vdDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICBpbmNsdWRlOiBbJ3NyYy8qKi8qLnRzJywgJ3NyYy8qKi8qLnRzeCddLFxyXG4gICAgICBleGNsdWRlOiBbJ3NyYy8qKi8qLnRlc3QudHMnLCAnc3JjLyoqLyoudGVzdC50c3gnLCAnc3JjLyoqLyouc3Rvcmllcy50c3gnXSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogZW50cmllcyxcclxuICAgICAgZm9ybWF0czogWydlcycsICdjanMnXSxcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICd0YWlsd2luZGNzcycsICdmcmFtZXItbW90aW9uJ10sXHJcbiAgICAgIGlucHV0OiBlbnRyaWVzLFxyXG4gICAgICBvdXRwdXQ6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmb3JtYXQ6ICdlcycsXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogKHsgbmFtZSB9KSA9PiAobmFtZSA9PT0gJ2luZGV4JyA/ICdpbmRleC5qcycgOiBgJHtuYW1lfS9pbmRleC5qc2ApLFxyXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdjaHVua3MvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxyXG4gICAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcclxuICAgICAgICAgICAgdGFpbHdpbmRjc3M6ICd0YWlsd2luZGNzcycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZm9ybWF0OiAnY2pzJyxcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAoeyBuYW1lIH0pID0+IChuYW1lID09PSAnaW5kZXgnID8gJ2luZGV4LmNqcycgOiBgJHtuYW1lfS9pbmRleC5janNgKSxcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnY2h1bmtzL1tuYW1lXS1baGFzaF0uY2pzJyxcclxuICAgICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXHJcbiAgICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxyXG4gICAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcclxuICAgICAgICAgICAgdGFpbHdpbmRjc3M6ICd0YWlsd2luZGNzcycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFEsU0FBUyxvQkFBb0I7QUFDM1MsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFKeUksSUFBTSwyQ0FBMkM7QUFNeE4sSUFBTSxhQUFhLGNBQWMsd0NBQWU7QUFDaEQsSUFBTSxZQUFZLEtBQUssUUFBUSxVQUFVO0FBRXpDLElBQU0sVUFBVTtBQUFBLEVBQ2QsT0FBTyxLQUFLLFFBQVEsV0FBVyxjQUFjO0FBQUEsRUFDN0MsTUFBTSxLQUFLLFFBQVEsV0FBVyxtQkFBbUI7QUFBQSxFQUNqRCxPQUFPLEtBQUssUUFBUSxXQUFXLG9CQUFvQjtBQUFBLEVBQ25ELFFBQVEsS0FBSyxRQUFRLFdBQVcscUJBQXFCO0FBQUEsRUFDckQsWUFBWSxLQUFLLFFBQVEsV0FBVyx5QkFBeUI7QUFBQSxFQUM3RCxVQUFVLEtBQUssUUFBUSxXQUFXLHVCQUF1QjtBQUFBLEVBQ3pELFlBQVksS0FBSyxRQUFRLFdBQVcseUJBQXlCO0FBQUEsRUFDN0QsU0FBUyxLQUFLLFFBQVEsV0FBVyxzQkFBc0I7QUFBQSxFQUN2RCxXQUFXLEtBQUssUUFBUSxXQUFXLHdCQUF3QjtBQUM3RDtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVcsS0FBSyxRQUFRLFdBQVcsS0FBSztBQUFBLE1BQ3hDLFNBQVMsQ0FBQyxlQUFlLGNBQWM7QUFBQSxNQUN2QyxTQUFTLENBQUMsb0JBQW9CLHFCQUFxQixzQkFBc0I7QUFBQSxJQUMzRSxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyxhQUFhLGVBQWUsZUFBZTtBQUFBLE1BQy9ELE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxRQUNOO0FBQUEsVUFDRSxRQUFRO0FBQUEsVUFDUixnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssTUFBTyxTQUFTLFVBQVUsYUFBYSxHQUFHLElBQUk7QUFBQSxVQUN0RSxnQkFBZ0I7QUFBQSxVQUNoQixTQUFTO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxhQUFhO0FBQUEsWUFDYixhQUFhO0FBQUEsVUFDZjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxRQUFRO0FBQUEsVUFDUixnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssTUFBTyxTQUFTLFVBQVUsY0FBYyxHQUFHLElBQUk7QUFBQSxVQUN2RSxnQkFBZ0I7QUFBQSxVQUNoQixTQUFTO0FBQUEsVUFDVCxTQUFTO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxhQUFhO0FBQUEsWUFDYixhQUFhO0FBQUEsVUFDZjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
