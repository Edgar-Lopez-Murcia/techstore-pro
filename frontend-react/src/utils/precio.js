export function precioANumero(precio) {
    return Number(precio.replace(/[$.]/g, ""));
}

export function formatearPrecio(numero) {
    return "$" + numero.toLocaleString("es-CO");
}