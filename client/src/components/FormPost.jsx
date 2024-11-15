import { useState } from "react";
import api from "../redux/api";
import { useNavigate } from "react-router-dom";

function FormPost({tags}){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [selectTag, setSelectTag] = useState([])
    const [image, setImage] = useState("")
    const navigate = useNavigate()

    const createPost = (e) => {
        e.preventDefault();
        api
            .post("/api/create_post", { title,content, selectTag })
            .then((res) => {
                if (res.status === 201){
                    navigate("/")
                }
                else alert("Failed to make post.");
            })
            .catch((err) => alert(err));
    };


    return <form onSubmit={createPost} className="form-container">
        <div class="mt-30 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
                <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Título</label>
                <div class="mt-2">
                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="text"id="title" className="form-input" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="..." style={{ textIndent: '7px' }}/>
                    </div>
                </div>
            </div>
            <div class="sm:col-span-4">
                <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Etiquetas</label>
                <div class="mt-2">
                {tags ? (
                    tags.map(tag => (
                        <label key={tag.id} className="inline-flex items-center ml-3">
                            <input
                                type="checkbox"
                                name={tag.id}
                                checked={selectTag.includes(tag.id)}
                                onChange={() => {
                                    const updatedTags = selectTag.includes(tag.id)
                                        ? selectTag.filter(id => id !== tag.id)
                                        : [...selectTag, tag.id];
                                    setSelectTag(updatedTags);
                                }}
                                className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-gray-700">{tag.name}</span>
                        </label>
                    ))
                ) : (
                    <p>No se encontraron etiquetas disponibles...</p>
                )}
                </div>
            </div>
            
            <div class="col-span-full">
                <label for="content" class="block text-sm font-medium leading-6 text-gray-900">Texto Principal</label>
                <div class="mt-2">
                    <textarea id="content" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Cuerpo" style={{ textIndent: '7px' }}></textarea>
                </div>
            </div>
            <div class="col-span-full">
                <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Imagen</label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                    </svg>
                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                        <label for="img-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Sube tu imagen</span>
                        <input id="img-upload" type="file" class="sr-only" value={image} onChange={(e) => setImage(e.target.value)}/>
                        </label>
                    </div>
                    </div>
                </div>
            </div>
            <button className="form-button" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Publicar</button>
        </div>
    </form>
}

export default FormPost