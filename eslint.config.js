import js from "@eslint/js";
import globals from "globals";

export default [
  // Carga las reglas recomendadas por defecto para todos los archivos
  js.configs.recommended,

  // Ignora los build y módulos
  {
    ignores: [
      "dist/**", // Ignora carpeta dist
      "node_modules/**"
    ]
  },

  // Config del back-end
  { 
    files: ["server/**/*.{js,mjs}"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      } 
    } 
  },

  // Config del front-end
  { 
    files: ["src/**/*.{js,mjs}"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      } 
    } 
  },

  // Config vite
  { 
    files: ["vite.config.js"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      } 
    } 
  },

  // Opcional si hay js en public
  { 
    files: ["public/**/*.{js,mjs}"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      } 
    } 
  }
];