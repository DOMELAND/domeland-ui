import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/web3": {
        // target: "http://gw.321.io:19253",
        target: "http://localhost:8082",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/web3/, ""),
      },
    },
  },
});
