import { connect } from "react-redux"
import { Link, useNavigate, useLocation} from "react-router-dom"
import {useState} from "react"

function Navbar(){
    const location = useLocation()
    const navigate = useNavigate()

    const [term, setTerm] = useState("");
    const handleChange = (e) => {
        setTerm(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => navigate("/s=" + term), 0.2);
        setTerm("");
    };

    return(
        <nav className="w-full bg-gray-500 py-7 shadow-md fixed">
            <div className="px-4 sm:px-6">
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                        <Link to="/" className="text-lg font-medium leading-6 text-gray-900">Inicio</Link>
                    </div>
                    <div className="ml-4 mt-2">
                        <Link to="/publicar" className="text-lg font-medium leading-6 text-gray-900">Publicar</Link>
                    </div>
                    <div className="mt-2">
                        <form onSubmit={(e) => onSubmit(e)} className="relative col-span-3 mr-8">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <i className='bx bx-search-alt text-xl text-gray-800'></i>
                            </div>
                            <input
                                id='search'
                                name='search'
                                value={term}
                                onChange={(e)=>handleChange(e)}
                                type='search'
                                className={`
                                    py-2.5 pl-10 pr-3 
                                    block w-full rounded-md
                                    border border-gray-200
                                    focus:border-gray-200 focus:ring-gray-200
                                    focus:outline-none focus:ring-1
                                    placeholder-gray-600 focus:placeholder-gray-500
                                `}
                            />
                            
                        </form>
                    </div>
                    <div className="ml-4 mt-2 mr-4">
                        <Link to ="/profile" className="text-lg font-medium leading-6 text-gray-900">Perfil</Link>
                    </div>
                    <div className="ml-4 mt-2 mr-4">
                        <Link to ="/logout" className="text-lg font-medium leading-6 text-gray-900">Salir</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps,{

}) (Navbar)