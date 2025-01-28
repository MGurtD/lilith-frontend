import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import env from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), env()],
  server: {
    port: 8100,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
