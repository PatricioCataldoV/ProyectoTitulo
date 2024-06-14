import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon } from "@heroicons/react/20/solid"
import CommentCard from "./CommentCard"

function CommentList({comments}){

    return(
    <div className="overflow-hidden px-8 bg-white">
      <ul role="list" className="divide-y space-y-8 gap-8  divide-gray-200">
        {comments&&comments.map((comment,index) => (
          <CommentCard data={comment} key={index} index={index}/>
        ))}
      </ul>
    </div>
    )
}
export default CommentList