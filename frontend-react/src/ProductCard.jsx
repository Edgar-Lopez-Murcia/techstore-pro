import React from "react";
import { CardContainer, CardBody, CardItem } from "./components/Card3D";

function ProductCard(props) {
    return (
        // Añadimos p-3 para crear la separación limpia entre cada caja del catálogo
        <CardContainer containerClassName="p-3">
            
            {/* 
                Contenedor principal con tus clases estéticas originales,
                ajustado a un ancho máximo compacto (max-w-xs)
            */}
            <CardBody className="flex flex-col gap-2 p-4 rounded-xl shadow-md bg-white border border-neutral-100 max-w-xs w-full h-full justify-between">
                
                {/* Imagen del producto (Reducida a h-48 para mantener todo dentro de la tarjeta) */}
                <CardItem translateZ="50" className="w-full">
                    <img 
                        src={props.imagen} 
                        className="rounded-lg h-48 w-full object-cover shadow-sm" 
                        alt={props.nombre}
                    />
                </CardItem>

                {/* Contenedor interno para organizar los textos */}
                <div className="flex flex-col gap-1 flex-grow">
                    {/* Título del producto */}
                    <CardItem 
                        as="h3" 
                        translateZ="30" 
                        className="font-bold text-base text-neutral-800 mt-1 line-clamp-1"
                    >
                        {props.icono} {props.nombre}
                    </CardItem>

                    {/* Descripción del producto (Cambiado min-h-[2rem] por min-h-8) */}
                    <CardItem 
                        as="p" 
                        translateZ="20" 
                        className="text-neutral-500 text-xs line-clamp-2 min-h-8"
                    >
                        {props.descripcion}
                    </CardItem>
                </div>

                {/* Sección inferior perfectamente alineada para el precio y el botón */}
                <CardItem translateZ="40" className="w-full flex justify-between items-center mt-2 pt-2 border-t border-neutral-50">
                    {/* Tu precio original en verde y negrita */}
                    <span className="text-green-600 font-extrabold text-base">
                        {props.precio}
                    </span>
                    
                    {/* Tu botón original de Ver más */}
                    <button className="px-3 py-1 rounded-lg bg-black text-white text-[11px] font-bold hover:bg-neutral-800 transition-colors">
                        Ver más
                    </button>
                </CardItem>

            </CardBody>
        </CardContainer>
    );
}

export default ProductCard;


