import { connect } from "react-redux"
import Layout from "../components/navigation/Layout"
import Navbar from "../components/navigation/Navbar"
import { useEffect } from "react"
import { get_tags } from "../redux/actions/tags/tags"
import {
    get_post_list_tag,
    get_post_list_tag_page
} from "../redux/actions/posts/posts"
import PostList from "../components/posts/PostList"
import SideBar from "../components/navigation/SideBar"
import { useParams } from "react-router-dom";


function PostByTag({
    get_tags,
    tags,
    posts,
    count,
    next,
    previous,
    get_post_list_tag,
    get_post_list_tag_page
}) {

    const params = useParams()
    const id = params.id

    useEffect(()=>{
        get_tags(),
        get_post_list_tag(id)
    },[id])

    return( 
        <Layout>
            <Navbar/>
            <div className="pt-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
                    <div className="w-1/5">
                        <SideBar/>
                    </div>
                    <div className="mx-auto w-4/5 my-10">
                    <div className="ml-4 mb-4 p-4 border rounded-lg shadow-md text-xl font-extrabold leading-none tracking-tight text-gray-900 inline-block">Filtrando por Etiqueta</div>
                        <PostList posts={posts&&posts} get_post_list_tag_page={get_post_list_tag_page} count={count&&count}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps=state=>({
    tags: state.tags.tags,
    posts: state.posts.post_list_tag,
    count: state.posts.count,
    next: state.posts.next,
    previous: state.posts.previous
})

export default connect(mapStateToProps,{
    get_tags,
    get_post_list_tag,
    get_post_list_tag_page
})(PostByTag)