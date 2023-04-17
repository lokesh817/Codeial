//require mongoose
const mongoose=require('mongoose');

//connect with url
mongoose.connect('mongodb://127.0.0.1:27017/codieal_development');

//get connection into a variable to check connection
const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in connnection"));

db.once('open',function(){
    console.log("connected to database :: mongoDB");
})
module.exports=db;