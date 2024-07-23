import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ["@babel/plugin-transform-runtime"],
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: ["@babel/runtime/regenerator"],
    },
  },
});
