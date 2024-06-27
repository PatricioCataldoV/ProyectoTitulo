import { connect } from "react-redux"
import Layout from "../components/navigation/Layout"
import Navbar from "../components/navigation/Navbar"
import { useEffect } from "react"
import FormPost from "../components/FormPost"
import { get_tags } from "../redux/actions/tags/tags"





function CreatePost({
    get_tags,
    tags,
}) {

    useEffect(()=>{
        get_tags()
    },[])

    return( 
        <Layout>
            <Navbar/>
            <div className="pt-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl my-10">
                        <FormPost tags={tags}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps=state=>({
    tags: state.tags.tags,
})

export default connect(mapStateToProps,{
    get_tags,
})(CreatePost)