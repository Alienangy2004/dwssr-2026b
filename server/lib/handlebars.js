import path from'node:path';
import { fileURLToPath } from 'node:url';
import { create as createHbsEngine} from 'express-handlebars';

import { registerViteHelper } from './vite.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// esportar la funcion de configuracipo 
export default function configureHandlebars(app){
  // establecioendo la extencion de los archivos donde las vistas  .hbs
  // estableciendo el layout princiapl en el main
const exphbs= createHbsEngine({
  estname: ".hbs",
  defaultLayout: "main",
  // Configura las reglas de comportamiento interno del motor de plantillas durante la ejecución
  runtimeOptions: {
    /* Permite a la plantilla leer propiedades que un objeto no posee directamente, 
    sino que heredó de su prototipo base?. En Express, los objetos de error heredan 
    la propiedad status de la clase nativa Error */
    allowProtoPropertiesByDefault: true,
    // Autoriza que la vista ejecute funciones o métodos heredados bajo la misma lógica
    allowProtoMethodsByDefault: true,
  },
});

// registrando el helper de vite
registerViteHelper(exphbs.handlebars);

// registrando handelbars en la app de espress
// registo de engine y su nombre
app.engine('hbs',exphbs.engine);
//
app.set("view engine", 'hbs')
// 3. estableciendo el directorio de vistas
app.set("views", path.join(__dirname, "..", "views"));
}