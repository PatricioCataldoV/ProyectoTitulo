import Layout from "../components/navigation/Layout"
import Navbar from "../components/navigation/Navbar"
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {useEffect} from 'react'
import { get_post } from "../redux/actions/posts/posts";
import { get_comment_list_post, get_comment_list_post_page } from "../redux/actions/comments/comments";
import moment from "moment";
import CommentList from "../components/comment/CommentList";
import FormComment from "../components/FormComment";

function PostDetail({
    get_post,
    get_comment_list_post,
    post,
    get_comment_list_post_page,
    comments,
    count,
    next,
    previous,
}){

    const params = useParams()
    const id = params.id
    
    useEffect(()=>{
        get_post(id),
        get_comment_list_post(id)
    },[])
    return( 
        <Layout>
            <Navbar/>
            <div className="pt-4">{
                post ?
                <div className="pt-24">
                    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
                        <p className="text-gray-300">{post.content}</p>
                        <div className="mt-4">
                            <img
                                className="h-full w-full object-cover rounded-lg"
                                src={post.img}
                                alt="Imagen Adjunta"
                            />
                        </div>
                        <div className="mt-4 text-gray-400 text-sm">
                            Fecha de Publicación : {moment(post.published).format('DD/MM/YY')}                        </div>
                        <div className="mt-3 flex justify-end">
                            <button
                                className="form-button rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                                type="submit"
                            >
                                Me Gusta
                            </button>
                        </div>
                    </div>
                    
                </div>
                :
                <>Loading</>
            }
            </div>
            <div className="pt-4">
                <FormComment route="/api/create_comment" id={id}/>
            </div>
            <div className="pt-4">
                <CommentList comments={comments&&comments} get_comment_list_post_page={get_comment_list_post_page} count={count&&count}/>
            </div>

        </Layout>
    )
}

const mapStateToProps=state=>({
    post: state.posts.post,
    comments: state.comments.comment_list_post,
    count: state.comments.count,
    next: state.comments.next,
    previous: state.comments.previous
})

export default connect(mapStateToProps, {
    get_post,
    get_comment_list_post,
    get_comment_list_post_page
})(PostDetail)