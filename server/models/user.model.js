const mongoose = require('mongoose');
const blogSchema = require('./blog.model')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = userSchema;