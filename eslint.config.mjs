// eslint.config.js (root)
import { FlatCompat } from "@eslint/eslintrc";
import pluginNext from "@next/eslint-plugin-next";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { dirname, join } from "path";
import tseslint from "typescript-eslint";
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
      prettier: eslintPluginPrettier,
      "@typescript-eslint": tseslint.plugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": pluginNext,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  ...compatFrontend
    .extends("next/core-web-vitals", "next/typescript")
    .map((cfg) => ({
      ...cfg,
      files: ["frontend/**/*.{js,jsx,ts,tsx}"],
      plugins: {
        ...(cfg.plugins ?? {}),
        "@next/next": pluginNext,
        "@typescript-eslint": tseslint.plugin,
        react: reactPlugin,
        "react-hooks": reactHooksPlugin,
        prettier: eslintPluginPrettier,
      },
      rules: {
        ...(cfg.rules ?? {}),
        "@next/next/no-html-link-for-pages": "off",
      },
    })),
];
