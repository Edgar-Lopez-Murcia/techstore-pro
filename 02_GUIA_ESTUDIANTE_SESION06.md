# Guía del Estudiante — Sesión 07
## LocalStorage y Persistencia de Datos

**Competencia:** 220501096 — Construcción de Software  
**Ficha:** 3229944 ADSO — Garzón, Huila  
**Duración:** 4 horas  
**Proyecto:** TechStore Pro (`C:\Users\[tu-usuario]\techstore-pro`)

---

## Objetivos de aprendizaje

Al finalizar la sesión serás capaz de:

1. Explicar la diferencia entre datos en variables JS y datos en LocalStorage
2. Usar los 4 métodos de LocalStorage: `setItem`, `getItem`, `removeItem`, `clear`
3. Guardar y leer arrays de objetos usando `JSON.stringify` y `JSON.parse`
4. Agregar persistencia real a TechStore Pro: tema oscuro + carrito de compras + badge del header

---

## Conceptos clave

### ¿Por qué los datos se pierden?

Cuando escribes `let carrito = []` en JavaScript, ese array existe en la **memoria RAM** del navegador. Es temporal: en cuanto la página se recarga o se cierra, desaparece.

```
Variable JS:  Existe mientras la página está abierta → muere al recargar
LocalStorage: Existe en el disco del navegador → sobrevive al cerrar Chrome
```

### ¿Qué es LocalStorage?

Un espacio de almacenamiento que el navegador le da a cada sitio web. Piénsalo como un pequeño cajón con llave — solo `localhost:5500` puede abrir el cajón de `localhost:5500`.

**Límites:**
- ~5 MB por dominio (más que suficiente para cualquier proyecto del curso)
- Solo guarda texto (strings)
- No tiene fecha de expiración — persiste indefinidamente
- No se comparte entre dominios ni entre navegadores

### Los 4 métodos

| Método | Qué hace | Ejemplo |
|--------|----------|---------|
| `setItem(clave, valor)` | Guarda o sobreescribe un dato | `localStorage.setItem('tema', 'oscuro')` |
| `getItem(clave)` | Lee un dato (devuelve `null` si no existe) | `localStorage.getItem('tema')` |
| `removeItem(clave)` | Borra un dato específico | `localStorage.removeItem('tema')` |
| `clear()` | Borra todo lo del sitio | `localStorage.clear()` |

### Guardar arrays y objetos — regla obligatoria

LocalStorage solo acepta strings. Si intentas guardar un array directamente, lo convierte a `"[object Object]"` — inútil.

**Solución: JSON.stringify al guardar, JSON.parse al leer**

```javascript
// Guardar un array
const carrito = [{ id: 1, nombre: "MacBook Pro" }];
localStorage.setItem('carrito', JSON.stringify(carrito));

// Leer el array
const texto = localStorage.getItem('carrito');
const carritoLeido = JSON.parse(texto);
console.log(carritoLeido[0].nombre); // "MacBook Pro"
```

**Regla fácil:** Si guardas → `stringify`. Si lees → `parse`.

---

## Ejercicio 1: Tema oscuro persistente (45 min)

### Lo que vas a construir

Un botón en el header que alterna entre tema claro y oscuro. La preferencia se guarda en LocalStorage y se aplica automáticamente al recargar la página.

### Paso 1 — Agrega el botón al header en `index.html`

Abre `index.html`. Agrega el botón **después del `</nav>`**, antes del `</header>`. En diseño web el botón de tema siempre va en el extremo derecho, separado de la navegación:

```html
    <nav id="nav-menu" class="nav-menu">
      <a href="index.html" class="activo">Inicio</a>
      <a href="productos.html">Productos</a>
      <a href="nosotros.html">Nosotros</a>
      <a href="contacto.html">Contacto</a>
    </nav>
    <!-- ✏️ S07: botón tema — extremo derecho, fuera del nav -->
    <button id="btn-tema" class="btn-tema" aria-label="Cambiar tema">🌙</button>
  </header>
```

Haz lo mismo en `productos.html`, `nosotros.html` y `contacto.html` — el botón debe aparecer en todas las páginas.

### Paso 2 — Agrega los estilos en `css/styles.css`

Abre `css/styles.css`. Ve al final del archivo (después del bloque `/* ── BADGE HOVER TARJETA · S06 ── */`) y agrega esto al final:

```css
/* ===== S07: TEMA OSCURO ===== */

/* Mismo padding que los links del nav — así queda alineado */
.btn-tema {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 15px;
  color: white;
  transition: background 0.2s, border-color 0.2s;
  line-height: 1;
}

.btn-tema:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Variables del tema oscuro */
body.tema-oscuro {
  --color-fondo:       #0f172a;
  --color-blanco:      #1e293b;
  --color-texto:       #e2e8f0;
  --color-texto-suave: #94a3b8;
  --color-borde:       #334155;
}

body.tema-oscuro .seccion-header h2 { color: #f1f5f9; }

body.tema-oscuro .tarjeta {
  background: #1e293b;
  border-color: #334155;
}

body.tema-oscuro .tarjeta-nombre { color: #f1f5f9; }

body.tema-oscuro .modal-caja  { background: #1e293b; color: #f1f5f9; }
body.tema-oscuro .modal-titulo { color: #f1f5f9; }
body.tema-oscuro .modal-desc   { color: #94a3b8; }
```

### Paso 3 — Agrega las funciones en `js/main.js`

Al final de `main.js`, agrega estas funciones:

```javascript
// ===== S07: TEMA OSCURO =====

// ✏️ COMPLETA: Lee el tema guardado en LocalStorage
// Si existe, aplícalo al body. Si no existe, no hagas nada.
function aplicarTemaGuardado() {
  const tema = localStorage.getItem('tema');
  if (tema === 'oscuro') {
    document.body.classList.add('tema-oscuro');
    const btn = document.getElementById('btn-tema');
    if (btn) btn.textContent = '☀️'; // cambiar el ícono
  }
}

// ✏️ COMPLETA: Alterna entre claro y oscuro y guarda la preferencia
function toggleTema() {
  const esOscuro = document.body.classList.toggle('tema-oscuro');
  const btn = document.getElementById('btn-tema');
  
  if (esOscuro) {
    localStorage.setItem('tema', 'oscuro');
    if (btn) btn.textContent = '☀️';
  } else {
    localStorage.setItem('tema', 'claro');
    if (btn) btn.textContent = '🌙';
  }
}

// Conectar el botón y aplicar el tema al cargar
const btnTema = document.getElementById('btn-tema');
if (btnTema) {
  btnTema.addEventListener('click', toggleTema);
}

aplicarTemaGuardado(); // ← ejecutar al cargar la página
```

### Caso de prueba — Ejercicio 1

1. Recarga la página → tema claro (por defecto)
2. Haz clic en el botón 🌙 → tema oscuro, ícono cambia a ☀️
3. **Recarga la página** → debe seguir en tema oscuro ✓
4. Abre DevTools → Application → Local Storage → verás `tema: "oscuro"` ✓
5. Haz clic en ☀️ → vuelve a tema claro
6. Recarga → tema claro ✓

---

## Ejercicio 2: Carrito de compras (55 min)

### Lo que vas a construir

Cuando el usuario hace clic en "🛒 Agregar al carrito" dentro del modal, el producto se guarda en LocalStorage. El carrito persiste al navegar entre páginas y al recargar.

### Paso 1 — Agrega el badge al header

En `index.html` **y** `productos.html`, **reemplaza** el `<button id="btn-tema">` suelto por este bloque que agrupa el botón y el badge, antes del `</header>`:

```html
    <div class="header-acciones">
      <button id="btn-tema" class="btn-tema" aria-label="Cambiar tema">🌙</button>
      <div class="carrito-badge-contenedor">
        <span>🛒</span>
        <span class="carrito-badge" id="carrito-badge">0</span>
      </div>
    </div>
  </header>
```

Agrega en `css/styles.css`, al final del archivo después del bloque `/* ── BADGE HOVER TARJETA · S06 ── */` — **solo si no existe ya `.header-acciones`**:

```css
.header-acciones {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

### Paso 2 — Estilos del badge en `css/styles.css`

```css
/* ===== S07: BADGE CARRITO ===== */
.carrito-badge-contenedor {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.carrito-badge-contenedor > span:first-child {
  font-size: 18px;
  line-height: 1;
}

.carrito-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: var(--color-primario);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.carrito-badge.oculto {
  display: none;
}
```

### Paso 3 — Funciones del carrito en `js/main.js`

Al final de `main.js`, agrega:

```javascript
// ===== S07: CARRITO DE COMPRAS =====

// Lee el carrito de LocalStorage (o devuelve array vacío)
function leerCarrito() {
  const guardado = localStorage.getItem('carrito');
  return guardado ? JSON.parse(guardado) : [];
}

// Guarda el carrito en LocalStorage y actualiza el badge
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarBadge();
}

// ✏️ COMPLETA: Actualiza el número que aparece en el badge del header
function actualizarBadge() {
  const badge = document.getElementById('carrito-badge');
  if (!badge) return; // el badge puede no existir en todas las páginas
  
  const carrito = leerCarrito();
  badge.textContent = carrito.length;
  
  badge.classList.remove('oculto');
}

// ✏️ COMPLETA: Agrega un producto al carrito
function agregarAlCarrito(producto) {
  const carrito = leerCarrito();
  carrito.push(producto);
  guardarCarrito(carrito); // guarda y actualiza badge
  
  // Feedback visual al usuario
  alert(`✅ ${producto.nombre} agregado al carrito`);
}

// Conectar el botón "Agregar al carrito" del modal
const btnModalCarrito = document.querySelector('.modal-btn-carrito');
if (btnModalCarrito) {
  btnModalCarrito.addEventListener('click', function() {
    // Leer los datos del producto desde el modal
    const producto = {
      nombre: document.getElementById('modal-titulo').textContent,
      precio: document.getElementById('modal-precio').textContent,
      icono: document.getElementById('modal-icono').textContent,
      fecha:  new Date().toLocaleDateString('es-CO')
    };
    
    agregarAlCarrito(producto);
    
    // Cerrar el modal
    document.getElementById('modal-producto').classList.remove('visible');
  });
}

// Inicializar el badge al cargar la página
actualizarBadge();

// Clic en el badge → ir a carrito.html
const badgeContenedor = document.querySelector('.carrito-badge-contenedor');
if (badgeContenedor) {
  badgeContenedor.addEventListener('click', function() {
    window.location.href = 'carrito.html';
  });
}
```

### Caso de prueba — Ejercicio 2

1. Carga la página → badge muestra `0` (o está oculto)
2. Abre el modal de cualquier producto → clic en "🛒 Agregar al carrito"
3. Badge cambia a `1` ✓
4. **Recarga la página** → badge sigue mostrando `1` ✓
5. Navega a `productos.html` → badge sigue mostrando `1` ✓
6. Agrega otro producto → badge muestra `2` ✓
7. Abre DevTools → Application → Local Storage → verás `carrito: [...]` ✓

---

## Ejercicio 3: Página del carrito (40 min)

### Lo que vas a construir

Una página `carrito.html` que lee el LocalStorage y muestra los productos que el usuario ha agregado.

### Paso 0 — Agrega los estilos en `css/styles.css`

Al final del archivo, después del bloque `/* ===== S07: BADGE CARRITO ===== */`:

```css
/* ===== S07: PÁGINA CARRITO ===== */
.seccion-carrito {
  max-width: 800px;
  margin: 60px auto;
  padding: 0 32px;
}

.carrito-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--color-blanco);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  padding: 16px 20px;
  margin-bottom: 12px;
}

.carrito-item-icono { font-size: 32px; }
.carrito-item-info  { flex: 1; }
.carrito-item-nombre { font-weight: 700; color: var(--color-oscuro); }
.carrito-item-precio { color: var(--color-primario); font-weight: 700; }
.carrito-item-fecha  { font-size: 12px; color: var(--color-texto-suave); }

.carrito-acciones {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: center;
}

.carrito-vacio {
  text-align: center;
  padding: 40px;
  color: var(--color-texto-suave);
}
```

### Paso 1 — Crea `carrito.html`

Copia la estructura de `index.html` (header, footer, scripts). Reemplaza el `<main>` con:

```html
<main>
  <section class="seccion-carrito" id="seccion-carrito">
    <div class="seccion-header">
      <h2>🛒 Mi carrito</h2>
      <p id="carrito-resumen">Cargando...</p>
    </div>
    
    <!-- ✏️ La lista de productos se genera con JavaScript -->
    <div id="lista-carrito"></div>
    
    <!-- Botón para vaciar el carrito -->
    <div class="carrito-acciones">
      <button id="btn-vaciar" class="btn btn-secundario">🗑️ Vaciar carrito</button>
      <a href="index.html" class="btn btn-primario">Seguir comprando</a>
    </div>
  </section>
</main>
```

### Paso 2 — Función para mostrar el carrito en `js/main.js`

Agrega al final del archivo, después del bloque `// ===== S07: CARRITO DE COMPRAS =====`:

```javascript
// ===== S07: PÁGINA CARRITO =====

// ✏️ COMPLETA: Solo ejecutar si estamos en carrito.html
function mostrarPaginaCarrito() {
  const lista = document.getElementById('lista-carrito');
  const resumen = document.getElementById('carrito-resumen');
  if (!lista) return; // no estamos en carrito.html
  
  const carrito = leerCarrito();
  
  if (carrito.length === 0) {
    resumen.textContent = 'Tu carrito está vacío';
    lista.innerHTML = '<p class="carrito-vacio">No hay productos en el carrito. <a href="index.html">Ver productos →</a></p>';
    return;
  }
  
  resumen.textContent = `${carrito.length} producto(s) en el carrito`;
  
  lista.innerHTML = ''; // limpiar antes de renderizar
  
  carrito.forEach(function(producto, indice) {
    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = `
      <span class="carrito-item-icono">${producto.icono}</span>
      <div class="carrito-item-info">
        <div class="carrito-item-nombre">${producto.nombre}</div>
        <div class="carrito-item-precio">${producto.precio}</div>
        <div class="carrito-item-fecha">Agregado: ${producto.fecha}</div>
      </div>
      <button class="btn-eliminar" data-indice="${indice}">Eliminar</button>
    `;
    lista.appendChild(item);
  });
  
  // Conectar los botones "Eliminar"
  document.querySelectorAll('.btn-eliminar').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const indice = parseInt(this.dataset.indice);
      const carritoActual = leerCarrito();
      carritoActual.splice(indice, 1); // eliminar ese índice
      guardarCarrito(carritoActual);
      mostrarPaginaCarrito(); // re-renderizar
    });
  });
}

// Botón vaciar carrito
const btnVaciar = document.getElementById('btn-vaciar');
if (btnVaciar) {
  btnVaciar.addEventListener('click', function() {
    if (confirm('¿Seguro que quieres vaciar el carrito?')) {
      localStorage.removeItem('carrito');
      actualizarBadge();
      mostrarPaginaCarrito();
    }
  });
}

mostrarPaginaCarrito(); // llamar al cargar
```

### Caso de prueba — Ejercicio 3

1. Agrega 2 o 3 productos desde `index.html`
2. Abre `carrito.html` → deben aparecer los productos ✓
3. Haz clic en "Eliminar" en un producto → desaparece ✓
4. Badge del header se actualiza ✓
5. Haz clic en "Vaciar carrito" → lista vacía y badge en `0` ✓
6. Recarga `carrito.html` → sigue vacío ✓

---

## Checklist de autoevaluación

Antes del commit, verifica:

- [ ] El botón de tema aparece en el header de todas las páginas
- [ ] Activar el tema oscuro y recargar → sigue oscuro
- [ ] Agregar producto al carrito → badge se actualiza en tiempo real
- [ ] Navegar a `productos.html` → badge mantiene el número
- [ ] Recargar cualquier página → badge mantiene el número
- [ ] `carrito.html` muestra los productos correctamente
- [ ] Eliminar un producto desde `carrito.html` → badge se actualiza
- [ ] Vaciar el carrito → todo se resetea
- [ ] DevTools → Application → Local Storage → se ven las claves `tema` y `carrito`
- [ ] Git commit hecho: `feat: tema oscuro, carrito y badge con LocalStorage - S07`

---

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `localStorage.getItem('carrito')` devuelve `"[object Object]"` | Guardaste el array sin `JSON.stringify` | Usa `JSON.stringify(carrito)` al guardar |
| `JSON.parse(...)` lanza un error | El valor guardado no es JSON válido | Verifica en DevTools qué hay guardado. Usa `localStorage.clear()` y prueba de nuevo |
| Badge no se actualiza al agregar | `actualizarBadge()` no se llama desde `guardarCarrito` | Verifica que `guardarCarrito` llame a `actualizarBadge()` |
| El tema no persiste | `aplicarTemaGuardado()` no se llama al cargar | Verifica que esté al final de `main.js` fuera de cualquier función |
| Badge muestra `NaN` | `carrito.length` de un valor que no es array | Agrega `|| []` en `leerCarrito`: `return guardado ? JSON.parse(guardado) : []` |

---

## Glosario

| Término | Definición |
|---------|------------|
| **LocalStorage** | API del navegador para guardar datos de forma persistente por dominio |
| **SessionStorage** | Similar a LocalStorage pero solo dura mientras la pestaña está abierta |
| **setItem / getItem** | Métodos para escribir y leer en LocalStorage |
| **JSON.stringify** | Convierte un objeto/array JavaScript en texto JSON para almacenar |
| **JSON.parse** | Convierte texto JSON de vuelta en objeto/array JavaScript |
| **Persistencia** | Capacidad de un dato de sobrevivir a recargas o cierres del navegador |
| **Badge** | Contador circular pequeño que aparece sobre un ícono (ej: notificaciones) |

---

## Recursos

- [MDN — LocalStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [MDN — JSON.stringify](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [MDN — JSON.parse](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- DevTools → Application → Local Storage (para inspeccionar en tiempo real)

---

*Competencia 220501096 — Ficha 3229944 ADSO — Garzón, Huila*
