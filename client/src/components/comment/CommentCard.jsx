import {useEffect} from'react'
import ButtonLike from '../ButtonLike'

import moment from 'moment'
function CommentCard({data,index}){

    
    return(
      <li className="bg-gray-800 p-4 rounded-lg">
        <div className="items-center my-10 mx-auto" style={{ flex: 1 }}>
          <div className="flex flex-col px-8">
            <p className="mt-4 text-lg font-regular text-gray-100 leading-8">
              {data.content}
            </p>
            <span className="mt-3 ml-2 mr-1 font-medium text-gray-200 text-sm">
              Puntuación : {data.likes}
            </span>
            <span className="mt-7 ml-2 mr-1 font-medium text-gray-300 text-xs">
              Fecha de Publicación : {moment(data.published).format('DD/MM/YY')}
            </span>
          </div>
          <img className="h-full w-full object-cover" src={data.img} alt="" />
        </div>
        <div className="mt-3 flex justify-end">
          <ButtonLike method="comment" id={data.id} />
        </div>
      </li>
    )
}
export default CommentCard