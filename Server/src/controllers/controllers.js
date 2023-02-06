
const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(express.urlencoded());
app.use(bodyParser.json());


module.exports.signup_get = (req, res)=>{
    res.render('signup')
    res.send('signup page get')
}
module.exports.signup_post = (req, res)=>{
    res.render('signup')
    res.send('signup page post')
}
module.exports.login_get = (req, res)=>{
    res.render('login')
    res.send("login page get")
}
module.exports.login_post = (req, res)=>{
    res.render('login')
    res.send('login page post')
}
