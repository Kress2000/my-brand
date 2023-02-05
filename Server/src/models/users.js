const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        location: Object,
    }
)
module.exports = mongoose.model('user', schema);