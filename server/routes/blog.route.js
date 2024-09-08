const multer = require("multer");
const {uploadBlog, getAllBlogs, getMyBlogs, updateBlog, blogPage, deleteBlog} = require("../controllers/blog.controller");

const upload = multer({
    limits: 15 * 1024 * 1024
});

const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }])

module.exports = (app) => {

    // create
    app.post('/upload', cpUpload, uploadBlog);

    //read
    app.get('/getallBlogs', getAllBlogs);

    //My Blogs
    app.get('/myBlogs', getMyBlogs);

    // update
    app.patch('/updateBlog', cpUpload, updateBlog);

    //Blog Page
    app.get('/blogPage', blogPage);

    // delete
    app.delete('/deleteBlog', deleteBlog)

};