import { connect } from "react-redux"
import Layout from "../components/navigation/Layout"
import Navbar from "../components/navigation/Navbar"
import { useEffect } from "react"
import { get_profile } from "../redux/actions/profile/profile"


function Profile({
    get_profile,
    profile
}) {

    useEffect(()=>{
        get_profile()
    },[])

    return( 
        <Layout>
            <Navbar/>
            <div>{profile ? (

            
                <div data-scroll-section className="pt-28">
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <img className="h-50 w-50 rounded-full" src={profile.image} alt="Foto de perfil" />
                        </div>
                        <div className="sm:col-span-1">
                            <h1 className="text-2xl font-semibold text-gray-800">Nombre Completo:</h1>
                            <p className="text-lg text-gray-600 mt-3">{profile.username}</p>
                            <h1 className="text-2xl font-semibold text-gray-800 mt-3">RUT:</h1>
                            <p className="text-lg text-gray-600 mt-3">{profile.rut}</p>
                            <h1 className="text-2xl font-semibold text-gray-800 mt-3">Correo Electrónico:</h1>
                            <p className="text-lg text-gray-600 mt-3">{profile.email}</p>
                            <h1 className="text-2xl font-semibold text-gray-800 mt-3">Nivel:</h1>
                            <p className="text-lg text-gray-600 mt-3">{profile.level}</p>
                            <h1 className="text-2xl font-semibold text-gray-800 mt-3">Experiencia:</h1>
                            <p className="text-lg text-gray-600 mt-3">{profile.exp}/100</p>
                        </div>
                    </div>
                </div>
                ) : (
                    <div>Cargando. Por favor espere...</div>
                )}
                {profile && (
                    <div className="flex justify-end mt-3">
                        <button className="form-button bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mr-7 rounded">
                            Historial de Publicaciones
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    )
}

const mapStateToProps=state=>({
    profile: state.profile.profile
})

export default connect(mapStateToProps,{
    get_profile
})(Profile)