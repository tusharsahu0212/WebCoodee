import React, { useState } from 'react'
import axios from 'axios';

function UploadForm(props) {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (image.size > 15728640) {

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
      formData.append('title', title)
      formData.append('content', description)
      formData.append('category', category)
      formData.append('image', image)
      formData.append('video', video)

      const response = await axios.post('http://localhost:8000/upload', formData, {
        withCredentials: true
      })

      // does not need response.json in axios
      if (response.status === 200) {
        const data = response;
        props.handleTab("myblogs")
        console.log(data.message)
      } else {
        const data = response;
        console.log(data.message)
      }
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <form className="flex flex-col mt-5 shadow-xl gap-3 w-[95vw] p-5 rounded" onSubmit={handleSubmit}>

      <div className="flex flex-col">
        <label htmlFor="title">Content Title</label>
        <input onChange={(e) => setTitle(e.target.value)} className='w-[90%] border border-gray-300 p-2 rounded' type="text" id="title" name="title" placeholder="Enter Title Here..." required />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description">Content Description</label>
        <textarea onChange={(e) => setDescription(e.target.value)} className='w-[90%] border border-gray-300 p-2 rounded' id="description" name="content" rows="3" placeholder="Enter Description Here..." required></textarea>
      </div>

      <div className="flex flex-col">
        <label htmlFor="category">Category:</label>
        <select onChange={(e) => setCategory(e.target.value)} id="category" name="category" className="w-60 border border-gray-300 p-2 rounded" required>
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

      <div className="flex flex-col">
        <label htmlFor="image">Image (Image size should be 15MB or lower)</label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/jpg, image/jpeg, image/png" name="image" id="image" required />
      </div>

      <div className="flex flex-col">
        <label htmlFor="video">Video (optional) (Video size should be 15MB or lower)</label>
        <input onChange={(e) => setVideo(e.target.files[0])} type="file" accept="video/mp4" name="video" id="video" />
      </div>

      <button type="submit" className='self-center border border-green-700 text-green-700 rounded w-20 h-10 hover:bg-green-700 hover:text-white active:shadow-md active:bg-green-800'>Upload</button>
    </form>
  )
}

export default UploadForm