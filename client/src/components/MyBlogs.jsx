import React, { useState, useEffect } from "react";
import axios from 'axios';

function MyBlogs(props) {

    const [myBlogs, setMyBlogs] = useState(null)
    const [render, setRender] = useState(true)

    useEffect(() => {

        try {
            axios.get('http://localhost:8000/myBlogs', {
                withCredentials: true
            }).then(response => {
                if (response.status === 200) {
                    setMyBlogs(response.data.data)
                } else if (response.status === 500) {
                    alert(response.message)
                }
            })
        } catch (error) {
            console.log(error)
        }

    }, [render]);

    function handleDelete(id){

        axios.delete(`http://localhost:8000/deleteBlog?blogID=${id}`).then(response=>{

            setRender(!render)
        }).catch(error=>{
            console.log(error)
        });
    }

    function handleRead(id){

        props.handleBlogID(id)
        props.handleTab('blogpage')
    }

    function handleUpdate(id){
        props.handleBlogID(id)
        props.handleTab('updateblog')
    }

    return (
        <div className="flex flex-col mt-5 gap-10 p-5">
            {myBlogs && myBlogs.length !== 0 &&
                myBlogs.map(blog => (
                    <div key={blog.id} className="flex flex-col border w-80 shadow-md rounded p-4 md:w-[40vw]">
                        <img className="w-[100%] h-56" src={blog.image} alt={blog.title} />
                        {(blog.title.length >= 100 ? <div className="font-bold">{blog.title.slice(0, 100) + "..."}</div> : <div className="font-bold">{blog.title}</div>)}
                        {(blog.content.length >= 100 ? <div>{blog.content.slice(0, 100) + "..."}</div> : <div>{blog.content}</div>)}
                        <div className="flex mx-auto gap-3">
                            <button onClick={()=>handleUpdate(blog.id)} className="border border-orange-400 text-orange-400 rounded w-20 h-10 hover:bg-orange-400 hover:text-white active:shadow-md active:bg-orange-500">Update</button>
                            <button onClick={()=>handleRead(blog.id)} className="border border-green-700 text-green-700 rounded w-20 h-10 hover:bg-green-700 hover:text-white active:shadow-md active:bg-green-800">Read More</button>
                            <button onClick={()=>handleDelete(blog.id)} className="border border-red-600 text-red-600 rounded w-20 h-10 hover:bg-red-600 hover:text-white active:shadow-md active:bg-red-800">Delete</button>
                        </div>

                    </div>
                ))

            }
        </div>
    )
}

export default MyBlogs