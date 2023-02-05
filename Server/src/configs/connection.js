const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectToDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        strictQuery: false
    })
    console.log("connected successfully at : ", conn.connection.host)
}catch(err){
    console.log(err);
    process.exit(1);

}
    
    
}
module.exports = connectToDb;