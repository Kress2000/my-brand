const mongoose = require('mongoose');
const blog =  mongoose.model("blogs",
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        comments: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            required: true
        }
    }
)
module.exports = {blog};
