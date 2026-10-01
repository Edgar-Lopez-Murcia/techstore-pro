import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import ProductCard from "./ProductCard.jsx"

function App() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">
      <Navbar />
      <ProductCard />
      <Footer />
    </main>
  )
}
export default App