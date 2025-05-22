import { ts } from "@somni/eslint-config";
import globals from "globals";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...ts,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: [ "build/", "dist/" ],
  },
];
