function ProductCard() {

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Tarjeta 1 */} 
            <div className="flex flex-col gap-2 p-4 rounded-xl shadow-md bg-white ">
            <img src="https://tecnoplaza.com.co/cdn/shop/files/910-005565-1-b91d4534-047b-4518-a73d-e9e49acc963e.jpg?v=1743709326" className="rounded-lg h-70 w-full object-cover" />
            <h3 className="font-bold text-lg">Mouse Inalámbrico</h3>
            <p className="text-texto-dim text-sm">Mouse ergonómico, Conexión Bluetooth</p>
            <p className="text-verde font-extrabold">$89.900</p>
            </div>

            {/* Tarjeta 2 */} 
            <div className="flex flex-col gap-2 p-4 rounded-xl shadow-md bg-white">
            <img src="https://m.media-amazon.com/images/I/71W1pAhYSjL._AC_UF894,1000_QL80_.jpg" className="rounded-lg h-70 w-full object-cover" />
            <h3 className="font-bold text-lg">Teclado Mecánico</h3>
            <p className="text-texto-dim text-sm">Switches azules, Retroiluminado RGB</p>
            <p className="text-verde font-extrabold">$149.900</p>
            </div>

            {/* Tarjeta 3 */} 
            <div className="flex flex-col gap-2 p-4 rounded-xl shadow-md bg-white">
            <img src="https://lasmejorescompras.com/wp-content/uploads/2026/05/MONITOR-JANUS-IPS-24-GAMER-144HZ.jpg" className="rounded-lg h-70 w-full object-cover" />
            <h3 className="font-bold text-lg">Moonitor 24</h3>
            <p className="text-texto-dim text-sm">Full  HD, 75Hz, panel IPS</p>
            <p className="text-verde font-extrabold">$899.900</p>
            </div>

            {/* Tarjeta 4 */} 
            <div className="flex flex-col gap-2 p-4 rounded-xl shadow-md bg-white">
            <img src="https://factorynet.cl/cdn/shop/files/Capturadepantalla2026-01-06ala_s_11.48.57a.m..png?v=1767711013&width=807" className="rounded-lg h-70 w-full object-cover" />
            <h3 className="font-bold text-lg">Audífonos Bluethooth</h3>
            <p className="text-texto-dim text-sm">Cancelación de ruido, 20h de batería</p>
            <p className="text-verde font-extrabold">$199.900</p>
            </div>

        </section>
        
    )
}

export default ProductCard