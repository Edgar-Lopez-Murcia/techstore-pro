import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";


function useEnviar() {
    const { logout } = useContext(AuthContext);
    const navegar = useNavigate();
    const ubicacion = useLocation();

    async function enviar(ruta, cuerpo) {
        const respuesta = await fetch("http://localhost:3000" + ruta, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(cuerpo),
        });

        if (respuesta.status === 401 || respuesta.status === 403) {
        logout();
        navegar("/login", {
            state: {
            aviso: "Tu sesión terminó. Ingresa de nuevo para continuar",
            desde: ubicacion.pathname,
            },
        });
        return null;
        }

        const datos = await respuesta.json();
        return { ok: respuesta.ok, datos };
    }

    return enviar;
}

export default useEnviar;