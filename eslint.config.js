import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
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
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  stylistic.configs["recommended-flat"],
  {
    rules: {
      "@stylistic/indent": ["error", 2, {
        SwitchCase: 1,
        VariableDeclarator: "first",
        FunctionDeclaration: { parameters: "first" },
        FunctionExpression: { parameters: "first" },
        CallExpression: { arguments: "first" },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ignoredNodes: [
          "FunctionExpression > .params[decorators.length > 0]",
          "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
          "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
        ],
      }],
      "@stylistic/keyword-spacing": ["error", {
        before: true,
        after: true,
        overrides: {
          if: { after: false },
          for: { after: false },
          while: { after: false },
          switch: { after: false },
          with: { after: false },
          catch: { after: false },
        },
      }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/member-delimiter-style": ["error", {
        multiline: { delimiter: "semi", requireLast: true },
        singleline: { delimiter: "semi", requireLast: true },
      }],
    },
  },
  {
    ignores: ["build/", ".svelte-kit/", "dist/", "node_modules/"],
  },
];
