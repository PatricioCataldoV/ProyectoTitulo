import {useEffect} from'react'

import moment from 'moment'
function CommentCard({data,index}){

    
    return(
      <li className="bg-gray-800 p-4 rounded-lg">
        <div className="items-center my-10 mx-auto" style={{ flex: 1 }}>
          <div className="flex flex-col px-8">
            <p className="mt-4 text-lg font-regular text-gray-100 leading-8">
              {data.content}
            </p>
            <span className="mt-7 ml-2 mr-1 font-medium text-gray-300 text-xs">
              Fecha de Publicación : {moment(data.published).format('DD/MM/YY')}
            </span>
          </div>
          <img className="h-full w-full object-cover" src={data.img} alt="" />
        </div>
        <div className="mt-3 flex justify-end">
          <button
            className="form-button rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            type="submit"
          >
          Me Gusta
          </button>
        </div>
      </li>
    )
}
export default CommentCard