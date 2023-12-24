import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    // proxy: {
    //   "/api": "localhost:8080/api",
    // },
    host: true,
    port: 8000,
    watch: {
      usePolling: true,
    },
  },
});
