//library used
const express = require('express');
const route  = require('./routes');
const cookieParser=require('cookie-parser');
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');

const app=express();
//middleware used
app.use(express.static('./assets'));
app.use(expressLayouts);

app.use(express.urlencoded());
app.use(cookieParser());

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up view engine and set path views
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie :
    {
        maxAge:(1000 * 60 * 100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//setup default route 
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error :${err}`); // interpolation  
    }
    console.log(`Server is running on port :${port}`);
})