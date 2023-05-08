const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy.js');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customeMiddleware = require('./config/flashMiddleware');
const passportGoogleOAuth = require('./config/passport-google-oauth2-strategy');

app.use(sassMiddleware({
    src: './assets/SCSS',
    dest: './assets/CSS',
    debug:true,
    outputStyle:'extended',
    prefix:'/CSS'
}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
//static path should be available publically
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        { 
            mongoUrl: 'mongodb://127.0.0.1:27017/codieal_development',
            autoRemove:'disabled'
        },function(err){
        console.log(err || 'connected to mongo db');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customeMiddleware.setFlash);
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
