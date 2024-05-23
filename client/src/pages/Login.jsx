import React, {useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

export function Login() {
    const [rut, setRut] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const submit = async (e) => {
      e.preventDefault();
      const user = {
        rut : rut,
        password: password
      }
      try {
        const {data} = await axios.post("http://localhost:8000/api/token/", user)
        
        // Storing Access in cookie
        Cookies.set('access_token', data.access);
        Cookies.set('refresh_token', data.refresh);
        navigate("/");
      }
      catch (error) {
        console.error("error in token fetch: ", error.message)
      }
    }
    
    return(
        <div className="Auth-form-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <form className="Auth-form" onSubmit={submit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Iniciar Sesión</h3>
              <div className="form-group mt-3">
                <label>Rut</label>
                <input className="form-control mt-1" 
                  placeholder="Ingresar Rut" 
                  name='rut'  
                  type='rut' value={rut}
                  required 
                  onChange={e => setRut(e.target.value)}/>
              </div>
              <div className="form-group mt-3">
                <label>Contraseña</label>
                <input name='password' 
                  type="password"     
                  className="form-control mt-1"
                  placeholder="Ingresar Contraseña"
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}/>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" 
                   className="btn btn-primary">Ingresar</button>
              </div>
            </div>
         </form>
       </div>
       )
};
