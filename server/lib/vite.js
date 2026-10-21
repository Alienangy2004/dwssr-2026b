//flujo de archivos
import fs from "node:fs";
//viblioteca de rutas
import path from "node:path";
import { fileURLToPath } from "node:url";
// eslint-disable-next-line
import {dirname} from 'node:path';

//creando variables de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Helper para handlebars que genera las etiquetas de vite
 * En desarrooll: conecta al servidor de sewsaroollo de cite
 * En producion: usa los compilados de vite
 */
export function viteAssets(){
    //obtener modo de ejecucion
    const isDev = process.env.NODE_ENV !== "production";
// rescatando la url del servidor de desarooloo
    const viteDevServer = process.env.VITE_SERVER || "https://glorious-spork-7v9xxwjgp4543xjp6-5173.app.github.dev";
    if(isDev){
        //el desarollo cargamos los archivos del frontend directamente del servidor de desarrollo de vite
        return `
        
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `;
    }
    //en producion leemos el manifest 
    // //y generamos las etiquetas finales de produccion
    const manifestPath = path.join(__dirname, "..", "..", "dist", ".vite", "manifest.json");

    //si no existe el manifiesto
    if (!fs.existsSync(manifestPath)) {
        console.warn("Vite Manifest not found. Run npm run build");
        return"";
    }
    //lellendon y parcendo a json el archivo
    //de manifiesto que genera vite an la compilacion
    //de los archivos del front-end
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    //obteniendo la ruta del punto dde entrada del front-end
    const mainEntry = manifest["main.js"];
    //guarda del main.js
    if(!mainEntry){
        console.warn("el archivo main.js no esta disponible enn el manifiesto de vite");
        return "";
    }
    let tags = "";
    
    //css files
    if(mainEntry.css){
        mainEntry.css.forEach((cssFiles) => {
            tags += `<link rel="stylesheet" href="/${cssFiles}">\n`;
        });
    }

    //js files
    tags += `<script type="module" src="/${mainEntry.file}"defer></script>`;

    return tags;
}
/**
 * Funcion registradora del hemper de handlebars
 * 
 */
export function registerViteHelper(hbs) {
    hbs.registerHelper("viteAssets", ()=>{
    //sanitizando la salida de helper
        return new hbs.SafeString(viteAssets());
    });
}