// ================================================
// EJERCICIO 1: MENÚ HAMBURGUESA
// Archivo: js/main.js  ← este archivo
// Funciona en: index.html, productos.html,
//              nosotros.html, contacto.html
// ================================================

// PASO 1 — Buscar el botón hamburguesa en el HTML
// Tu index.html tiene:  <button id="menu-toggle" ...>
// querySelector('#menu-toggle') lo encuentra por su id
const botonMenu = document.querySelector('#menu-toggle');

// PASO 2 — Buscar el nav en el HTML
// Tu index.html tiene:  <nav id="nav-menu" class="nav-menu">
const navMenu = document.querySelector('#nav-menu');

// PASO 3 — Escuchar el clic en el botón
// "cuando el usuario haga clic en botonMenu, ejecuta esta función"
botonMenu.addEventListener('click', function() {

  // PASO 4 — Alternar la clase 'open' en el nav
  // Tu styles.css tiene: .nav-menu.open { display: flex; }
  // toggle agrega 'open' si no la tiene, la quita si ya la tiene
  navMenu.classList.toggle('open');

  // PASO 5 — Actualizar aria-expanded (accesibilidad)
  // Dice si el menú está abierto (true) o cerrado (false)
  const estaAbierto = navMenu.classList.contains('open');
  botonMenu.setAttribute('aria-expanded', estaAbierto);

});

// PASO 6 — Cerrar el menú cuando el usuario toca un enlace
// navMenu.querySelectorAll('a') encuentra los 4 enlaces del nav
const enlaces = navMenu.querySelectorAll('a');

enlaces.forEach(function(enlace) {
  enlace.addEventListener('click', function() {
    // Al tocar un enlace: cerrar el menú
    navMenu.classList.remove('open');
    botonMenu.setAttribute('aria-expanded', 'false');
  });
});

// ================================================
// EJERCICIO 2: VALIDAR FORMULARIO DE CONTACTO
// Funciona en: contacto.html
// El formulario tiene id="form-contacto" y novalidate
// ================================================

// PASO 1 — Encontrar el formulario
// Tu contacto.html tiene:  <form id="form-contacto" novalidate>
const formulario = document.querySelector('#form-contacto');

// PASO 2 — Dos funciones auxiliares para mostrar y limpiar errores
// Los campos en contacto.html tienen esta estructura:
//   <div class="campo">
//     <input id="nombre">
//     <span class="error" id="error-nombre"></span>
//   </div>
// La clase .tiene-error en styles.css pone el borde rojo

function mostrarError(idCampo, mensaje) {
  const campo     = document.querySelector('#' + idCampo);
  const spanError = document.querySelector('#error-' + idCampo);
  campo.closest('.campo').classList.add('tiene-error'); // borde rojo
  spanError.textContent = mensaje;                 // texto del error
}

function limpiarError(idCampo) {
  const campo     = document.querySelector('#' + idCampo);
  const spanError = document.querySelector('#error-' + idCampo);
  campo.closest('.campo').classList.remove('tiene-error'); // quita borde rojo
  spanError.textContent = '';                          // borra el texto
}

// PASO 3 — Escuchar cuando el usuario hace clic en "Enviar mensaje"
// El evento 'submit' se dispara al hacer clic en <button type="submit">
if (formulario) {  // solo corre en contacto.html donde existe el formulario
  formulario.addEventListener('submit', function(evento) {

    // ✏️ LÍNEA 1 — Evitar que la página se recargue al enviar
    // Sin esta línea, la página salta y se pierde todo
    evento.preventDefault(); /* ✏️ escribe: evento.preventDefault() */

    let hayErrores = false; // vamos a cambiar esto a true si hay problemas

    // VALIDAR NOMBRE — id="nombre" en contacto.html
    // .value lee lo que escribió el usuario
    // .trim() elimina espacios al inicio y al final
    const valorNombre = document.querySelector('#nombre').value.trim();
    if (valorNombre.length < 3) {
      mostrarError('nombre', 'Escribe tu nombre completo (mínimo 3 caracteres)');
      hayErrores = true;
    } else {
      limpiarError('nombre');
    }

    // ✏️ LÍNEA 2 — VALIDAR EMAIL — id="email" en contacto.html
    // Un email válido siempre tiene @ y al menos 5 caracteres
    const valorEmail = document.querySelector('#email').value.trim();
    if (!valorEmail.includes('@') || valorEmail.length < 5) {
      mostrarError('email', 'Ingresa un correo válido (debe tener @)');
      hayErrores = true;
    } else {
      limpiarError('email');
    }

    // VALIDAR ASUNTO — id="asunto" (select) en contacto.html
    // value === '' significa que dejaron el "-- Selecciona un asunto --"
    const valorAsunto = document.querySelector('#asunto').value;
    if (valorAsunto === '') {
      mostrarError('asunto', 'Selecciona un asunto');
      hayErrores = true;
    } else {
      limpiarError('asunto');
    }

    // ✏️ LÍNEA 3 — VALIDAR MENSAJE — id="mensaje" (textarea) en contacto.html
    const valorMensaje = document.querySelector('#mensaje').value.trim();
    if (valorMensaje.length < 10) {
      mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
      hayErrores = true;
    } else {
      limpiarError('mensaje');
    }

    // RESULTADO FINAL — si todo está bien, mostrar el mensaje de éxito
    // Tu contacto.html tiene:  <div id="form-exito" style="display:none">
    if (!hayErrores) {
      document.querySelector('#form-exito').style.display = 'block';
      formulario.reset(); // limpia todos los campos
    }

  });
}

// ================================================
// EJERCICIO 3: TARJETAS DINÁMICAS DESDE ARRAY
// Funciona en: index.html (y en productos.html si quieres)
// Requiere: <div id="grid-tarjetas"> vacío en index.html
// ================================================

// PASO 1 — Definir los datos en un array
// Cada { } es un producto. Personaliza con los datos REALES de tu proyecto.
// Las URLs de imagen son de Unsplash — funcionan sin descargar nada.
const productos = [
  {
    id: 1,
    nombre: "✏️ Nombre de tu producto 1",
    descripcion: "✏️ Descripción corta de este producto.",
    precio: "✏️ $XX.000",
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    nombre: "✏️ Nombre de tu producto 2",
    descripcion: "✏️ Descripción corta de este producto.",
    precio: "✏️ $XX.000",
    imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    nombre: "✏️ Nombre de tu producto 3",
    descripcion: "✏️ Descripción corta de este producto.",
    precio: "✏️ $XX.000",
    imagen: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    nombre: "✏️ Nombre de tu producto 4",
    descripcion: "✏️ Descripción corta de este producto.",
    precio: "✏️ $XX.000",
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=250&fit=crop"
  },
  {
    id: 5,
    nombre: "✏️ Nombre de tu producto 5",
    descripcion: "✏️ Descripción corta de este producto.",
    precio: "✏️ $XX.000",
    imagen: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=250&fit=crop"
  },
  {
    id: 6,
    nombre: "✏️ Nombre de tu producto 6",
    descripcion: "✏️ Descripción corta de este producto.",
    precio: "✏️ $XX.000",
    imagen: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=250&fit=crop"
  }
];

// PASO 2 — Función que convierte UN objeto producto en HTML de tarjeta
// Usa backtick ` (no comillas) para escribir HTML con variables ${...}
// Las clases .tarjeta .tarjeta-img etc. ya están definidas en styles.css
function crearTarjeta(producto) {
  return `
    <article class="tarjeta" data-id="${producto.id}">
      <img src="${producto.imagen}"
           alt="${producto.nombre}"
           class="tarjeta-img">
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

// PASO 3 — Buscar el contenedor en index.html
// Tu index.html tiene:  <div id="grid-tarjetas">
const gridTarjetas = document.querySelector('#grid-tarjetas');

// PASO 4 — Llenar el grid con las tarjetas generadas
// .map(crearTarjeta) → convierte cada objeto del array en HTML (string)
// .join('')         → une todos esos strings en uno solo
if (gridTarjetas) {  // ✏️ solo corre en páginas que tienen #grid-tarjetas
  gridTarjetas.innerHTML = productos.map(crearTarjeta).join('');
}