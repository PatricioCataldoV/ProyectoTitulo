import Layout from "../components/navigation/Layout"
import Navbar from "../components/navigation/Navbar"

function PostList() {
    return( 
        <Layout>
            <Navbar/>
            <div data-scroll-section className="pt-28">
                PostList
            </div>
        </Layout>
    )
}

export default PostList