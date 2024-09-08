import React, {useState} from 'react'
import Login from './Login'
import SignUp from './SignUp'
import UploadForm from './UploadForm'
import MyBlogs from './MyBlogs'
import Home from './Home'
import BlogPage from './BlogPage'
import UpdateBlog from './UpdateBlog'
import MyProfile from './MyProfile'

function Body(props) {

  const [blogID,setBlogID] = useState(null);

  function handleBlogID(id){
    setBlogID(id)
  }

  return (
    <div className='flex h-[80vh] justify-center'>
        {props.tab==='login' && <Login handleTab={props.handleTab}/>}
        {props.tab==='signup' && <SignUp handleTab={props.handleTab}/>}
        {props.tab==='upload' && <UploadForm handleTab={props.handleTab}/>}
        {props.tab==='home' && <Home handleBlogID={handleBlogID} handleTab={props.handleTab}/>}
        {props.tab==='myprofile' && <MyProfile/>}
        {props.tab==='myblogs' && <MyBlogs handleBlogID={handleBlogID} handleTab={props.handleTab}/>}
        {props.tab==='blogpage' && <BlogPage blogID={blogID} handleTab={props.handleTab}/>}
        {props.tab==='updateblog' && <UpdateBlog blogID={blogID} handleTab={props.handleTab} handleBlogID={handleBlogID}/>}
        
    </div>
  )
}

export default Body