import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@theme": "/src/theme",
      "@pages": "/src/pages",
      "@layouts": "/src/layouts",
      "@app": "/src/app",
      "@router": "/src/router",
      "@services": "/src/services",
      "@config": "/src/config",
    },
  },
});
