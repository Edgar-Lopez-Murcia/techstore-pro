import { useState, useEffect } from "react"
import { Routes, Route} from 'react-router-dom'
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Contador from "./Contador.jsx";
import Home from "./Home.jsx";
import Productos from "./Productos.jsx";
import NotFound from "./NotFound.jsx";




function App() {
  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      
      <Contador />

      <Footer />
    </main>
  )
}
export default App