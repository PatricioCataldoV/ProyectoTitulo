import { useState } from "react";
import api from "../redux/api";

function FormComment({route}){
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")


    const handleSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();

        try{
            const res = await api.post(route, {content, image})
            navigate("/")
        }
        catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="mt-2 ml-7">
                        <input
                            type="text"
                            id="title"
                            className="form-input rounded-md bg-gray-700 text-white px-2 py-1"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Añade tu comentario..."
                            style={{ width: '400px' }}
                        />
                    </div>
                    <div className="mt-4 ml-7 flex justify-start">
                        <label htmlFor="img-upload" className="relative cursor-pointer rounded-md bg-gray-700 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span className="text-purple-400 mx-2 my-2">Añade una imagen a tu comentario</span>
                            <input
                                id="img-upload"
                                type="file"
                                className="sr-only"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="mt-3 flex justify-center">
                        <button
                            className="form-button rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                            type="submit"
                        >
                            Comentar
                        </button>
                    </div>
                </form>
            </div>
}
export default FormComment