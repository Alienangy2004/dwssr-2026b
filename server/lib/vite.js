import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Helper para Handler que genera las etiquetas de vite
 * en desarrollo: conecta al servidor de desarrollo de vite
 * en produccion: usa los compilados de vite
 */
export function viteAssets() {
    // Obtener modo de ejecucion
    const isDev = process.env.NODE_ENV !== 'production';
    // Rescatando la URL del servidor de desarrollo
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

    // si estamos en modo de desarrollo
    if (isDev) {
        // en desarrollo cargamos los archivos del front end directamente del servidor de vite
        return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `;
    }

    // en produccion leemos el manifest y generamos las etiquetas finales de produccion
    const manifestPath = path.join(__dirname, '..', '..', 'dist', 'manifest.json');
    
    // si no existe el manifest
    if (!fs.existsSync(manifestPath)) {
        console.warn("Vite manifest not found. Run 'npm run build'");
        return '';
    }

    // Leyendo y parseando a JSON el archivo de manifiesto
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    const mainEntry = manifest['main.js'];

    // Guardia del main.js (Si NO existe, lanzamos advertencia)
    if (!mainEntry) {
        console.warn('Archivo main.js no está disponible en el manifest de Vite');
        return '';
    }

    let tags = '';
    
    if (mainEntry.css) {
        mainEntry.css.forEach(cssfile => {
            tags += `<link rel="stylesheet" href="/${cssfile}">\n`;
        });
    }
    
    tags += `<script type="module" src="/${mainEntry.file}defer"></script>`;
    return tags;
}
//funcion registradora del helper
export function registerViteHelper(hbs){
  hbs.register('viteAssets', ()=>{
    //sanitizando la salida del helper
    return new hbs.SafeString(viteAssets())
  })
}
