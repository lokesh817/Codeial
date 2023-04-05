const express=require('express');
const  route  = require('./routes');
const app=express();
const port=8000;


app.use('/',require('./routes/index'))



app.listen(port,function(err){
    if(err){
        console.log(`Error :${err}`); // interpolation  
    }
    console.log(`Server is running on port :${port}`);
})