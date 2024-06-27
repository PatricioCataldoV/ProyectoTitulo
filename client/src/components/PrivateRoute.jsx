import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../redux/api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

function PrivateRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
      auth().catch(() => setIsAuthorized(false))
    }, [])
    
   
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/api/token/refresh/", { //manda el token de refresh al backend para que se haga el refresh
                refresh: refreshToken,
            });
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access) //si lo logra autoriza al usuario
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false) //si no lo logra, no autoriza al usuario
            }
        } catch (error) {
            console.log(error);  // en caso de error, no autoriza al usuario
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN) //revisa si existe el token
        if (!token) { //si no existe el token, no autoriza al usuario
            setIsAuthorized(false)  
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() /1000

        if (tokenExpiration < now) { //revisa si ya expiro el token
            await refreshToken() //si ya expiro espera al refresh
        } else {
            setIsAuthorized(true) //si no expiro autoriza al usuario
        }
    }

    if (isAuthorized === null) {
        return <div>Cargando...</div>
    }

    return isAuthorized ? children : <Navigate to = "/login" /> // envia al usuario al link privado en caso de estar autorizado, si no lo manda al login
}

export default PrivateRoute

