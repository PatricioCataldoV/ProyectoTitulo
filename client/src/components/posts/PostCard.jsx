import { Link } from "react-router-dom"
import {useEffect} from'react'

import moment from 'moment'
function PostCard({data,index}){

    
    return(
      <li className="mb-8">
        <Link
          to={`/post/${data.id}`}
          onMouseEnter={() => {
            const title = document.getElementById(`title${data.id}`);
            title.classList.add('text-purple-500');
          }}
          onMouseLeave={() => {
            const title = document.getElementById(`title${data.id}`);
            title.classList.remove('text-purple-500');
          }}
          className="block transition duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <div className="lg:flex min-w-0 lg:flex-1 items-center">
              <div className="min-w-0 flex-1 px-4 py-2">
                <p
                  id={`title${data.id}`}
                  className="leading-10 text-2xl font-semibold pb-2 transition duration-300 ease-in-out"
                >
                  {data.title.length > 80 ? data.title.slice(0, 79) : data.title}
                </p>
                <div>
                  <p className="mt-2 text-gray-900 leading-7">
                    {data.content.length > 150
                      ? data.content.slice(0, 149)
                      : data.content}
                  </p>
                </div>
                <div className="mt-3 ml-1 font-medium text-gray-700 text-m">
                  Puntuación: {data.likes}
                </div>
                <span className="mt-3 ml-1 font-medium text-gray-500 text-sm">
                  Fecha de publicación: {moment(data.published).format('DD/MM/YY')}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </li>
    )
}
export default PostCard