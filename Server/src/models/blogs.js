const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        title: String,
        description: String,
        img: String,
        category: String,
        time: String,
    }
)
module.exports = mongoose.model('blog', schema);