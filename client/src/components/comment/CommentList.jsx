import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon } from "@heroicons/react/20/solid"
import SmallSetPagination from "../pagination/SmallSetPagination"
import CommentCard from "./CommentCard"

function CommentList({comments,get_comment_list_post_page,count}){

    return(
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
      <ul role="list" className="divide-y space-y-8 gap-8  divide-gray-400">
        {comments&&comments.map((comment,index) => (
          <CommentCard data={comment} key={index} index={index}/>
        ))}
      </ul>
      <SmallSetPagination list_page={get_comment_list_post_page} list={comments} count={count} />
    </div>
    )
}
export default CommentList