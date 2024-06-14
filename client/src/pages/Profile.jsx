import Layout from "../components/navigation/Layout"
import Navbar from "../components/navigation/Navbar"

function Profile() {
    return( 
        <Layout>
            <Navbar/>
            <div data-scroll-section className="pt-28">
                Profile
            </div>
        </Layout>
    )
}

export default Profile