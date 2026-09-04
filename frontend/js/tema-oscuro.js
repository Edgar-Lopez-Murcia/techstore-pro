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

aplicarTemaGuardado();