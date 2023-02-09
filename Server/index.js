require('dotenv').config();
const connectToDb = require('./src/configs/connection');
const express = require('express');
const router = require('./src/routes/routers');
const app=express();
app.use(express.json());
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
//port
const PORT = process.env.PORT || 3000;

// After you declare "app"
app.use(session({ secret: 'melody hensley is my spirit animal' }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secrete' 
  }));
app.use(passport.initialize())
app.use(passport.session())
// Passport Config
require('./src/configs/passport')(passport);
//middlewares
// app.use('/css', express.static(__dirname + '/UI'));
// app.use('/js', express.static(__dirname + '/UI'));
// app.use('/img', express.static(__dirname + '/UI'));
// app.use('/pages', express.static(__dirname + '/UI'));
// //set static engines

app.use(expressLayouts)
app.set('view engine', 'ejs');
//bodyParser --
app.use(express.urlencoded({extended: false}));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');

// Connect to MongoDB
connectToDb();

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// Routes
app.use('/', require('./src/routes/index.js'));
app.use('/mybrand', router);
// Global variables
// Connect flash
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.listen(PORT, ()=>console.log("connected!"))

