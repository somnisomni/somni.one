import { ts } from "@somni/eslint-config";
import svelte from "eslint-plugin-svelte";
import globals from "globals";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...ts,
  ...svelte.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: [ "*.svelte", "**/*.svelte" ],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    ignores: [ "build/", ".svelte-kit/", "dist/" ],
  },
];
