import React, { useState, useEffect } from "react";
import axios from 'axios';

function Home(props) {

    const [blogs,setBlogs] = useState(null)

    useEffect(() => {

        try {
            axios.get('http://localhost:8000/getallBlogs', {
                withCredentials: true
            }).then(response => {
                if (response.status === 200) {
                    setBlogs(response.data.data)
                } else if (response.status === 500) {
                    alert(response.message)
                }
            })
        } catch (error) {
            console.log(error)
        }

    }, []);

    function handleRead(id){

        props.handleBlogID(id)
        props.handleTab('blogpage')
    }

  return (
    <div className="flex flex-col mt-5 gap-10 p-5">
    {blogs && blogs.length !== 0 &&
        blogs.map(blog => (
            <div key={blog.id} className="flex flex-col border w-80 shadow-md rounded p-4 md:w-[40vw]">
                <img className="w-[100%] h-56" src={blog.image} alt={blog.title} />
                {(blog.title.length>=100 ? <div className="font-bold">{blog.title.slice(0, 100) + "..."}</div> : <div className="font-bold">{blog.title}</div>)}
                {(blog.content.length>=100 ? <div>{blog.content.slice(0, 100) + "..."}</div> : <div>{blog.content}</div>)}
                <button onClick={()=>handleRead(blog.id)} className="border border-green-700 text-green-700 rounded w-20 h-10 hover:bg-green-700 hover:text-white active:shadow-md active:bg-green-800 mx-auto">Read More</button>
            </div>
        ))

    }
</div>
  )
}

export default Home