// Importando configurador de vite
import { defineConfig } from 'vite'
// Importando un admin de rutas
import { resolve } from 'node:path'
// Importando tailwindcss
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    // Directorio raíz de los archivos fuente del front-end
    root: 'src',
    // Agregando a vite el pluging de tailwindcss
    plugins: [tailwindcss()], 
    // Configurando un servidor de desarrollo 
    server: {
        port: 5173,
        // Rigidez del puerto
        strict: true
    },

    // Configurando el build
    build: {
        // Directorio de salida del JavaScript para producción
        outDir: "../dist",
        // Asegurando limpieza del folder de producción
        emptyOutDir: true,
        // Generando manifiesto para el servidor 
        manifest: true,
        // Opciones de empaquetado
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.js')
            }
            // Configuraciones adicionales de Rollup si es necesario
        }
    },
    // Configuración para el desarrollo
    publicDir: false
})