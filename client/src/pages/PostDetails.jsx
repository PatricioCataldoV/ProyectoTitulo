import Layout from "../components/navigation/Layout"
import Navbar from "../components/navigation/Navbar"
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {useEffect} from 'react'
import { get_post } from "../redux/actions/posts/posts";
import { get_tags } from "../redux/actions/tags/tags";
import { get_comment_list_post, get_comment_list_post_page } from "../redux/actions/comments/comments";
import moment from "moment";
import CommentList from "../components/comment/CommentList";
import FormComment from "../components/FormComment";
import ButtonLike from "../components/ButtonLike";

function PostDetail({
    get_post,
    get_comment_list_post,
    get_tags,
    tags,
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
        get_tags(),
        get_comment_list_post(id)
    },[])
    return( 
        <Layout>
            <Navbar/>
            <div className="pt-4">{
                post && tags ?
                <div className="pt-24">
                    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
                        <p className="text-gray-300 mb-5">{post.content}</p>
                        {post.tags.map(tagId => {
                            const tag = tags.find(t => t.id === tagId);
                            return (
                                <span key={tagId} className="mx-2 text-gray-300" style={{ fontWeight: 'bold', border: '1px solid #ccc', padding: '4px', borderRadius: '6px' }}>
                                {tag ? tag.name : `Tag ${tagId}`}
                                </span>
                            );
                        })}
                        <div className="mt-4">
                            <img
                                className="h-full w-full object-cover rounded-lg"
                                src={post.img}
                                alt="Imagen Adjunta"
                            />
                        </div>
                        <div className="mt-4 text-gray-300">
                            Puntuación : {post.likes}
                        </div>
                        <div className="mt-4 text-gray-400 text-sm">
                            Fecha de Publicación : {moment(post.published).format('DD/MM/YY')}
                        </div>
                        <div className="mt-3 flex justify-end">
                            <ButtonLike method="post" id={post.id}/>
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
    tags: state.tags.tags,
    comments: state.comments.comment_list_post,
    count: state.comments.count,
    next: state.comments.next,
    previous: state.comments.previous
})

export default connect(mapStateToProps, {
    get_post,
    get_comment_list_post,
    get_tags,
    get_comment_list_post_page,
})(PostDetail)