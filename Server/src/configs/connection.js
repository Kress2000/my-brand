const mongoose = require('mongoose');
const url = 'mongodb+srv://my-brand:kress123@cluster0.638azsu.mongodb.net/my-brand';
const connectToDb = async ()=>{
    try{
        const conn = await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("connected successfully at : ", conn.connection.host)
}catch(err){
    console.log(err);
    process.exit(1);
}
}
module.exports = connectToDb;
