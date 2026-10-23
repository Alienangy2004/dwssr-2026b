// flujo de archivos
import fs from 'node:fs';
// biblioteca de rutas
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// creando variables de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Helper para handlebars que genera las etiquetas de vite
 * En desarrollo: conecta al servidor de desarrollo de vite
 * En produccion: usa los compilados de vite
 */
export function viteAssets() {
  // obtener modo de ejecucion
  const isDev = process.env.NODE_ENV !== 'production';
  // rescatando la url del servidor de desarrollo
  const viteDevServer = process.env.VITE_SERVER || 'https://glorious-spork-7v9xxwjgp4543xjp6-5173.app.github.dev';
  
  if (isDev) {
    // en desarrollo cargamos los archivos del frontend directamente del servidor de desarrollo de vite
    return `
      <script type="module" src="${viteDevServer}/@vite/client"></script>
      <script type="module" src="${viteDevServer}/main.js"></script>
    `;
  }
  
  // en produccion leemos el manifest
  // y generamos las etiquetas finales de produccion
  const manifestPath = path.join(__dirname, '..', '..', 'dist', '.vite', 'manifest.json');

  // si no existe el manifiesto
  if (!fs.existsSync(manifestPath)) {
    // eslint-disable-next-line no-console
    console.warn('Vite Manifest not found. Run npm run build');
    return '';
  }
  
  // leyendo y parseando a json el archivo
  // de manifiesto que genera vite en la compilacion
  // de los archivos del front-end
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  // obteniendo la ruta del punto de entrada del front-end
  const mainEntry = manifest['main.js'];
  
  // guarda del main.js
  if (!mainEntry) {
    // eslint-disable-next-line no-console
    console.warn('el archivo main.js no esta disponible en el manifiesto de vite');
    return '';
  }
  let tags = '';

  // css files
  if (mainEntry.css) {
    mainEntry.css.forEach((cssFiles) => {
      tags += `<link rel="stylesheet" href="/${cssFiles}">\n`;
    });
  }

  // js files
  tags += `<script type="module" src="/${mainEntry.file}" defer></script>`;

  return tags;
}

/**
 * Funcion registradora del helper de handlebars
 *
 */
export function registerViteHelper(hbs) {
  hbs.registerHelper(
    'viteAssets',
    () =>
      // sanitizando la salida del helper
      new hbs.SafeString(viteAssets())
  );
}