import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate", // Actualización automática en segundo plano
      includeAssets: ["favicon.ico", "logo.png", "icons/*.png"],

      manifest: {
        name: "Temges App",
        short_name: "Temges",
        description: "Sistema ERP para gestión de manufactura",
        theme_color: "#3f51b5", // Color azul del logo
        background_color: "#ffffff",
        display: "standalone",
        orientation: "natural",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        // Estrategia de caché optimizada para ERP
        runtimeCaching: [
          {
            // API calls - Network First (priorizar servidor)
            urlPattern: /^https:\/\/api\..*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 hora
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            // Assets estáticos - Cache First
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
            },
          },
          {
            // Fuentes y CSS externos
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "cdn-cache",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
            },
          },
        ],

        // Limpiar cachés antiguas
        cleanupOutdatedCaches: true,

        // Tamaño máximo de precache (ajustado para app grande)
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
      },

      devOptions: {
        enabled: false, // Deshabilitado en desarrollo (usar preview para probar)
      },
    }),
  ],
  server: {
    port: 8100,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
