import { useState } from "react";
import api from "../redux/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { validateRut } from '@fdograph/rut-utilities';
import { Link } from 'react-router-dom';
 

function Form({route, method}) {
    const [username, setusername] = useState("")
    const [rut, setRut] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [isValidRut, setIsValidRut] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate()

    const validarRut = (input) => {
        const rutValue = input.value;
        setIsValidRut(validateRut(rutValue));
    };

    const validatePassword = (input) => {
        const passwordValue = input.value;
        const isValidPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/.test(passwordValue);
        setIsValid(isValidPassword);
    };
    
    const handleSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();

        try{
            if (method === "login") {
               const res = await api.post(route, {rut, password})
               localStorage.setItem(ACCESS_TOKEN, res.data.access);
               localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
               navigate("/")
            } else {
                const res = await api.post(route, {username, rut, email, password})
                navigate("/login")
            }
        }
        catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    if (method === "register"){
        return <form onSubmit={handleSubmit} className="form-container">
                    <div class="text-center mb-4">
                        <h1>Registrate</h1>
                    </div>
                    <div class="text-center mt-2">
                        <label htmlFor="usernameInput">Ingresa tu Nombre Completo:</label>
                    </div>
                    <div class="mt-2 flex justify-center">
                    <input
                        className="form-input"
                        id="usernameInput"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-3/4 py-2 px-4 mt-4 ml-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"                        
                        type="text"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        placeholder="Nombre Completo"
                        required
                    />
                    </div>
                    <div class="text-center mt-2">
                        <label htmlFor="rutInput">Ingresa tu RUT:</label>
                    </div>
                    <div class="mt-2 flex justify-center">
                    <input
                        className="form-input"
                        id="rutInput"
                        type="text"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-3/4 py-2 px-4 mt-4 ml-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"                        
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        onBlur={(e) => validarRut(e.target)}
                        placeholder="Ej: 12345678-9"
                        required
                    />
                    {!isValidRut && <span style={{ color: 'red' }}>RUT inválido</span>}
                    </div>
                    <div class="text-center mt-2">
                        <label htmlFor="emailInput">Ingresa tu correo electrónico:</label>
                    </div>
                    <div class="mt-2 flex justify-center">
                    <input
                        className="form-input"
                        id="emailInput"
                        type="email"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-3/4 py-2 px-4 mt-4 ml-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"                        
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ej: correo@mail.com"
                        required
                    />
                    </div>
                    <div class="text-center mt-2">
                        <label htmlFor="passwordInput">Ingresa tu contraseña:</label>
                    </div>
                    <div class="mt-2 flex justify-center">
                    <input
                        className="form-input"
                        type="password"
                        id="passwordInput"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-3/4 py-2 px-4 mt-4 ml-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"                        
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) => validatePassword(e.target)}
                        placeholder="...."
                        required
                    />
                    {!isValid && <span style={{ color: 'red' }}>
                        La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula y un número.
                    </span>}
                    </div>
                    <div class="flex justify-center mt-4">
                        <button className="form-button" class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" disabled={!(isValidRut && isValid)}>Enviar</button>
                    </div>
                    <div class="flex justify-center mt-4">
                        <p className="mb-5 pb-lg-2" style={{ color: "#202020" }}>
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login" style={{ color: "#7882F0" }}>
                                Ingresa ahora
                            </Link>
                        </p>
                    </div>
                </form>
    } else {
        return <form onSubmit={handleSubmit} className="form-container">
            <div class="text-center mt-2">
                <h1>Iniciar Sesión</h1>
            </div>
            <div class="text-center mt-2">
                <label htmlFor="rutInput">Ingresa tu RUT:</label>            
            </div>
            <div class="mt-2 flex justify-center">
                <input
                    className="form-input"
                    id="rutInput"
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"               
                    type="text"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    placeholder="Ej: 12345678-9"
                    required
                />
            </div>
            
            {!isValidRut && <span style={{ color: 'red' }}>RUT inválido</span>}
            <div class="text-center mt-2">
                <label htmlFor="passwordInput">Ingresa tu contraseña:</label>
            </div>
            <div class="mt-2 flex justify-center">
                <input
                    className="form-input"
                    id="passwordInput"
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"               
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="..."
                    required
                />
            </div>
            <div class="flex justify-center mt-4">
                <button className="form-button" class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" disabled={!isValidRut}>Ingresar</button>
            </div>
            <div class="flex justify-center mt-4">
                <p className="mb-5 pb-lg-2" style={{ color: "#202020" }}>
                    ¿No te has registrado?{" "}
                    <Link to="/register" style={{ color: "#7882F0" }}>
                        Registrate ahora 
                    </Link>
                </p>
            </div>
        </form>
    }
}

export default Form

