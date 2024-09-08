const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        require: true
    },
    video: Buffer
});

module.exports = blogSchema;