import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve('C:\\Users\\pgs_2\\Sphero\\src', "src"),
    },
  },
});
