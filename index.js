const express=require('express');
const  route  = require('./routes');
const app=express();
const port=8000;

//setup default route 
app.use('/',require('./routes/index'));

//set up view engine and set path views
app.use('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error :${err}`); // interpolation  
    }
    console.log(`Server is running on port :${port}`);
})