import SmallSetPaginationSearch from "./SmallSetPaginationSearch"
import PostCard from "../PostCard"

function PostList({posts,get_post_list_page,count, term}){

    return(
    <div className="overflow-hidden px-8 bg-white">
      <ul role="list" className="divide-y space-y-8 gap-8  divide-gray-200">
        {posts&&posts.map((post,index) => (
          <PostCard data={post} key={index} index={index}/>
        ))}
      </ul>
      <SmallSetPaginationSearch list_page={get_post_list_page} term={term} list={posts} count={count} />
    </div>
    )
}
export default PostList