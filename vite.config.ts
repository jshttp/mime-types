import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "@whykhamist/mime-types",
      fileName: "index",
    },

    rollupOptions: {
      external: ["mime-db"],
      output: {
        exports: "named",
        globals: {
          "mime-db": "mimeDb",
        },
      },
    },
    emptyOutDir: true,
  },
});
