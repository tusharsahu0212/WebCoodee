
const blogSchema = require("../models/blog.model")
const userSchema = require("../models/user.model")
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const Blog = mongoose.model('Blog', blogSchema);
const User = mongoose.model('User', userSchema);

//create
uploadBlog = async (req, res) => {

    // console.log(req.body)
    try {

        const decoded = jwt.verify(req.cookies['ACCESS_TOKEN'], process.env.ACCESS_TOKEN_SECRET);

        let imageBuffer = null;
        let videoBuffer = null;

        if (req.files['image']) {
            imageBuffer = await req.files['image'][0].buffer;
        }

        if (req.files['video']) {
            videoBuffer = await req.files['video'][0].buffer;
        }

        const newBlog = new Blog({
            username: decoded.username,
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: imageBuffer,
            video: videoBuffer
        })

        imageSaveError = null
        videoSaveError = null

        if (imageBuffer) {
            try {
                await fs.promises.writeFile(`public/media/image/${newBlog._id}.jpg`, imageBuffer);
            } catch (err) {
                console.error(err);
                imageSaveError = err;
            }
        }

        if (videoBuffer) {
            try {
                await fs.promises.writeFile(`public/media/video/${newBlog._id}.mp4`, videoBuffer);
            } catch (err) {
                console.error(err);
                videoSaveError = err;
            }
        }



        if (imageSaveError) {
            return res.status(500).json({ message: 'Error saving image file' });
        } else if (videoSaveError) {
            return res.status(500).json({ message: 'Error saving video file' });
        } else {
            await newBlog.save();
            return res.status(200).json({ message: "Blog uploaded Successfully" });
        }



    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


//read
getAllBlogs = (req, res) => {

    Blog.find().then((data, err) => {

        if (err) {
            return res.status(500).json({ message: err });
        } else {
            newData = data.map(e => {

                let id = e._id.toString()
                let title = e.title
                let content = e.content
                let category = e.category
                let image = null
                let video = null

                if (e.image) {
                    image = `http://localhost:8000/media/image/${e._id}.jpg`
                }

                if (e.video) {
                    video = `http://localhost:8000/media/video/${e._id}.mp4`
                }

                return { id, title, content, category, image, video }
            })

            // res.set('Cache-Control', 'no-cache');
            return res.status(200).json({ data: newData });
        }
    });

}


getMyBlogs = (req, res) => {

    try {
        const decoded = jwt.verify(req.cookies['ACCESS_TOKEN'], process.env.ACCESS_TOKEN_SECRET);

        Blog.find({ username: decoded.username }).then((data, err) => {

            if (err) {
                return res.status(500).json({ message: err });
            } else {
                newData = data.map(e => {

                    let id = e._id.toString()
                    let title = e.title
                    let content = e.content
                    let category = e.category
                    let image = null
                    let video = null

                    if (e.image) {
                        image = `http://localhost:8000/media/image/${e._id}.jpg`
                    }

                    if (e.video) {
                        video = `http://localhost:8000/media/video/${e._id}.mp4`
                    }

                    return { id, title, content, category, image, video }
                })

                // res.set('Cache-Control', 'no-cache');
                return res.status(200).json({ data: newData });
            }

        });
    } catch (err) {
        return res.status(500).json({ message: err });
    }

}

//update
updateBlog = async (req, res) => {

    try {
        const decoded = jwt.verify(req.cookies['ACCESS_TOKEN'], process.env.ACCESS_TOKEN_SECRET);

        upadateObj = {}


        let imageBuffer = null;
        let videoBuffer = null;



        if (req.files.image) {
            imageBuffer = await req.files['image'][0].buffer;
        }

        if (req.files.video) {
            videoBuffer = await req.files['video'][0].buffer;
        }


        if(imageBuffer){
            // deleteFile(`public/media/image/${req.body.blogID}.jpg`)
            fs.writeFileSync(`public/media/image/${req.body.blogID}.jpg`, imageBuffer, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error saving file' });
                }
    
    
            });

            upadateObj['image'] = imageBuffer 
        }


        if (videoBuffer) {
            // deleteFile(`public/media/video/${req.body.blogID}.mp4`)
            fs.writeFileSync(`public/media/video/${req.body.blogID}.mp4`, videoBuffer, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error saving file' });
                }
            });

            upadateObj['video'] = videoBuffer
        }

        if(req.body.title){
            upadateObj['title'] = req.body.title
        }

        if(req.body.content){
            upadateObj['content'] = req.body.content
        }

        if(req.body.category){
            upadateObj['category'] = req.body.category
        }

        // console.log(upadateObj)
        Blog.updateOne({ _id: req.body.blogID }, upadateObj).then((data) => {

            // res.set('Cache-Control', 'no-cache');
            return res.status(200).json({ message: "Blog updated" });

        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message });
    }

}

// blog page
blogPage = (req, res) => {

    Blog.findOne({ _id: req.query.blogID }).then((data) => {

        let title = data.title
        let content = data.content
        let category = data.category
        let image = null
        let video = null

        if (data.image) {
            image = `http://localhost:8000/media/image/${data._id}.jpg`
        }

        if (data.video) {
            video = `http://localhost:8000/media/video/${data._id}.mp4`
        }

        let newData = { title, content, category, image, video };
        return res.status(200).json({ data: newData });
    });

}

function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted successfully:',
            filePath);
    });
}

//delete blog
deleteBlog = (req, res) => {

    Blog.findOneAndDelete({ _id: req.query.blogID }).then(data => {

        if (data.image) deleteFile(`public/media/image/${data._id}.jpg`)
        if (data.video) deleteFile(`public/media/video/${data._id}.mp4`)
        return res.status(200).json({ message: 'Blog removed' });

    }).catch(err => {
        return res.status(500).json({ message: err });
    });
}

module.exports = {
    uploadBlog, getAllBlogs, getMyBlogs, updateBlog, blogPage, deleteBlog
};