import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
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
      "@types": "/src/types",
      "@hooks": "/src/hooks",
    },
  },
  server: {
    watch: {
      ignored: ["**/db.json"],
    },
    allowedHosts: ["2b4e-113-190-252-111.ngrok-free.app"],
  },
});
