import { connect } from "react-redux"
import Layout from "../components/navigation/Layout"
import Navbar from "../components/navigation/Navbar"
import { useEffect } from "react"
import {
    get_author_post_list,
    get_author_post_list_page
} from "../redux/actions/posts/posts"
import PostList from "../components/posts/PostList"




function UserPostList({
    user_posts,
    count,
    next,
    previous,
    get_author_post_list,
    get_author_post_list_page
}) {

    useEffect(()=>{
        get_author_post_list()
    },[])

    return( 
        <Layout>
            <Navbar/>
            <div className="pt-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl my-10">
                    <div className="ml-4 mb-4 p-4 border rounded-lg shadow-md text-xl font-extrabold leading-none tracking-tight text-gray-900 inline-block">Lista de publicaciones del usuario</div>
                        <PostList posts={user_posts&&user_posts} get_author_post_list_page={get_author_post_list_page} count={count&&count}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps=state=>({
    user_posts: state.posts.author_post_list,
    count: state.posts.count,
    next: state.posts.next,
    previous: state.posts.previous
})

export default connect(mapStateToProps,{
    get_author_post_list,
    get_author_post_list_page
})(UserPostList)