import React, { useState, useEffect } from 'react'
import axios from 'axios';



function UpdateBlog(props) {


    const [title, setTitle] = useState('');
    const [updateTitle, setUpdateTitle] = useState('');
    const [content, setContent] = useState('');
    const [updateContent, setUpdateContent] = useState('');
    const [category, setCategory] = useState('general');
    const [updateCategory, setUpdateCategory] = useState('');

    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    useEffect(() => {
      axios.get(`http://localhost:8000/blogPage?blogID=${props.blogID}`).then(response => {
        let title = response.data.data.title;
        let content = response.data.data.content;
        let image = response.data.data.image;
        let video = response.data.data.video;

        setTitle(title)
        setContent(content)
        setImageUrl(image)
        setVideoUrl(video)

      }).catch(err => console.log(err))
    }, [])


    const handleUpdate = async (event) => {
      event.preventDefault();
  
      if (image && image.size > 15728640) {
  
        alert('image size may not larger than 15MB!')
        return;
      }
  
      if (video) {
        if (video.size > 15728640) {
  
          alert('image size may not larger than 15MB!')
          return;
        }
      }
  
      try {
  
  
        const formData = new FormData()
        
        formData.append('blogID', props.blogID)
        formData.append('title', updateTitle)
        formData.append('content', updateContent)
        formData.append('category', updateCategory)
        formData.append('image', image)
        formData.append('video', video)
  
        const response = await axios.patch('http://localhost:8000/updateBlog', formData, {
          withCredentials: true
        })
  
        // does not need response.json in axios
        if (response.status === 200) {
          const data = response;
          props.handleBlogID(props.blogID)
          props.handleTab('blogpage')
          console.log(data.data.message)
        } else {
          const data = response;
          console.log(data.data.message)
        }
      } catch (error) {
        console.error(error);
      }
    };

    function handleTitle(event){

      setTitle(event.target.value)
      setUpdateTitle(event.target.value)
    }

    function handleContent(event){

      setContent(event.target.value)
      setUpdateContent(event.target.value)
    }

    function handleCategory(event){

      setContent(event.target.value)
      setUpdateCategory(event.target.value)
    }


  return (
    <form className="flex flex-col mt-5 shadow-xl gap-3 w-[95vw] h-fit p-5 rounded" onSubmit={handleUpdate}>

    <div className="flex flex-col">
      <label htmlFor="title">Content Title</label>
      <input onChange={handleTitle} value={title} className='w-[90%] border border-gray-300 p-2 rounded' type="text" id="title" name="title" placeholder="Enter Title Here..." required />
    </div>

    <div className="flex flex-col">
      <label htmlFor="description">Content Description</label>
      <textarea onChange={handleContent} value={content} className='w-[90%] border border-gray-300 p-2 rounded' id="description" name="content" rows="3" placeholder="Enter Description Here..." required></textarea>
    </div>

    <div className="flex flex-col">
      <label htmlFor="category">Category:</label>
      <select onChange={handleCategory} value={category} id="category" name="category" className="w-60 border border-gray-300 p-2 rounded" required>
        <option value="general">General</option>
        <option value="sports">Sports</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="news">News</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="education">Education</option>
        <option value="business">Business</option>
      </select>
    </div>

    <img className="w-[50%] md:w-[30%] self-center rounded" src={imageUrl} alt={title} />

    <div className="flex flex-col">
      <label htmlFor="image">Image (Image size should be 15MB or lower)</label>
      <input onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/jpg, image/jpeg, image/png" name="image" id="image" />
    </div>

    {videoUrl && <video className='w-[50%] md:w-[30%] self-center rounded' controls src={videoUrl}></video>}

    <div className="flex flex-col">
      <label htmlFor="video">Video (optional) (Video size should be 15MB or lower)</label>
      <input onChange={(e) => setVideo(e.target.files[0])} type="file" accept="video/mp4" name="video" id="video" />
    </div>

    <button type="submit" className="mx-auto border border-orange-400 text-orange-400 rounded w-20 h-10 hover:bg-orange-400 hover:text-white active:shadow-md active:bg-orange-500">Update</button>
  </form>
  )
}

export default UpdateBlog