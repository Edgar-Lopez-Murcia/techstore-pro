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
