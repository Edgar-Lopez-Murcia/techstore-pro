
async function cargarProductoDetalle() {
    // 1. Leer el ?id= de la URLSearchParams
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id'); // "64a1b3" o null

    const elCargando = document.getElementById('estado-cargando');
    const elError = document.getElementById('estado-error');
    const elDetalle = document.getElementById('producto-detalle');

    // 2. Sin id en la URL  mostrar error
    if (!id) {elCargando.style.display = 'none'; elError.style.display = 'block'; return;}

    try {
        // 3.   Pedir el producto al backend (ruta del Paso 1)
        const respuesta = await fetch('http://localhost:3000/api/productos/' + id);
        if (!respuesta.ok) throw new Error('No encontrado');
        const producto = await respuesta.json();

        // 4. Llenar el DOM con los datos del producto
        document.getElementById('producto-nombre').textContent   = producto.nombre;
        document.getElementById('producto-precio').textContent   = producto.precio;
        document.getElementById('producto-descripcion').textContent   = producto.descripcion;

        // 4b. Imagen: si tiene <img> si no el emoji como placeholder
        const imgWrap = document.getElementById('producto-imagen-wrap');
        imgWrap.innerHTML = producto.imagen
            ? `<img src="${producto.imagen}" alt="${producto.nombre}">`
            :`<div class="producto-iamgen-placeholder">${producto.icono || '📦'}</div>`;

        // 5. Mostrar el contenido
        elCargando.style.display = 'none';
        elDetalle.style.display = 'flex';

        // 6. Mostrar el formulario de comentarios solo si hay token
        const token = localStorage.getItem('token');
        const elFormWrap = document.getElementById('formulario-comentario-wrap');
        const elAdvertencia = document.getElementById('advertencia-sesion');

        if (token) {
            elFormWrap.style.display = 'block';
            elAdvertencia.style.display = 'none';
        } else {
            elFormWrap.style.display = 'none';
            elAdvertencia.style.display = 'block';
        }

        // =========================================================
        //  MOSTRAR LOS COMENTARIOS EXISTENTES
        // =========================================================
        const elLista = document.getElementById('lista-comentarios');
        elLista.innerHTML = ''; // Limpiamos basura previa

        if (!producto.comentarios || producto.comentarios.length === 0) {
            elLista.innerHTML = '<p style="color: #6b7280; font-style: italic;">Sé el primero en calificar este producto.</p>';
        } else {
            producto.comentarios.forEach(com => {
                const estrellas = '⭐'.repeat(com.calificacion);
                const nombreUsuario = com.usuario ? com.usuario.nombre : 'Usuario Anónimo';
                
                elLista.innerHTML += `
                    <div class="comentario-tarjeta" style="margin-bottom: 16px; padding: 12px; border-bottom: 1px solid #eee; text-align: left;">
                        <p style="margin: 0 0 4px 0;"><strong>${nombreUsuario}</strong> - <span style="color: #f59e0b;">${estrellas}</span></p>
                        <p style="color: #4b5563; margin: 0;">${com.comentario}</p>
                    </div>
                `;
            });
        }

        // 7. Botón agregado al carrito - agregarAlCarrito() viene de main.js
        document.getElementById('btn-agregar-carrito').addEventListener('click', function(){
            agregarAlCarrito({ id: producto._id, nombre: producto.nombre,
                precio: producto.precio, icono: producto.icono || '📦',
                imagen: producto.imagen || '', fecha: new Date().toLocaleDateString('es-CO') });
            const msg = document.getElementById('producto-mensaje');
            msg.innerHTML = `<div style="background: #dcfce7;border: 1px solid #bbf7d0;border-radius: 10px;padding: 12px 16px;">`
                + `<p style="color: #15803d;font-weight: 600;">✅ Agregado - <a href="carrito.html" style="color: #166534;">Ver carrito -</a></p></div>`
            msg.style.display = 'block';
        });

        // 8. Enviar comentario - solo si hay token
        if (token) {
            document.getElementById('form-comentario').addEventListener('submit', async function(e) {
                e.preventDefault(); // Evita que la página se recargue
                
                const textoComentario = document.getElementById('input-texto-comentario').value;
                const calificacionEstrellas = document.getElementById('input-estrellas').value;

                try {
                    const envio = await fetch('http://localhost:3000/api/productos/' + id + '/comentarios', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify({
                            comentario: textoComentario,
                            calificacion: Number(calificacionEstrellas)
                        })
                    });

                    if (envio.ok) {
                        // Si se guardó en Atlas, limpia el cuadro de texto y refresca la pantalla
                        document.getElementById('form-comentario').reset();
                        cargarProductoDetalle(); 
                    } else {
                        alert('No se pudo guardar tu opinión. Inténtalo de nuevo.');
                    }
                } catch (error) {
                    console.error('Error al enviar comentario:', error);
                }
            });
        }
    } catch (err) {
        elCargando.style.display = 'none';
        elError.style.display = 'block';
    }
    
}

cargarProductoDetalle();