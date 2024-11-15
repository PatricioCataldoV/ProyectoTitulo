import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import PrivateRoute from "./components/PrivateRoute"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Search from './pages/Search'
import PostDetails from './pages/PostDetails'
import PostByTag from './pages/PostByTag'
import CreatePost from './pages/CreatePost'
import UserPostList from './pages/UserPostList'
import Profile from './pages/Profile'

function Logout(){
    localStorage.clear()
    return <Navigate to="/login" />
}
  
function RegisterAndLogout(){
    localStorage.clear()
    return <Register />
}

function Rutas(){
    const location = useLocation()

    return(

    <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home/>
                </PrivateRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <PrivateRoute>
                  <PostDetails/>
                </PrivateRoute>
              }
            />
            <Route
              path="/s/:term"
              element={
                  <Search/>
              }
            />
            <Route
              path="/publicar"
              element={
                <PrivateRoute>
                  <CreatePost/>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile/>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/posts"
              element={
                <PrivateRoute>
                  <UserPostList/>
                </PrivateRoute>
              }
            />
            <Route
              path="/posts/by_tag/:id"
              element={
                <PrivateRoute>
                  <PostByTag/>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<RegisterAndLogout/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>

            )
}
export default Rutas