import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

const baseUrl = "/Project2";

// https://vitejs.dev/config/
export default defineConfig({
  base: baseUrl,
  plugins: [
    vue(),
    VitePWA({
      includeAssets: [`${baseUrl}/**`],
      manifest: {
        name: "TicTacToe",
        short_name: "TicTacToe",
        description: "TicTacToe App",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        icons: [
          {
            src: `${baseUrl}/icons/android-chrome-192x192.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `${baseUrl}/icons/android-chrome-512x512.png`,
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: `${baseUrl}/icons/mstile-310x310.png`,
            sizes: "310x310",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      registerType: "autoUpdate",
      injectRegister: "script",
    }),
  ],
});
