import {useEffect} from'react'

import moment from 'moment'
function CommentCard({data,index}){

    
    return(
        <li 
        >
            <div className="block transition duration-300 ease-in-out">
              <div className="flex items-center   my-10 ">
                <div className="lg:flex min-w-0 lg:flex-1 items-center">
                <div className="min-w-0 flex-1 px-8 p-4 ">
                    <p id={data.id} className="  leading-10 text-3xl pb-4 font-semibold transition duration-300 ease-in-out"></p>
                    <div className="">
                        <p className="mt-4 text-lg font-regular text-gray-800 leading-8">{data.content}</p>
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
            </div>
          </li>
    )
}
export default CommentCard