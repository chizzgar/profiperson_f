import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base =
    mode === "development"
      ? "/"
      : env.VITE_BASE_URL ?? (process.env.VERCEL ? "/" : "/profiperson_f/");

  return {
    plugins: [react()],
    base,
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
  };
});
