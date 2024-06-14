import Layout from "../components/navigation/Layout"
import Navbar from "../components/navigation/Navbar"
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {useEffect} from 'react'
import { get_post } from "../redux/actions/posts/posts";
import { get_comment_list_post } from "../redux/actions/comments/comments";
import moment from "moment";
import CommentList from "../components/comment/CommentList";

function PostDetail({
    get_post,
    get_comment_list_post,
    post,
    comments,
}){

    const params = useParams()
    const slug = params.slug
    
    useEffect(()=>{
        get_post(slug),
        get_comment_list_post(slug)
    },[])
    return( 
        <Layout>
            <Navbar/>
            {
                post && post.slug === slug ?
                <div className="pt-24">
                <div className="relative bg-gray-200">
                <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gray-200 mix-blend-multiply" aria-hidden="true" />
                </div>
                <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">{post.title}</h1>
                <div className="min-w-0 flex-1 p-4 pt-8">
                    <div className="">
                        <span className="mt-2 ml-2 mr-1 font-medium text-gray-800 text-sm">{moment(post.published).format('LL')}</span> <span className="text-gray-300">&middot;</span>
                        <p className="mt-4 text-lg font-regular text-gray-800 leading-8">{post.content}</p>
                    </div>
                </div>
                <div className="min-w-0 flex-1 p-4 pt-8">
                <img
                        className="h-full w-full object-cover"
                        src={post.img}
                        alt=""
                />
                </div>
                </div>
                </div>
                </div>
                :
                <>Loading</>
            }
            <div className="pt-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl my-10">
                        <CommentList comments={comments&&comments}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps=state=>({
    post: state.posts.post,
    comment_list_post: state.comments.comments,
})

export default connect(mapStateToProps, {
    get_post,
    get_comment_list_post
})(PostDetail)