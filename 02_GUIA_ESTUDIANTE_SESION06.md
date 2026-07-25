# Guía del Aprendiz — Sesión S06 · Eventos y Event Listeners

**Sesión:** S06 — Eventos y Event Listeners en TechStore Pro  
**Fecha:** Sábado 25 de Julio de 2026  
**Horario:** 6:30 PM – 10:30 PM  
**Proyecto:** Tu réplica de TechStore Pro (el instructor construye en su proyecto — tú replicas en el tuyo)

---

## ¿Qué vas a construir hoy?

Al terminar esta sesión, tu proyecto tendrá 3 funcionalidades nuevas que no tenía antes:

1. **Modal interactivo** — Cada botón "Ver más" abre un panel con información del producto. Se cierra con clic en ×, clic fuera o tecla Escape.
2. **Barra de progreso scroll** — Una línea delgada en la parte superior que avanza mientras el usuario hace scroll.
3. **Badge hover en tarjetas** — Un indicador "Disponible" que aparece cuando el mouse pasa por encima de una tarjeta.

Todo va en `js/main.js`. El HTML no cambia (solo agregas el modal al final del body).

---

## Antes de empezar

Abre tu proyecto y verifica:

- [ ] `js/main.js` existe y tiene el código de S05 (menú hamburguesa, validación, tarjetas dinámicas)
- [ ] El `<script src="js/main.js">` está en `index.html`, `productos.html`, `nosotros.html` y `contacto.html`
- [ ] No hay errores en rojo en la consola (DevTools → Console)

---

### ¿Por qué las tarjetas las genera JavaScript y no están en el HTML?

En S05 construiste en `main.js` un array `productos` con 6 objetos y una función `crearTarjeta` que convierte cada objeto en HTML. Al cargar la página, JavaScript llena el `<div id="grid-tarjetas">` con esas tarjetas automáticamente.

Esto significa que las tarjetas **no deben estar escritas en el HTML** — las crea JavaScript en el momento que la página carga.

**Antes de continuar debes limpiar `productos.html`.**

Abre `productos.html` y busca el `<div class="grid-tarjetas" id="grid-tarjetas">`. Verás que tiene todos los `<article>` escritos ahí. Bórralos y deja el div vacío así:

```html
<div class="grid-tarjetas" id="grid-tarjetas">

</div><!-- /grid-tarjetas -->
```

Guarda el archivo y recarga `productos.html` en el navegador. Las 6 tarjetas deben seguir apareciendo — ahora generadas 100% por JavaScript.

> **¿Por qué esto importa para S06?** Los atributos `data-*` que necesita el modal hay que agregarlos en la función `crearTarjeta` de `main.js`, no en el HTML. Si dejas las tarjetas hardcodeadas en el HTML, el JS las pisa al cargar y los `data-*` que hayas puesto ahí desaparecen. Esto se resuelve en el Paso 3 del Ejercicio 1.

---

## Ejercicio 1 — Modal interactivo (productos.html)

### Paso 1 · Agregar el modal al HTML

Abre `productos.html`. Justo antes del `<script src="js/main.js">`, agrega este bloque:

> **¿Por qué antes del script?** El HTML se lee de arriba a abajo. Si el modal va después del `<script>`, JavaScript corre primero y cuando busca `#modal-producto` todavía no existe — devuelve `null` y el modal nunca funciona.

```html
<!-- MODAL PRODUCTO — S06 -->
<div class="modal-overlay" id="modal-producto">
  <div class="modal-caja">
    <button class="modal-cerrar" id="modal-cerrar">×</button>
    <div class="modal-icono" id="modal-icono">💻</div>
    <h2 class="modal-titulo" id="modal-titulo">Nombre del producto</h2>
    <p class="modal-desc" id="modal-desc">Descripción del producto</p>
    <p class="modal-precio" id="modal-precio">$0</p>
    <button class="modal-btn-carrito">🛒 Agregar al carrito</button>
  </div>
</div>
```

### Paso 2 · Agregar estilos del modal al CSS

Abre `css/styles.css`. Al final del archivo agrega:

```css
/* ── MODAL PRODUCTO · S06 ─────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 500;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-overlay.visible {
  display: flex;
}

.modal-caja {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18);
}

.modal-cerrar {
  position: absolute;
  top: 14px;
  right: 14px;
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-icono {
  font-size: 48px;
  margin-bottom: 12px;
}

.modal-titulo {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a2e;
}

.modal-desc {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
  line-height: 1.6;
}

.modal-precio {
  font-size: 28px;
  font-weight: 900;
  color: #39a900;
  margin-bottom: 20px;
}

.modal-btn-carrito {
  background: #39a900;
  color: #fff;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
}

.modal-btn-carrito:hover {
  background: #2d8400;
}
```

### Paso 3 · Agregar los datos de producto a la función crearTarjeta (main.js)

Como las tarjetas las genera JavaScript (no están escritas en el HTML), los atributos `data-*` hay que agregarlos en la función `crearTarjeta` de `main.js`, no en `productos.html`.

Abre `js/main.js` y busca la función `crearTarjeta`. La tienes así de S05:

```javascript
function crearTarjeta(producto) {
  return `
    <article class="tarjeta" data-id="${producto.id}">
      ...
    </article>
  `;
}
```

Modifica el `<article>` para que incluya los atributos `data-icono`, `data-nombre`, `data-desc` y `data-precio`:

```javascript
function crearTarjeta(producto) {
  return `
    <article class="tarjeta"
      data-id="${producto.id}"
      data-icono="${producto.icono || '📦'}"
      data-nombre="${producto.nombre}"
      data-desc="${producto.descripcion}"
      data-precio="${producto.precio}">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="tarjeta-img">
      <div class="tarjeta-info">
        <h3 class="tarjeta-nombre">${producto.nombre}</h3>
        <p class="tarjeta-desc">${producto.descripcion}</p>
        <div class="tarjeta-pie">
          <span class="tarjeta-precio">${producto.precio}</span>
          <button class="btn-accion">Ver más</button>
        </div>
      </div>
    </article>
  `;
}
```

Ahora **reemplaza completamente** el array `productos` que tienes en `main.js` por este. El cambio es que se agrega la propiedad `icono` a cada objeto y se actualizan los datos reales de TechStore Pro:

```javascript
const productos = [
  {
    id: 1,
    icono: "💻",
    nombre: "MacBook Pro M3",
    descripcion: "Chip M3, 16 GB RAM, 512 GB SSD, pantalla Liquid Retina.",
    precio: "$8.999.000",
    imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop&q=80"
  },
  {
    id: 2,
    icono: "📱",
    nombre: "iPhone 15 Pro",
    descripcion: "Chip A17 Pro, titanio, Dynamic Island, cámara 48 MP.",
    precio: "$4.299.000",
    imagen: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=250&fit=crop&q=80"
  },
  {
    id: 3,
    icono: "🎮",
    nombre: "RTX 4070 Super",
    descripcion: "12 GB GDDR6X, DLSS 3, Ray Tracing. Gaming 4K fluido.",
    precio: "$2.399.000",
    imagen: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=250&fit=crop&q=80"
  },
  {
    id: 4,
    icono: "💼",
    nombre: "Dell XPS 15",
    descripcion: "Intel i7 13va gen, 32 GB RAM, pantalla OLED 4K.",
    precio: "$6.799.000",
    imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop&q=80"
  },
  {
    id: 5,
    icono: "📲",
    nombre: "Samsung Galaxy S24",
    descripcion: "Snapdragon 8 Gen 3, IA Galaxy, cámara 200 MP.",
    precio: "$3.199.000",
    imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop&q=80"
  },
  {
    id: 6,
    icono: "🖥️",
    nombre: "Monitor LG UltraWide 34\"",
    descripcion: "Panel IPS curvo, 3440×1440, 144 Hz, HDR10.",
    precio: "$1.899.000",
    imagen: "https://images.unsplash.com/photo-1555618254-4d2b04e4b00d?w=400&h=250&fit=crop&q=80"
  }
];
```

> **¿Por qué esto funciona?** Cuando JavaScript genera cada `<article>` con los `data-*`, esos atributos quedan disponibles en el DOM. Luego el código del modal los lee con `tarjeta.dataset.nombre`, `tarjeta.dataset.precio`, etc.

### Paso 4 · Escribir el JavaScript en main.js

Abre `js/main.js`. Al final del archivo (después del código de S05), agrega:

```javascript
// ══════════════════════════════════════════════
// EJERCICIO 1 · MODAL PRODUCTO
// Solo en productos.html (donde existe #modal-producto)
// ══════════════════════════════════════════════

const modal = document.querySelector('#modal-producto');

if (modal) {
  const btnCerrar = document.querySelector('#modal-cerrar');
  const botonesVerMas = document.querySelectorAll('.btn-accion');

  // ✏️ Llenar el modal con los datos del producto
  function abrirModal(tarjeta) {
    document.querySelector('#modal-icono').textContent  = tarjeta.dataset.icono  || '📦';
    document.querySelector('#modal-titulo').textContent = tarjeta.dataset.nombre || 'Producto';
    document.querySelector('#modal-desc').textContent   = tarjeta.dataset.desc   || '';
    document.querySelector('#modal-precio').textContent = tarjeta.dataset.precio || '';
    modal.classList.add('visible');
  }

  // Cada botón "Ver más" abre el modal con los datos de su tarjeta
  botonesVerMas.forEach(function(boton) {
    boton.addEventListener('click', function() {
      const tarjeta = boton.closest('.tarjeta');
      abrirModal(tarjeta);
    });
  });

  // Cerrar con el botón ×
  btnCerrar.addEventListener('click', function() {
    modal.classList.remove('visible');
  });

  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', function(evento) {
    if (evento.target === modal) {
      modal.classList.remove('visible');
    }
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', function(evento) {
    if (evento.key === 'Escape') {
      modal.classList.remove('visible');
    }
  });
}
```

### Verificar ejercicio 1

- [ ] Abre `productos.html` en el navegador
- [ ] Haz clic en "Ver más" de cualquier tarjeta → el modal se abre con el nombre y precio de esa tarjeta
- [ ] Haz clic en el botón × → el modal se cierra
- [ ] Haz clic fuera de la caja blanca del modal → se cierra
- [ ] Presiona la tecla Escape → se cierra
- [ ] Sin errores en rojo en la consola

---

## Ejercicio 2 — Barra de progreso scroll

Esta barra funciona en todas las páginas. El elemento HTML ya existe en todas (es el header que tienes) — solo necesitas el CSS y el JS.

### Paso 1 · Agregar el elemento HTML en cada página

En **cada una** de tus 4 páginas (`index.html`, `productos.html`, `nosotros.html`, `contacto.html`), agrega esta línea **después del** `<body>` y **antes** del `<header>`:

```html
<!-- BARRA SCROLL — S06: div vacío, el CSS lo posiciona y el JS le da el ancho -->
<div class="barra-scroll" id="barra-scroll"></div>
```

### Paso 2 · CSS de la barra

En `css/styles.css`, agrega al final:

```css
/* ── BARRA DE PROGRESO SCROLL · S06 ──────────────── */
.barra-scroll {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 0%;
  background: linear-gradient(90deg, #39a900, #ff6b00);
  z-index: 1000;
  transition: width 0.1s;
}
```

### Paso 3 · JavaScript en main.js

Después del código del Ejercicio 1, agrega:

```javascript
// ══════════════════════════════════════════════
// EJERCICIO 2 · BARRA DE PROGRESO SCROLL
// Funciona en todas las páginas
// ══════════════════════════════════════════════

const barraScroll = document.querySelector('#barra-scroll');

if (barraScroll) {
  window.addEventListener('scroll', function() {
    // scrollY = cuántos píxeles hemos bajado
    // scrollHeight - innerHeight = total de píxeles posibles
    const totalDesplazamiento = document.body.scrollHeight - window.innerHeight;
    const porcentaje = (window.scrollY / totalDesplazamiento) * 100;
    barraScroll.style.width = porcentaje + '%';
  });
}
```

### Verificar ejercicio 2

- [ ] Abre `index.html` — en la parte superior debe verse una barra muy delgada (empieza invisible)
- [ ] Haz scroll hacia abajo — la barra se llena de verde a naranja
- [ ] Llega al final de la página — la barra debe estar completamente llena
- [ ] Prueba en las 4 páginas — todas deben tener la barra

---

## Ejercicio 3 — Badge hover en tarjetas

### Paso 1 · CSS del badge

En `css/styles.css`, primero busca la regla `.tarjeta` que ya existe y cambia `overflow: hidden` por `overflow: visible`. Si no lo haces, el badge se corta porque la tarjeta oculta lo que sale de sus bordes:

```css
.tarjeta {
  overflow: visible; /* ← cambiar hidden por visible */
}
```

Luego agrega al final del archivo:

```css
/* ── BADGE HOVER TARJETA · S06 ───────────────────── */
.tarjeta {
  position: relative; /* necesario para posicionar el badge */
}

.badge-disponible {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #39a900;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  display: none;
  z-index: 10;
}

.badge-disponible.visible {
  display: inline-block;
}
```

### Paso 2 · Agregar el badge en la función crearTarjeta (main.js)

Como las tarjetas las genera JavaScript, el badge también debe agregarse en `crearTarjeta`, no en el HTML.

Abre `main.js` y busca la función `crearTarjeta`. Después del `>` que cierra los atributos del `<article>` y antes de la etiqueta `<img>`, agrega esta línea:

```html
<span class="badge-disponible">✓ Disponible</span>
```

La función completa queda así:

```javascript
function crearTarjeta(producto) {
  return `
    <article class="tarjeta"
      data-id="${producto.id}"
      data-icono="${producto.icono || '📦'}"
      data-nombre="${producto.nombre}"
      data-desc="${producto.descripcion}"
      data-precio="${producto.precio}">
      <span class="badge-disponible">✓ Disponible</span>
      <img src="${producto.imagen}" alt="${producto.nombre}" class="tarjeta-img">
      <div class="tarjeta-info">
        <h3 class="tarjeta-nombre">${producto.nombre}</h3>
        <p class="tarjeta-desc">${producto.descripcion}</p>
        <div class="tarjeta-pie">
          <span class="tarjeta-precio">${producto.precio}</span>
          <button class="btn-accion">Ver más</button>
        </div>
      </div>
    </article>
  `;
}
```

> **Importante:** los atributos `data-*` van en la etiqueta de apertura del `<article>`. El `<span class="badge-disponible">` va adentro, como primer hijo, después del `>` de cierre.

### Paso 3 · JavaScript en main.js

Después del código del Ejercicio 2, agrega:

```javascript
// ══════════════════════════════════════════════
// EJERCICIO 3 · BADGE HOVER EN TARJETAS
// Solo en productos.html
// ══════════════════════════════════════════════

const todasLasTarjetas = document.querySelectorAll('.tarjeta');

todasLasTarjetas.forEach(function(tarjeta) {
  const badge = tarjeta.querySelector('.badge-disponible');

  if (badge) {
    // Mostrar badge al entrar el mouse
    tarjeta.addEventListener('mouseover', function() {
      badge.classList.add('visible');
    });

    // Ocultar badge al salir el mouse
    tarjeta.addEventListener('mouseout', function() {
      badge.classList.remove('visible');
    });
  }
});
```

### Verificar ejercicio 3

- [ ] En `productos.html`, pasa el mouse por encima de una tarjeta → aparece el badge verde "✓ Disponible"
- [ ] Mueve el mouse fuera de la tarjeta → el badge desaparece
- [ ] Funciona en las 6 tarjetas
- [ ] No hay errores en consola

---

## Commit en GitHub

Cuando los 3 ejercicios funcionen sin errores en consola:

```bash
git add js/main.js css/styles.css productos.html index.html nosotros.html contacto.html
git commit -m "feat: agregar modal, barra scroll y hover badge - S06"
git push
```

Verifica en GitHub que aparezca el commit con ese mensaje.

---

## Errores frecuentes

**El modal no abre**
- Verifica que `#modal-producto` existe en el HTML
- Verifica que los `data-*` están en el `<article>`, no en el `<button>`
- En la consola escribe: `document.querySelector('#modal-producto')` — si devuelve `null`, el problema está en el HTML

**La barra de scroll no aparece**
- Verifica que agregaste `<div id="barra-scroll">` en el HTML de esa página
- La barra empieza en ancho 0 — es invisible hasta que haces scroll
- Si la página es corta, no habrá mucho espacio para hacer scroll

**El badge no aparece al hacer hover**
- Verifica que `<span class="badge-disponible">` está dentro del `<article class="tarjeta">`
- En el CSS: `.tarjeta { position: relative; }` es obligatorio para que el badge se posicione bien

**`querySelector` devuelve null**
- El elemento no existe en esa página. Por eso usamos `if (modal)` y `if (barraScroll)` — así el código no da error en páginas donde el elemento no existe

---

## ¿Terminaste antes?

Si terminaste los 3 ejercicios y el commit, prueba este reto adicional:

**Filtro de búsqueda en tiempo real**

En `productos.html`, agrega un input sobre el grid de tarjetas:

```html
<input type="text" id="buscador" placeholder="🔍 Buscar producto..." 
       style="width:100%;padding:12px 16px;border:2px solid #e2e8f0;border-radius:10px;font-size:16px;margin-bottom:24px;">
```

Y en `js/main.js`:

```javascript
// ✏️ RETO ADICIONAL · BÚSQUEDA EN TIEMPO REAL
const buscador = document.querySelector('#buscador');

if (buscador) {
  buscador.addEventListener('input', function() {
    const termino = buscador.value.toLowerCase();
    
    todasLasTarjetas.forEach(function(tarjeta) {
      const nombre = tarjeta.dataset.nombre.toLowerCase();
      if (nombre.includes(termino)) {
        tarjeta.style.display = 'block';
      } else {
        tarjeta.style.display = 'none';
      }
    });
  });
}
```

---

## Resumen de lo que aprendiste hoy

| Concepto | Lo que hace | Dónde lo usaste |
|----------|-------------|-----------------|
| `addEventListener('click', fn)` | Escucha clics en un elemento | Botones "Ver más" → abrir modal |
| `addEventListener('scroll', fn)` | Escucha el scroll de la página | Barra de progreso |
| `addEventListener('mouseover', fn)` | Detecta cuando el mouse entra | Badge en tarjetas |
| `addEventListener('mouseout', fn)` | Detecta cuando el mouse sale | Ocultar badge |
| `addEventListener('keydown', fn)` | Detecta teclas presionadas | Escape → cerrar modal |
| `evento.key` | Qué tecla se presionó | `'Escape'` → cerrar |
| `evento.target` | Qué elemento disparó el evento | Clic fuera del modal |
| `classList.add()` | Agrega una clase CSS | Modal → clase `visible` |
| `classList.remove()` | Quita una clase CSS | Cerrar modal |
| `dataset.nombre` | Lee atributo `data-nombre` del HTML | Llenar el modal |
| `window.scrollY` | Píxeles desplazados desde el tope | Calcular % barra |

---

*Próxima sesión: S07 · Miércoles 29 de Julio · Arrays, Objetos y Métodos (map, filter, reduce)*  
*El catálogo de TechStore Pro se construirá completamente desde un array de JavaScript.*

---

## 🔍 Reto de investigación — imagen rota

Si revisas bien el catálogo, una de las 6 tarjetas no muestra imagen. El Monitor LG UltraWide tiene un link de imagen que ya no funciona.

**Tu misión:** detectar cuál es, entender por qué pasa y reemplazar la URL por una que sí funcione.

**Pistas:**
- Abre DevTools → pestaña **Network** → filtra por **Img** → recarga la página. Las imágenes rotas aparecen en rojo con error 404.
- También puedes verlo en DevTools → pestaña **Console** — busca errores de tipo `net::ERR_FAILED`.

**Una URL que sí funciona para el monitor:**
```
https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=400&h=250&fit=crop&q=80
```

Reemplázala en el objeto `id: 6` del array `productos` en `main.js`.