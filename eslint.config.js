import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1) Ignora los build de front
  {
    ignores: [
      "dist/**", // Ignora carpeta de dist
      "node_modules/**"
    ]
  },
  // 2) Condig del Back-end
  { 
    files: ["server/**/*.{js,mjs}"],
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
        } 
      } ,
      rules:{ /* se implementaron dos nuevas reglas
        "semi": ["error", "always"]
        "quotes": ["error", "double"]
        */
        //Si declaras una variable función o parámetro y no se utiliza hara que eslint lo marque como un error
        "no-unused-vars": ["error", {"argsIgnorePattern":"^_"}],
        /*Hara que si te falta algun ; se marque como error y al momento de guardar se pondra de manera automatica
        asi arreglando el bendito error siempre y cuando sea obligatorio que termine con un ; */
        "semi": ["error", "always"],
        /*si se usa '' comillas simples en vez de "" comillas normales en las cadenas de texto (string)
          las marque como error y las corriga a "" comillas simples al momento de guardar */
        "quotes": ["error", "double"]
      }
    },
  // 2.1) Config de Vite
  { 
    files: ["vite.config.js"],
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
        } 
      } 
    },
  // 3) Condig del front-end
  { 
    files: ["src/**/*.{js,mjs}"],
    plugins: { js }, 
    extends: ["js/recommended"], 
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
    extends: ["js/recommended"], 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
        } 
      } 
    },
]);