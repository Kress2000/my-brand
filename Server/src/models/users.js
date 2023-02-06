const mongoose = require('mongoose');
const user = mongoose.model("user",
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        location:{
            type: Object,
            required: true
        }
    }
)
module.exports = {user};