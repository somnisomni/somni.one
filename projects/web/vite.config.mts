import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    paraglideVitePlugin({
      project: "./i18n/inlang",
      outdir: "./src/lib/i18n",
      strategy: [ "localStorage", "preferredLanguage", "baseLocale", ],
      isServer: "import.meta.env.SSR",
      localStorageKey: "somni.language",
      outputStructure: "locale-modules",
    }),
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
