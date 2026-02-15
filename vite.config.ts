import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Listen on all addresses (0.0.0.0)
    port: 8080,
    allowedHosts: ["supplementally-nonrelieving-anette.ngrok-free.dev"],
    watch: {
      usePolling: true, // CRITICAL: Forces Docker to see Windows file changes
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));