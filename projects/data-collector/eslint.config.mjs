import { ts } from "@somni/eslint-config";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...ts,
  {
    ignores: [ "node_modules/", "build/", "dist/", ".wrangler/" ],
  },
];
