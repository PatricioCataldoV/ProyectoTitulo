import { Link } from "react-router-dom"
import {useEffect} from'react'

import moment from 'moment'
function PostCard({data,index}){

    
    return(
        <li 
        >
            <Link to={`/post/${data.slug}`}
                onMouseEnter={()=>{
                    const title = document.getElementById(`title`+data.id)
                    title.classList.add('text-blue-500')
                }} 
                onMouseLeave={()=>{
                    const title = document.getElementById(`title`+data.id)
                    title.classList.remove('text-blue-500')
                }}
            className="block transition duration-300 ease-in-out">
              <div className="flex items-center   my-10 ">
                <div className="lg:flex min-w-0 lg:flex-1 items-center">
                  
                  <div className="min-w-0 flex-1 px-8 p-4 ">
                    <p id={`title`+data.id} className="  leading-10 text-3xl pb-4 font-semibold transition duration-300 ease-in-out">{data.title.length > 80 ? data.title.slice(0,79):data.title}</p>
                    <div className="">

                        <span className=" hover:text-orange-500  mx-1 font-medium text-gray-800 text-sm "><Link to={`/post/by_tag/${data.tags.slug}`}>{data.tags.name}</Link></span> <span className="text-gray-300">&middot;</span> 
                        <span className="mt-2 ml-2 mr-1 font-medium text-gray-800 text-sm">{moment(data.published).format('LL')}</span> <span className="text-gray-300">&middot;</span>
                        <p className="mt-4 text-lg font-regular text-gray-800 leading-8">{data.content.length > 150 ? data.content.slice(0,149):data.content}</p>
                    </div>
                    <img
                        className="h-full w-full object-cover"
                        src={data.img}
                        alt=""
                    />
                  </div>
                </div>
              </div>
            </Link>
          </li>
    )
}
export default PostCard