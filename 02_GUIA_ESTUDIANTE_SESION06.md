# Guía del Estudiante — Sesión 08
## Fetch API: Consumir datos desde un archivo JSON

**Competencia:** 220501096 — Construcción de Software  
**Ficha:** 3229944 ADSO — Garzón, Huila  
**Duración:** 4 horas  
**Proyecto:** TechStore Pro

---

## Objetivos de aprendizaje

1. Entender por qué `fetch()` es asíncrono y qué significa eso
2. Usar `async/await` para leer un archivo JSON
3. Migrar los productos de TechStore Pro de un array hardcodeado a `data/productos.json`
4. Manejar errores con `try/catch` — mostrar mensaje visible si el fetch falla

---

## Conceptos clave

### El problema actual

Los 6 productos viven hardcodeados en `main.js`:

```javascript
const productos = [
  { id: 1, nombre: "MacBook Pro M3", ... },
  ...
];
```

Esto funciona, pero tiene un problema: **cada vez que quieras agregar o editar un producto, tienes que modificar el JavaScript**. En el mundo real los datos viven separados del código — en archivos JSON que cualquier persona puede editar sin tocar el código.

### ¿Qué es fetch()?

`fetch()` es la función del navegador para pedir datos a un servidor — o a un archivo local. Es **asíncrona**: no congela la página mientras espera la respuesta.

```
Sin fetch:  JS carga → productos ya están en el array → se muestran
Con fetch:  JS carga → header/footer aparecen → fetch pide datos → productos aparecen
```

### async / await

Cuando una operación tarda (como leer un archivo), usamos `async/await` para esperar el resultado sin congelar la página:

```javascript
// Con async/await — fácil de leer
async function cargarProductos() {
  const respuesta = await fetch('data/productos.json'); // esperar respuesta
  const datos     = await respuesta.json();             // esperar conversión a array
  console.log(datos); // array de productos listo para usar
}
```

### ⚠️ Live Server obligatorio

`fetch()` no funciona con `file://` (doble clic al archivo). Siempre abre el proyecto con el botón **"Go Live"** de VS Code.

---

## Ejercicio 1: Tu primer fetch desde la consola (20 min)

Antes de tocar el proyecto, practica en la consola con una API pública gratuita.

### Paso 1 — Fetch básico

Con TechStore Pro abierto en Live Server, abre DevTools → pestaña **Console**.

Pega este código y presiona **Enter**:

```javascript
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(function(r) { return r.json(); })
  .then(function(datos) { console.log(datos); });
```

En la consola verás esto (es normal):

```
Promise {<pending>}
{id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', ...}
```

**¿Qué significa cada línea?**

- **`Promise {<pending>}`** — aparece inmediatamente al presionar Enter. Significa "la petición salió, aún no llegó la respuesta". La promesa está en estado *pendiente*. Es normal y esperado.
- **`{id: 1, name: 'Leanne Graham', ...}`** — llega medio segundo después. Es la respuesta del servidor convertida a objeto JavaScript. Ahí están los datos reales.

**¿De dónde salen esos datos?**

`jsonplaceholder.typicode.com` es una API pública y gratuita para practicar. Tiene usuarios, posts y comentarios inventados. Tu navegador envió una petición HTTP real a ese servidor y él respondió con el usuario 1 en formato JSON — exactamente lo mismo que va a pasar con `data/productos.json` en tu proyecto, solo que los datos vivirán en tu propio archivo.

### Paso 2 — Con async/await

Ahora escribe lo mismo pero con la sintaxis moderna. Pega esto en la consola y presiona **Enter**:

```javascript
async function probar() {
  const respuesta = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const datos = await respuesta.json();
  console.log('Nombre:', datos.name);
  console.log('Email:', datos.email);
}
probar();
```

En la consola verás:

```
Promise {<pending>}
Nombre: Leanne Graham
Email: Sincere@april.biz
```

**¿Qué cambió respecto al Paso 1?**

- Ya no hay `.then()` encadenados — el código se lee de arriba a abajo como si fuera síncrono.
- `await` pausa la función en esa línea hasta que llega la respuesta, sin bloquear el resto de la página.
- Puedes acceder a propiedades directamente: `datos.name`, `datos.email`, `datos.address`, etc.
- Esta es la forma que usarás en el proyecto con `cargarProductos()`.

### Paso 3 — Lista de posts (varios registros a la vez)

Ahora pide varios registros a la vez y recorre el array con `forEach`. Pega esto en la consola:

```javascript
async function verPosts() {
  const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await respuesta.json();
  console.log('Total de posts:', posts.length);
  posts.slice(0, 3).forEach(function(post) {
    console.log('Título:', post.title);
  });
}
verPosts();
```

En la consola verás:

```
Total de posts: 100
Título: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
Título: qui est esse
Título: ea molestiae et quasi iste unde qui adipisci
```

**¿Por qué es importante este ejemplo?**

- `posts` es un **array de 100 objetos** — igual que `productos` va a ser un array de objetos en tu proyecto.
- `.slice(0, 3)` toma solo los primeros 3 para no llenar la consola.
- `.forEach()` recorre el array y accede a cada propiedad — exactamente lo que hace `crearTarjeta()` con cada producto.

### Caso de prueba

- Ves un objeto con datos en la consola ✓
- `datos.name` muestra un nombre ✓
- `posts.length` muestra 100 ✓
- Los 3 títulos aparecen en consola ✓
- No hay errores rojos ✓

---

## Ejercicio 2: Migrar productos a JSON (70 min)

### Lo que vas a construir

Los productos salen de `main.js` y van a `data/productos.json`. La función `cargarProductos()` los carga con `fetch()`. Todo lo demás — modal, carrito, buscador — sigue igual.

### Paso 1 — Crear `data/productos.json`

En la carpeta raíz del proyecto crea la carpeta `data/` y dentro el archivo `productos.json`:

```
plantilla_proyecto/
├── data/
│   └── productos.json   ← nuevo
├── css/
├── js/
├── index.html
└── ...
```

Contenido de `data/productos.json`:

```json
[
  {
    "id": 1,
    "icono": "💻",
    "nombre": "MacBook Pro M3",
    "descripcion": "Chip M3, 16 GB RAM, 512 GB SSD, pantalla Liquid Retina.",
    "precio": "$8.999.000",
    "imagen": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop&q=80"
  },
  {
    "id": 2,
    "icono": "📱",
    "nombre": "iPhone 15 Pro",
    "descripcion": "Chip A17 Pro, titanio, Dynamic Island, cámara 48 MP.",
    "precio": "$4.299.000",
    "imagen": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=250&fit=crop&q=80"
  },
  {
    "id": 3,
    "icono": "🎮",
    "nombre": "RTX 4070 Super",
    "descripcion": "12 GB GDDR6X, DLSS 3, Ray Tracing. Gaming 4K fluido.",
    "precio": "$2.399.000",
    "imagen": "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=250&fit=crop&q=80"
  },
  {
    "id": 4,
    "icono": "💼",
    "nombre": "Dell XPS 15",
    "descripcion": "Intel i7 13va gen, 32 GB RAM, pantalla OLED 4K.",
    "precio": "$6.799.000",
    "imagen": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop&q=80"
  },
  {
    "id": 5,
    "icono": "📲",
    "nombre": "Samsung Galaxy S24",
    "descripcion": "Snapdragon 8 Gen 3, IA Galaxy, cámara 200 MP.",
    "precio": "$3.199.000",
    "imagen": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop&q=80"
  },
  {
    "id": 6,
    "icono": "🖥️",
    "nombre": "Monitor LG UltraWide 34\"",
    "descripcion": "Panel IPS curvo, 3440×1440, 144 Hz, HDR10.",
    "precio": "$1.899.000",
    "imagen": "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=400&h=250&fit=crop&q=80"
  }
]
```

> **Diferencias JS → JSON:**
> - Las claves llevan comillas dobles: `"nombre"` no `nombre`
> - No hay `const`, no hay `;`, no hay comentarios
> - Sin coma después del último objeto `}`

### Paso 2 — Eliminar el array de `main.js`

Abre `js/main.js`. **Elimina** el bloque completo `const productos = [...]` (los 6 productos, desde la línea `const productos = [` hasta el `];` de cierre).

### Paso 3 — Reemplazar el bloque del grid por `cargarProductos()`

Usa **Ctrl + F** en VS Code y busca `gridTarjetas`. Verás este bloque:

```javascript
const gridTarjetas = document.querySelector('#grid-tarjetas');
if (gridTarjetas) {
  gridTarjetas.innerHTML = productos.map(crearTarjeta).join('');
}
```

**Selecciona esas 4 líneas completas y reemplázalas por esto:**

```javascript
// ================================================
// S08: CARGAR PRODUCTOS DESDE JSON
// Reemplaza el array hardcodeado de S03.
// Funciona en: productos.html (donde existe #grid-tarjetas)
// Requiere: data/productos.json con el array de productos
// ================================================

async function cargarProductos() {
  const grid = document.querySelector('#grid-tarjetas');
  if (!grid) return; // solo correr en páginas que tienen el grid

  try {
    // PASO 1 — Pedir el archivo JSON al servidor
    // await pausa aquí hasta que llegue la respuesta (el sobre)
    const respuesta = await fetch('data/productos.json');

    // PASO 2 — Leer el contenido del JSON como array JavaScript
    // .json() también es asíncrono → necesita su propio await
    const productos = await respuesta.json();

    // PASO 3 — Renderizar las tarjetas en el grid
    // productos.map(crearTarjeta) convierte cada objeto en HTML
    grid.innerHTML = productos.map(crearTarjeta).join('');

    // PASO 4 — Reconectar todo lo que depende de las tarjetas
    // Estas funciones buscan .tarjeta en el HTML → deben ir DESPUÉS del innerHTML
    registrarBotonesModal(); // botones "Ver más" → abrir modal
    registrarBadgeHover();   // badge "✓ Disponible" al hacer hover
    registrarBuscador();     // filtro de búsqueda en tiempo real

  } catch (error) {
    // Si fetch falla: muestra mensaje visible en la página
    grid.innerHTML = `
      <div class="error-fetch">
        <p>⚠️ No se pudieron cargar los productos.</p>
        <button onclick="cargarProductos()" class="btn btn-primario">Reintentar</button>
      </div>
    `;
    console.error('Error al cargar productos:', error);
  }
}

cargarProductos(); // ejecutar al cargar la página
```

### Paso 4 — Reconectar todo lo que depende de las tarjetas

Cuando `cargarProductos()` crea las tarjetas con `fetch()`, cualquier código que busque `.tarjeta` en el HTML y se haya ejecutado antes ya encontró 0 tarjetas. Eso rompe el modal, el badge hover y el buscador.

La solución: convertir ese código en funciones y llamarlas desde `cargarProductos()` **después de** `grid.innerHTML`.

**Parte A — Reestructurar el bloque `if (modal)`**

Usa **Ctrl + F** y busca `const modal`. Selecciona todo desde esa línea hasta el `}` de cierre y reemplázalo por esto:

```javascript
const modal = document.querySelector('#modal-producto');

if (modal) {
  const btnCerrar = document.querySelector('#modal-cerrar');

  // Llena el modal con los datos del producto y lo hace visible
  // tarjeta.dataset lee los atributos data-* del <article class="tarjeta">
  function abrirModal(tarjeta) {
    document.querySelector('#modal-icono').textContent  = tarjeta.dataset.icono  || '📦';
    document.querySelector('#modal-titulo').textContent = tarjeta.dataset.nombre || 'Producto';
    document.querySelector('#modal-desc').textContent   = tarjeta.dataset.desc   || '';
    document.querySelector('#modal-precio').textContent = tarjeta.dataset.precio || '';
    modal.classList.add('visible');
  }

  // Se llama desde cargarProductos() DESPUÉS de grid.innerHTML
  // porque los botones .btn-accion los crea crearTarjeta() dinámicamente
  function registrarBotonesModal() {
    document.querySelectorAll('.btn-accion').forEach(function(boton) {
      boton.addEventListener('click', function() {
        abrirModal(boton.closest('.tarjeta'));
      });
    });
  }

  // Cerrar con el botón ×
  btnCerrar.addEventListener('click', function() {
    modal.classList.remove('visible');
  });

  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', function(e) {
    if (e.target === modal) modal.classList.remove('visible');
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') modal.classList.remove('visible');
  });
}
```

**Parte B — Convertir badge hover y buscador en funciones**

Busca con **Ctrl + F** el texto `EJERCICIO 3 · BADGE HOVER`. Reemplaza el bloque del badge y el buscador por estas dos funciones:

```javascript
// Muestra el badge "✓ Disponible" al pasar el mouse por una tarjeta
// Se llama desde cargarProductos() — las tarjetas deben existir primero
function registrarBadgeHover() {
  document.querySelectorAll('.tarjeta').forEach(function(tarjeta) {
    const badge = tarjeta.querySelector('.badge-disponible');
    if (badge) {
      tarjeta.addEventListener('mouseover', function() { badge.classList.add('visible'); });
      tarjeta.addEventListener('mouseout',  function() { badge.classList.remove('visible'); });
    }
  });
}

// Filtra las tarjetas en tiempo real según lo que escribe el usuario
// Se llama desde cargarProductos() — las tarjetas deben existir primero
function registrarBuscador() {
  const buscador = document.querySelector('#buscador');
  if (!buscador) return; // solo correr en páginas con buscador
  buscador.addEventListener('input', function() {
    // .toLowerCase() para que "macbook" encuentre "MacBook"
    const termino = buscador.value.toLowerCase();
    document.querySelectorAll('.tarjeta').forEach(function(tarjeta) {
      const nombre = tarjeta.dataset.nombre.toLowerCase();
      // muestra u oculta según si el nombre incluye el término buscado
      tarjeta.style.display = nombre.includes(termino) ? 'block' : 'none';
    });
  });
}
```

**Parte C — Llamar las tres funciones desde `cargarProductos()`**

Usa **Ctrl + F** y busca `grid.innerHTML = productos.map`. Verás esta línea seguida de `registrarBotonesModal()`. Agrega las dos llamadas nuevas justo debajo:

```javascript
grid.innerHTML = productos.map(crearTarjeta).join('');

registrarBotonesModal();
registrarBadgeHover();   // ← agregar
registrarBuscador();     // ← agregar
```

> **¿Por qué aquí?** Porque en este punto las tarjetas ya existen en el HTML. Cualquier función que busque `.tarjeta` debe ejecutarse después de esta línea.

### Paso 5 — CSS del mensaje de error en `css/styles.css`

Al final del archivo, después del bloque `/* ===== S07: PÁGINA CARRITO ===== */`:

```css
/* ===== S08: ERROR FETCH ===== */
.error-fetch {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 32px;
  color: #ef4444;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
```

### Caso de prueba — Ejercicio 2

1. Recarga con Live Server → los 6 productos aparecen igual que antes ✓
2. DevTools → **Network** → verás una petición a `data/productos.json` con status `200` ✓
3. Abre el modal de un producto → funciona igual ✓
4. El buscador sigue funcionando ✓
5. **Prueba real:** abre `data/productos.json`, agrega un producto 7 → recarga → aparece **sin tocar `main.js`** ✓

---

## Ejercicio 3: Simular y manejar un error (20 min)

### Paso 1 — Romper la ruta intencionalmente

En `cargarProductos()`, cambia temporalmente:

```javascript
const respuesta = await fetch('data/productos-ROTO.json'); // no existe
```

### Paso 2 — Recargar

Guarda el archivo y recarga con Live Server. En la página debe aparecer:

```
⚠️ No se pudieron cargar los productos.
[Reintentar]
```

Si ves las tarjetas normales, verifica que guardaste el archivo después de cambiar la URL.

### Paso 3 — Verificar en consola

Abre DevTools → pestaña **Console**. Verás algo similar a:

```
GET http://127.0.0.1:5500/data/productos-ROTO.json 404 (Not Found)
Error al cargar productos: TypeError: Failed to fetch
```

La primera línea es el navegador reportando que el archivo no existe (404). La segunda es el `console.error()` de tu `catch`.

### Paso 4 — Restaurar y probar "Reintentar"

Vuelve la ruta a `'data/productos.json'`. Haz clic en "Reintentar" — los productos deben cargar correctamente.

### Caso de prueba

- Ruta rota → mensaje visible en la página ✓
- Consola muestra el error técnico ✓
- "Reintentar" → productos cargan ✓

---

## Checklist de autoevaluación

- [ ] `data/productos.json` creado con los 6 productos
- [ ] Array hardcodeado eliminado de `main.js`
- [ ] `cargarProductos()` usa `async/await` y `try/catch`
- [ ] Productos cargan igual al recargar
- [ ] DevTools → Network → `productos.json` con status 200
- [ ] Modal sigue funcionando después del fetch
- [ ] Buscador sigue funcionando
- [ ] Error se muestra en la página con botón "Reintentar"
- [ ] Agregar producto 7 al JSON → aparece sin tocar `main.js`
- [ ] Git commit: `feat: productos desde JSON con fetch() - S08`

---

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Failed to fetch` | Archivo abierto con `file://` | Usar Live Server — botón "Go Live" |
| Productos no aparecen, sin error | `registrarBotonesModal` no definida | Verificar que esté dentro del bloque `if (modal)` |
| `registrarBotonesModal is not defined` | Función fuera del scope del `if (modal)` | Moverla dentro del bloque `if (modal)` |
| Error de sintaxis en JSON | Coma extra, comillas simples o comentarios | Validar en jsonlint.com |
| Modal no abre tras el fetch | `registrarBotonesModal()` no se llama en `cargarProductos()` | Verificar que se llama después del `grid.innerHTML` |

---

## Glosario

| Término | Definición |
|---------|------------|
| **fetch()** | Función del navegador para hacer peticiones HTTP |
| **async** | Marca una función como asíncrona — habilita el uso de `await` |
| **await** | Pausa la función hasta que la promesa se resuelve |
| **JSON** | Formato de texto para intercambiar datos. JavaScript Object Notation |
| **try/catch** | `try` intenta ejecutar el código, `catch` captura cualquier error |
| **API** | Interfaz que expone datos para que otros programas los consuman |
| **HTTP 200** | Código de respuesta: "petición exitosa" |
| **Network tab** | Pestaña de DevTools que muestra todas las peticiones HTTP de la página |

---

*Competencia 220501096 — Ficha 3229944 ADSO — Garzón, Huila*
