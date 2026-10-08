import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import ProductCard from "./ProductCard.jsx"


const propductos = [
  {
    nombre: "Mouse Inalámbrico",
    descripcion: "Mouse ergonómico, Conexión Bluetooth",
    precio: "$89.900",
    imagen: "https://tecnoplaza.com.co/cdn/shop/files/910-005565-1-b91d4534-047b-4518-a73d-e9e49acc963e.jpg?v=1743709326",
    stock: 12
  },
  {
    nombre: "Teclado Mecánico",
    descripcion: "Switches azules, Retroiluminado RGB<",
    precio: "$149.900",
    imagen: "https://m.media-amazon.com/images/I/71W1pAhYSjL._AC_UF894,1000_QL80_.jpg",
    stock: 14
  },
  {
    nombre: "Moonitor 24",
    descripcion: "Full  HD, 75Hz, panel IP",
    precio: "$899.900",
    imagen: "https://lasmejorescompras.com/wp-content/uploads/2026/05/MONITOR-JANUS-IPS-24-GAMER-144HZ.jpg",
    stock: 10
  },
  {
    nombre: "Audífonos Bluethooth",
    descripcion: "Cancelación de ruido, 20h de batería",
    precio: "$199.900",
    imagen: "https://factorynet.cl/cdn/shop/files/Capturadepantalla2026-01-06ala_s_11.48.57a.m..png?v=1767711013&width=807",
    stock: 67
  },
  
  
]


function App() {
  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">
      <Navbar />
      <section className="grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-6 auto-rows-max">
        {propductos.map((p) =>(
          <ProductCard
          key={p.nombre}
          nombre={p.nombre}
          descripcion={p.descripcion}
          precio={p.precio}
          imagen={p.imagen}
          stock={p.stock}
          />
        ))}


      </section>

      <Footer />
    </main>
  )
}
export default App