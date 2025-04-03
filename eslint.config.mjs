import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import next from "@next/eslint-plugin-next";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

// https://nextjs.org/docs/app/api-reference/config/eslint
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config(
    {
      extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    },
    {
      ignores: ["**/.next/**", "**/node_modules/**", "*.log", "**/dist/**"],
    },
    {
      plugins: {
        import: importPlugin,
        "@next/next": next,
        prettier: prettierPlugin,
      },
      rules: {
        "react-hooks/rules-of-hooks": "warn",
        "react-hooks/exhaustive-deps": "warn",
        "import/no-extraneous-dependencies": "error",
        "@next/next/no-assign-module-variable": "error",
        "prettier/prettier": "warn",
      },
    },
    prettierConfig,
  ),
];

export default eslintConfig;
