import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import stylistic from "@stylistic/eslint-plugin";

export default [
  // js.configs.recommended,
  // js.configs.browser,
  // js.configs.node,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: true,
        tsconfigRootDir: process.cwd()
      }
    },

    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "@stylistic": stylistic,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {

      // TypeScript
      "@typescript-eslint/no-unused-vars": "warn",

      // React / Hooks
      "react/jsx-uses-react": "off", // dla React 17+
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Stylistic
      "@stylistic/semi": ["error", "always"],
      "@stylistic/indent": ["error", 2]
    }
  }
];
