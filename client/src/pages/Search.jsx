import { connect } from "react-redux"
import Layout from "../components/navigation/Layout"
import Navbar from "../components/navigation/Navbar"
import tags from "../redux/reducers/tags"
import { useEffect } from "react"
import { get_tags } from "../redux/actions/tags/tags"
import posts from "../redux/reducers/posts"
import {
    get_post_list,
    get_post_list_page,
    search_post,
    search_post_page
} from "../redux/actions/posts/posts"
import PostList from "../components/posts/search/PostList"
import { useParams } from "react-router-dom";




function Search({
    get_tags,
    tags,
    posts,
    count,
    next,
    previous,
    search_post,
    search_post_page,
    get_post_list,
    get_post_list_page
}) {

    const params = useParams()
    const term = params.term

    useEffect(()=>{
        search_post(term)
    },[])

    return( 
        <Layout>
            <Navbar/>
            <div className="pt-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl my-10">
                        <PostList posts={posts&&posts} get_blog_list_page={search_post_page} term={term} count={count&&count}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps=state=>({
    tags: state.tags.tags,
    posts: state.posts.filtered_posts,
    count: state.posts.count,
    next: state.posts.next,
    previous: state.posts.previous
})

export default connect(mapStateToProps,{
    search_post,
    search_post_page
})(Search)