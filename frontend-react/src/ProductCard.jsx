function ProductCard(props) {

    return (
        <div className="flex flex-col gap-2 p-4 rounded-xl shadow-md bg-white">
            <img src={props.imagen} className="rounded-lg h-70 w-full object-cover" />
            <h3 className="font-bold text-lg">{props.nombre}</h3>
            <p className="text-texto-dim text-sm">{props.descripcion}</p>
            <p className="text-verde font-extrabold">{props.precio}</p>
            <p className="text-texto-dim text-xs"> Stock: {props.stock || 0} unidades</p>
        </div>
        
    )
}

export default ProductCard