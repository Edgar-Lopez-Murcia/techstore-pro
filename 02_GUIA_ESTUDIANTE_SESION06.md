# Guía del Estudiante — Sesión 09
## API Colombia: Departamentos y Municipios en el Registro

**Competencia:** 220501096 — Construcción de Software  
**Ficha:** 3229944 ADSO — Garzón, Huila  
**Duración:** 4 horas  
**Proyecto:** TechStore Pro

---

## Objetivos de aprendizaje

1. Consumir una API REST pública real sin API key
2. Encadenar dos fetch dependientes (departamentos → municipios)
3. Poblar `<select>` dinámicamente con datos de una API
4. Guardar la selección en LocalStorage junto con el registro
5. Manejar estados de carga y errores visibles al usuario

---

## Conceptos clave

### ¿Qué es api-colombia.com?

Una API REST pública y gratuita con datos oficiales de Colombia: departamentos, municipios, presidentes, aeropuertos y más. No requiere API key — puedes hacer fetch directamente desde el navegador.

```
GET https://api-colombia.com/api/v1/Department
→ devuelve array con los 33 departamentos

GET https://api-colombia.com/api/v1/Department/{id}/cities
→ devuelve array con los municipios de ese departamento
```

### Fetch encadenado

Cuando el resultado de un fetch determina el siguiente, los encadenamos:

```javascript
// Paso 1 — cargar departamentos al abrir la página
const deptos = await fetch('https://api-colombia.com/api/v1/Department');

// Paso 2 — cuando el usuario elige un departamento, cargar sus municipios
const municipios = await fetch(`https://api-colombia.com/api/v1/Department/${id}/cities`);
```

### Estado de carga

Mientras el fetch está en curso, el usuario debe ver algo — no una pantalla vacía:

```javascript
selectDepto.innerHTML = '<option>Cargando departamentos...</option>';
// ... fetch ...
// cuando llegan los datos, reemplazar con las opciones reales
```

---

## Lo que vas a construir

Un formulario de registro en TechStore Pro donde:
- El campo **Departamento** se carga desde la API al abrir la página
- Al elegir un departamento, el campo **Municipio** se actualiza automáticamente
- Al enviar, los datos se guardan en LocalStorage

---

## Ejercicio 1: Explorar la API desde la consola (15 min)

Con TechStore Pro abierto en Live Server, abre DevTools → **Console**.

### Paso 1 — Ver todos los departamentos

Pega esto y presiona **Enter**:

```javascript
async function verDepartamentos() {
  const respuesta = await fetch('https://api-colombia.com/api/v1/Department');
  const departamentos = await respuesta.json();
  console.log('Total:', departamentos.length);
  departamentos.slice(0, 5).forEach(function(d) {
    console.log(d.id, '-', d.name);
  });
}
verDepartamentos();
```

Verás algo como:
```
Total: 33
3 - Arauca
4 - Atlantico
5 - Bogota D.C.
6 - Bolivar
7 - Boyaca
```

### Paso 2 — Ver municipios de un departamento

Busca el id de Huila (es el 18). Pega esto:

```javascript
async function verMunicipios() {
  const respuesta = await fetch('https://api-colombia.com/api/v1/Department/18/cities');
  const municipios = await respuesta.json();
  console.log('Municipios de Huila:', municipios.length);
  municipios.forEach(function(m) {
    console.log(m.id, '-', m.name);
  });
}
verMunicipios();
```

Debes ver Garzón, Neiva, Pitalito y todos los municipios del Huila.

### Paso 3 — Consultar un departamento por su id

Ahora pide los datos completos de un solo departamento. Cambia el número 18 por el id de cualquier departamento que quieras consultar:

```javascript
async function verDepartamento() {
  const respuesta = await fetch('https://api-colombia.com/api/v1/Department/18');
  const depto = await respuesta.json();
  console.log('Nombre:', depto.name);
  console.log('Población:', depto.population);
  console.log('Superficie km²:', depto.surface);
  console.log('Región:', depto.region);
  console.log('Municipios:', depto.cities.length);
}
verDepartamento();
```

Verás algo como:
```
Nombre: Huila
Población: 1073000
Superficie km²: 19890
Región: Andina
Municipios: 37
```

**¿Qué aprendemos aquí?**

- La URL `/Department/18` devuelve **un solo objeto** — no un array — con todos los datos del departamento.
- El mismo id que usamos para pedir municipios sirve para pedir información del departamento.
- `depto.cities.length` muestra cuántos municipios tiene sin necesidad de un segundo fetch.

**Reto:** cambia el 18 por otro id del Paso 1 y consulta tu departamento favorito.

### Caso de prueba
- `departamentos.length` muestra 33 ✓
- Ves ids y nombres en consola ✓
- Los municipios del Huila incluyen "Garzon" ✓
- `depto.name` muestra "Huila" ✓
- `depto.population` muestra un número ✓

---

## Ejercicio 2: Formulario de registro con selects dinámicos (90 min)

### Lo que vas a construir

Una página `registro.html` con un formulario que carga departamentos y municipios desde la API.

### Paso 1A — Partir de una página existente

Abre `contacto.html` → **clic derecho en el explorador de VS Code → Copiar** → pega en la misma carpeta → renómbrala `registro.html`.

Abre `registro.html` y haz estos dos cambios:

1. Cambia el `<title>`:
```html
<title>Registro — TechStore Pro</title>
```

2. En el nav, cambia el `class="activo"` al enlace de Registro y agrega el enlace:
```html
<a href="contacto.html">Contacto</a>
<a href="registro.html" class="activo">Registro</a>
```
> Recuerda quitar `class="activo"` del enlace donde lo tenías antes.

---

### Paso 1B — Limpiar el `<main>`

Borra todo el contenido que hay dentro de `<main>...</main>` — el formulario de contacto completo. Déjalo así:

```html
<main>

</main>
```

---

### Paso 1C — Construir el formulario campo por campo

Dentro del `<main>` pega esta estructura base:

```html
<section class="seccion-formulario" style="max-width:600px;margin:60px auto;padding:0 24px;">
  <h1 style="margin-bottom:32px;">Crear cuenta</h1>

  <form id="form-registro" novalidate>

    <!-- CAMPO NOMBRE — completo para que veas el patrón -->
    <div class="campo">
      <label for="reg-nombre">Nombre completo</label>
      <input type="text" id="reg-nombre" placeholder="Tu nombre">
      <span class="error" id="error-reg-nombre"></span>
    </div>

    <!-- ✏️ CAMPO EMAIL — construye tú siguiendo el mismo patrón que Nombre -->
    <!-- label: "Correo electrónico" -->
    <!-- id del input: reg-email | id del error: error-reg-email -->
    <!-- type: email | placeholder: correo@ejemplo.com -->

    <!-- CAMPO DEPARTAMENTO — completo: es un select, no un input -->
    <div class="campo">
      <label for="reg-departamento">Departamento</label>
      <!-- JavaScript llenará este select con los 33 departamentos -->
      <select id="reg-departamento">
        <option value="">Cargando departamentos...</option>
      </select>
      <span class="error" id="error-reg-departamento"></span>
    </div>

    <!-- ✏️ CAMPO MUNICIPIO — construye tú siguiendo el mismo patrón que Departamento -->
    <!-- label: texto "Municipio" | for="reg-municipio" -->
    <!-- id del select: reg-municipio | id del error: error-reg-municipio -->
    <!-- el select lleva el atributo: disabled -->
    <!-- option inicial: value="" | texto: "Primero elige un departamento" -->

  </form>

  <div id="resumen-registro" style="display:none;"></div>

</section>
```

**¿Qué debes completar tú?**

1. El campo **Email** — mismo patrón que Nombre pero con `type="email"`
2. El campo **Municipio** — mismo patrón que Departamento pero con `disabled` y texto inicial diferente

---

### Paso 1D — Cerrar el formulario

Justo antes del `</form>` agrega el botón y el mensaje de éxito:

```html
    <button type="submit" class="btn btn-primario" style="width:100%;margin-top:16px;">
      Crear cuenta
    </button>

    <div id="registro-exito" style="display:none;margin-top:20px;padding:16px;background:#dcfce7;border-radius:8px;color:#166534;">
      ✅ Cuenta creada correctamente. <a href="index.html">Ir a la tienda →</a>
    </div>
```

Y antes del `</body>` agrega el script de registro **después** de `main.js`:

```html
  
  <script src="js/registro.js"></script>
```

### Caso de prueba — Paso 1

- `registro.html` abre con Go Live y se ve el header y footer igual que las demás páginas ✓
- El nav muestra "Registro" en azul ✓
- El formulario tiene 4 campos: Nombre, Email, Departamento, Municipio ✓
- El select de Municipio aparece deshabilitado ✓

### Paso 2 — Agregar enlace "Registro" en el nav de todas las páginas

El nav de `registro.html` ya tiene el enlace. Ahora debes agregarlo en las demás páginas para que aparezca en toda la navegación.

Abre cada uno de estos archivos y busca con **Ctrl+F**: `contacto.html">Contacto`. Agrega el enlace justo debajo:

```html
<a href="contacto.html">Contacto</a>
<a href="registro.html">Registro</a>  ← agregar esta línea
```

Páginas donde debes hacer este cambio:
- `index.html`
- `productos.html`
- `nosotros.html`
- `contacto.html`
- `carrito.html`

> ⚠️ **¿Por qué el enlace "Registro" no se ve azul cuando estás en registro.html?**
>
> El enlace activo necesita `class="activo"` — pero **solo en la página donde estás**. En `registro.html` el enlace debe ser:
> ```html
> <a href="registro.html" class="activo">Registro</a>
> ```
> En las demás páginas va **sin** `class="activo"`:
> ```html
> <a href="registro.html">Registro</a>
> ```

### Paso 3 — Crear `js/registro.js`

Crea el archivo `js/registro.js` con este contenido:

```javascript
// ================================================
// S09: REGISTRO CON API COLOMBIA
// Carga departamentos y municipios desde api-colombia.com
// Guarda el registro en LocalStorage
// ================================================

const URL_API = 'https://api-colombia.com/api/v1';

const selectDepto  = document.querySelector('#reg-departamento');
const selectMuni   = document.querySelector('#reg-municipio');
const formRegistro = document.querySelector('#form-registro');

// ── PASO 1: Cargar departamentos al abrir la página ──────────────────────────
// Se ejecuta automáticamente — el usuario ve la lista al entrar al formulario
async function cargarDepartamentos() {
  try {
    // Mostrar estado de carga mientras espera la API
    selectDepto.innerHTML = '<option value="">Cargando departamentos...</option>';

    const respuesta     = await fetch(`${URL_API}/Department`);
    const departamentos = await respuesta.json();

    // Ordenar alfabéticamente por nombre
    departamentos.sort(function(a, b) { return a.name.localeCompare(b.name); });

    // Opción inicial vacía + una opción por departamento
    selectDepto.innerHTML = '<option value="">-- Selecciona un departamento --</option>';
    departamentos.forEach(function(depto) {
      const opcion = document.createElement('option');
      opcion.value       = depto.id;       // usamos el id para pedir municipios
      opcion.textContent = depto.name;
      selectDepto.appendChild(opcion);
    });

  } catch (error) {
    // Si la API falla, mostrar mensaje claro al usuario
    selectDepto.innerHTML = '<option value="">Error al cargar. Recarga la página.</option>';
    console.error('Error cargando departamentos:', error);
  }
}

// ── PASO 2: Cargar municipios cuando el usuario elige un departamento ─────────
// Se ejecuta cada vez que cambia el select de departamento
async function cargarMunicipios(idDepartamento) {
  try {
    // Deshabilitar y mostrar estado de carga
    selectMuni.disabled = true;
    selectMuni.innerHTML = '<option value="">Cargando municipios...</option>';

    const respuesta  = await fetch(`${URL_API}/Department/${idDepartamento}/cities`);
    const municipios = await respuesta.json();

    // Ordenar alfabéticamente
    municipios.sort(function(a, b) { return a.name.localeCompare(b.name); });

    // Habilitar el select y llenar con municipios
    selectMuni.innerHTML = '<option value="">-- Selecciona un municipio --</option>';
    municipios.forEach(function(muni) {
      const opcion = document.createElement('option');
      opcion.value       = muni.name;
      opcion.textContent = muni.name;
      selectMuni.appendChild(opcion);
    });
    selectMuni.disabled = false;

  } catch (error) {
    selectMuni.innerHTML = '<option value="">Error al cargar municipios.</option>';
    console.error('Error cargando municipios:', error);
  }
}

// ── PASO 3: Escuchar cambio en el select de departamento ─────────────────────
// Cada vez que el usuario cambia el departamento, cargar sus municipios
selectDepto.addEventListener('change', function() {
  const idSeleccionado = selectDepto.value;

  if (!idSeleccionado) {
    // Si elige la opción vacía, resetear municipios
    selectMuni.innerHTML = '<option value="">Primero elige un departamento</option>';
    selectMuni.disabled  = true;
    return;
  }

  cargarMunicipios(idSeleccionado);
});

// ── PASO 4: Validar y guardar el registro en LocalStorage ────────────────────
if (formRegistro) {
  formRegistro.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nombre      = document.querySelector('#reg-nombre').value.trim();
    const email       = document.querySelector('#reg-email').value.trim();
    const departamento = selectDepto.options[selectDepto.selectedIndex].text;
    const municipio   = selectMuni.value;
    let hayErrores    = false;

    // Validar nombre
    if (nombre.length < 3) {
      document.querySelector('#error-reg-nombre').textContent = 'Escribe tu nombre completo';
      hayErrores = true;
    } else {
      document.querySelector('#error-reg-nombre').textContent = '';
    }

    // Validar email
    if (!email.includes('@') || email.length < 5) {
      document.querySelector('#error-reg-email').textContent = 'Ingresa un correo válido';
      hayErrores = true;
    } else {
      document.querySelector('#error-reg-email').textContent = '';
    }

    // Validar departamento
    if (!selectDepto.value) {
      document.querySelector('#error-reg-departamento').textContent = 'Selecciona un departamento';
      hayErrores = true;
    } else {
      document.querySelector('#error-reg-departamento').textContent = '';
    }

    // Validar municipio
    if (!municipio) {
      document.querySelector('#error-reg-municipio').textContent = 'Selecciona un municipio';
      hayErrores = true;
    } else {
      document.querySelector('#error-reg-municipio').textContent = '';
    }

    if (!hayErrores) {
      // Guardar en LocalStorage
      const usuario = {
        nombre,
        email,
        departamento,
        municipio,
        fecha: new Date().toLocaleDateString('es-CO')
      };
      localStorage.setItem('usuario-registro', JSON.stringify(usuario));

      // Mostrar mensaje de éxito
      document.querySelector('#registro-exito').style.display = 'block';
      formRegistro.reset();
      selectMuni.innerHTML = '<option value="">Primero elige un departamento</option>';
      selectMuni.disabled  = true;
    }
  });
}

// ── Ejecutar al cargar la página ─────────────────────────────────────────────
cargarDepartamentos();
```

### Caso de prueba — Ejercicio 2

1. Abre `registro.html` con Live Server → el select de Departamento carga automáticamente ✓
2. Elige un departamento → el select de Municipio se habilita con sus municipios ✓
3. Elige "Huila" → aparece "Garzon", "Neiva", "Pitalito", etc. ✓
4. Llena el formulario y envía → mensaje de éxito ✓
5. DevTools → **Application → LocalStorage** → verás el objeto `usuario-registro` ✓
6. Recarga la página → los selects vuelven a cargarse desde la API ✓

---

## Ejercicio 3: Mostrar los datos guardados (25 min)

Después de un registro exitoso, muestra un resumen de los datos guardados.

### Paso 1 — Leer el registro desde LocalStorage

Agrega esta función al final de `js/registro.js`:

```javascript
// ── BONUS: Mostrar registro guardado si existe ────────────────────────────────
function mostrarRegistroGuardado() {
  const guardado = localStorage.getItem('usuario-registro');
  if (!guardado) return;

  const usuario = JSON.parse(guardado);
  const resumen = document.querySelector('#resumen-registro');
  if (!resumen) return;

  resumen.innerHTML = `
    <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:20px;margin-top:24px;">
      <h3 style="margin-bottom:12px;color:#0369a1;">👤 Cuenta registrada</h3>
      <p><strong>Nombre:</strong> ${usuario.nombre}</p>
      <p><strong>Email:</strong> ${usuario.email}</p>
      <p><strong>Ubicación:</strong> ${usuario.municipio}, ${usuario.departamento}</p>
      <p><strong>Fecha:</strong> ${usuario.fecha}</p>
      <button onclick="localStorage.removeItem('usuario-registro'); location.reload();" 
              style="margin-top:12px;padding:8px 16px;background:#ef4444;color:white;border:none;border-radius:6px;cursor:pointer;">
        Cerrar sesión
      </button>
    </div>
  `;
  resumen.style.display = 'block';
}

mostrarRegistroGuardado();
```

### Caso de prueba
- Si hay registro guardado → aparece el resumen al cargar la página ✓
- Clic en "Cerrar sesión" → borra el registro y recarga ✓

---

## Checklist de autoevaluación

- [ ] `registro.html` creado con los dos `<select>`
- [ ] `js/registro.js` creado con `cargarDepartamentos()` y `cargarMunicipios()`
- [ ] Al cargar la página → select de Departamento se llena automáticamente
- [ ] Al elegir departamento → select de Municipio se habilita con sus municipios
- [ ] Validación muestra errores si faltan campos
- [ ] Registro se guarda en LocalStorage al enviar
- [ ] DevTools → Application → LocalStorage → objeto `usuario-registro` visible
- [ ] Resumen del registro aparece si ya hay datos guardados
- [ ] Enlace "Registro" en el nav de las páginas principales
- [ ] Git commit: `feat: registro con API Colombia departamentos municipios - S09`

---

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| Select de departamento no carga | Abrió con `file://` | Usar Live Server |
| `Failed to fetch` | Sin internet o API caída | Verificar conexión |
| Municipios no aparecen al cambiar departamento | Event listener no registrado | Verificar `selectDepto.addEventListener('change', ...)` |
| Select de municipio sigue deshabilitado | `selectMuni.disabled = false` no se ejecuta | Verificar que el `catch` no está capturando un error silencioso |
| LocalStorage no guarda | Formulario no pasa validación | Revisar campos con errores en rojo |

---

## Glosario

| Término | Definición |
|---------|------------|
| **API REST** | Servicio web que responde a peticiones HTTP con datos JSON |
| **Fetch encadenado** | Segundo fetch que depende del resultado del primero |
| **select dinámico** | `<select>` cuyas opciones se crean con JavaScript, no en el HTML |
| **`disabled`** | Propiedad que impide interactuar con un elemento del formulario |
| **`document.createElement`** | Crea un elemento HTML desde JavaScript |
| **`appendChild`** | Agrega un elemento como hijo de otro en el DOM |

---

*Competencia 220501096 — Ficha 3229944 ADSO — Garzón, Huila*