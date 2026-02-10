import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: '/profiperson_f/',
  server: {
    proxy: {
      "/api": {
        target: "https://profiperson.onrender.com",
        changeOrigin: true,
        secure: true
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
