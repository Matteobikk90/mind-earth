import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import { dirname, join } from "path";
import { default as tseslint } from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compatFrontend = new FlatCompat({
  baseDirectory: join(__dirname, "frontend"),
});

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/coverage/**",
    ],
  },

  {
    files: ["frontend/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {},
    },
    plugins: {
      "typescript-eslint": tseslint,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin,
      "react-refresh": reactRefreshPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react-refresh/only-export-components": "off",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  ...compatFrontend.extends("next/core-web-vitals", "next/typescript").map((cfg) => ({
    ...cfg,
    files: ["frontend/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      ...(cfg.plugins ?? {}),
      "@next/next": pluginNext,
    },
    rules: {
      ...(cfg.rules ?? {}),
      "@next/next/no-html-link-for-pages": "off",
    },
  })),
];
