/// <reference types="vitest" />
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), !process.env.VITEST && reactRouter(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    setupFiles: "./test/setup.ts",
    environment: "jsdom",
    include: ["app/**/*.{test,spec}.{ts,tsx}"],
  },
});
