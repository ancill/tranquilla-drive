import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   registerType: "prompt",
    //   includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
    //   manifest: {
    //     name: "Tranquilla Drive",
    //     short_name: "TranqueDrive",
    //     description: "Flashcards for your tranquilla journey",
    //     theme_color: "#ffffff",
    //     display: "standalone",
    //     orientation: "portrait",
    //     icons: [
    //       {
    //         src: "pwa-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
