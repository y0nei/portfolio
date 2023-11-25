import { defineConfig } from "vite";

export default defineConfig({
    root: "./",
    build: {
        target: "esnext",
        minify: true,
        sourcemap: false,
        lib: {
            entry: "main.ts",
            formats: ["es"]
        },
        rollupOptions: {
            output: {
                entryFileNames: "[name].min.js",
                chunkFileNames: "[name]-[hash].min.js"
            }
        }
    }
});
