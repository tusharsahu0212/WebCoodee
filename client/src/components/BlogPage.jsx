import React, { useEffect, useState } from 'react'
import axios from 'axios';

function BlogPage(props) {

  const [blog, setBlog] = useState({
    title: '',
    content: '',
    image: '',
    video: ''
  })


  useEffect(() => {

      axios.get(`http://localhost:8000/blogPage?blogID=${props.blogID}`).then(response => {
        let title = response.data.data.title;
        let content = response.data.data.content;
        let image = response.data.data.image;
        let video = response.data.data.video;

        setBlog({title,content,image,video})
      }).catch(err=>console.log(err))
  },[])


  return (
    
    <div className='flex flex-col border w-80 h-fit shadow-md mt-5 gap-3 rounded p-10 md:w-[40vw]'>
      <img className="w-[60%] self-center rounded" src={blog.image} alt={blog.title}/>
      <div className="font-bold">{blog.title}</div>
      <div>{blog.content}</div>
      {blog.video && <video className='w-[60%] self-center rounded' controls src={blog.video}></video>}
    </div>

  )
}

export default BlogPage