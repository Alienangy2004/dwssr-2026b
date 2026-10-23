/* eslint-disable import/no-extraneous-dependencies */
import js from "@eslint/js";
import globals from "globals";

export default [
  // 1) Ignora los build de front
  {
    ignores: [
      "dist/**", // Ignora carpeta de dist
      "node_modules/**"
    ]
  },
  // 2) Config del Back-end
  { 
    files: ["server/**/*.{js,mjs}"],
    plugins: { js }, 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      } 
    },
    rules: { 
      ...js.configs.recommended.rules,
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "semi": ["error", "always"],
      "quotes": ["error", "double"]
    }
  },
  // 2.1) Config de Vite
  { 
    files: ["vite.config.js"],
    plugins: { js }, 
    rules: { ...js.configs.recommended.rules }, 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      } 
    } 
  },
  // 3) Config del front-end
  { 
    files: ["src/**/*.{js,mjs}"],
    plugins: { js }, 
    rules: { ...js.configs.recommended.rules }, 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      } 
    } 
  },
  // 4) Opcional si hay js en public
  { 
    files: ["public/**/*.{js,mjs}"],
    plugins: { js }, 
    rules: { ...js.configs.recommended.rules }, 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      } 
    } 
  }
];