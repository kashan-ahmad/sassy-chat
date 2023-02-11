import path from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      // Alias to import all of the modules through.
      // Example: "~/assets/some-asset"
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
