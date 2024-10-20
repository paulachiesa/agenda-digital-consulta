import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: { '/WebMethods.aspx': {
      target: 'http://localhost:50694',
      changeOrigin: true
    }}
  },
  base: './',
  plugins: [react()],
});
