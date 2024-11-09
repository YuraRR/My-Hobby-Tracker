// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      store: path.resolve(__dirname, "src/redux/app/store"),
    },
  },
});
