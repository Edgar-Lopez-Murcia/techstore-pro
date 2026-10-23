import { useState, useEffect } from "react"
import ProductCard from "./ProductCard.jsx"





function Productos() {
    const [busqueda, setBusqueda] = useState("");
    const [productos, setProductos] =useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    function cargarProductos() {
    setCargando(true);
    setError(null);
    fetch("http://localhost:3000/api/productos")
        .then((res) => res.json())
        .then((datos) => setProductos(datos))
        .catch(() => setError("No se puede conectar al servidor"))
        .finally(() => setCargando(false));
        }


    useEffect(() => {
        cargarProductos();
    }, []);

    const filtrados= productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase()),
    );

    return (
        
        <div className="flex flex-col gap-10">
            <div className="flex items-center gap-3">

                <input 
                type="text" 
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full max-w-md px-4 py-2 border-2 border-slate-200 rounded-lg"
                />

                <p className="text-sm text-texto-dim whitespace-nowrap">
                    {
                        productos.filter((p) => 
                            p.nombre.toLowerCase().includes(busqueda.toLowerCase())
                        ).length
                    } {" "} 
                    Producto(s) encontrado(s)
                </p>
                <p className="text-xs text-texto-dim"> 
                    ({productos.length} en total en la base de datos) </p>
                <button 
                    onClick={cargarProductos} 
                    className="px-4 py-2 bg-verde text-white rounded-lg font-bold text-sm whitespace-nowrap">
                Regargar
                </button>
            </div>
            {cargando && <p className="text-center py-10">Cargar productos...</p>}
            {error && <p className="text-center text-red-600 py-10">{error}</p>}
            {!cargando && !error && (
                <section className="grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-6 auto-rows-max">
                {productos
                .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
                .map((p) =>(
                    <ProductCard
                    key={p.id}
                    nombre={p.nombre}
                    descripcion={p.descripcion}
                    precio={p.precio}
                    imagen={p.imagen}
                    icono={p.icono}
                    />
                ))}

                </section>
            )}
            {productos.filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase())).length === 0 && (
                <p className="text-center text-texto-dim py-10">
                No se encontraron productos
                </p>
            )} 
            
        </div>
    );
}


export default Productos;