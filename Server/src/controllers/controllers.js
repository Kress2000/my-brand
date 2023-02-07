
const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const { user } = require('../models/users');
app.use(express.urlencoded());
app.use(bodyParser.json());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'secrete'
//Sign up
module.exports.signup_get = (req, res)=>{
    res.render('signup')
    res.send('signup page get')
}
module.exports.signup_post = async(req, res)=>{
    const {name, email, password, } = req.body;
    try{
        const existinguser = await user.findOne({email: email});
        if(existinguser){
           return  res.status(400).json({message: 'User already exists'});
        }
        const harshedpassword = await bcrypt.hash(password, 10)
        const result = await user.create({
            name: name,
            password: harshedpassword,
            email: email
        })
       const token = await jwt.sign({email: result.email, id: result._id}, ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
       res.status(201).json({message: 'Account created', user: result, token: token});
    }catch(err){
        console.log(err)
        res.status(400).send('Error! User not created!');
        
    }
}
// Login
module.exports.login_get =  (req, res)=>{
    res.render('login')
}
module.exports.login_post = async (req, res)=>{
    const {email, password} = req.body;
    try{
        const existinguser = await user.findOne({email: email});
        if(!existinguser){
           return  res.status(404).json({message: 'Not found'});
        }
        const matchPass = await bcrypt.compare(password, existinguser.password);
        if(!matchPass){
            res.status(400).json({message: 'Invalid credemtials1'})
        }
       const token = await jwt.sign({email: existinguser.email, id: existinguser._id}, ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
       res.status(200).json({message: 'Logged in successfully', user: existinguser, token: token});
    }catch(err){
        console.log(err)
        res.status(500).send('Error! Something went wrong');
    }
}
