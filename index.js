const express = require('express');
const route  = require('./routes');
const app=express();
const cookieParser=require('cookie-parser');
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

app.use(express.static('./assets'));
app.use(expressLayouts);

app.use(express.urlencoded());
app.use(cookieParser());

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//setup default route 
app.use('/',require('./routes/index'));

//set up view engine and set path views
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error :${err}`); // interpolation  
    }
    console.log(`Server is running on port :${port}`);
})