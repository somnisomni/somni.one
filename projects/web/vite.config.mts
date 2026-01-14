import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: source => `
          @use "$/styles/utils.scss" as *;
          ${source}
          @reference "$/styles/app.css";
        `,
      },
    },
  },
});
