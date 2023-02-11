// const express = require('express');
// app.use(express.json());
// const bodyParser = require('body-parser');
// const { user } = require('../models/users');
// const User = user;
// const jwt = require('jsonwebtoken');
// app.use(bodyParser.json());
// app.use(express.urlencoded());
// const bcrypt = require('bcrypt');
// const ACCESS_TOKEN_SECRET = 'secrete'
// //Sign up
// module.exports.signup_post = async(req, res)=>{
//     const {name, email, password, } = req.body;
//     try{
//         const existinguser = await user.findOne({email: email});
//         if(existinguser){
//            return  res.status(400).json({message: 'User already exists'});
//         }
//         if(password.length <5){
//            return  res.status(400).json({message: 'Password must be greater that 5 characters!'});
//         }
//         const harshedpassword = await bcrypt.hash(password, 10)
//         const result = await user.create({
//             name: name,
//             password: harshedpassword,
//             email: email
//         })
//        const token = await jwt.sign({email: result.email, id: result._id}, ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
//        res.status(201).json({message: 'Account created', user: result, token: token});
//     }catch(err){
//         console.log(err)
//         res.status(400).send('Error! User not created!');

//     }
// }
// // Login

// module.exports.login_post = async (req, res)=>{
//     const {email, password} = req.body;
//     try{
//         const existinguser = await user.findOne({email: email});
//         if(!existinguser){
//            return  res.status(404).json({message: 'Not found'});
//         }
//         const matchPass = await bcrypt.compare(password, existinguser.password);
//         if(!matchPass){
//             res.status(400).json({message: 'Invalid credentials'})
//         }
//  const token = await jwt.sign({email: existinguser.email, id: existinguser._id}, ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
//        res.status(200).json({message: 'Logged in successfully', user: existinguser, token: token});
//     }catch(err){
//         console.log(err)
//         res.status(500).send('Error! Something went wrong');
//     }
// }
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const ACCESS_TOKEN_SECRET = "secrete";
const passport = require("passport");
// Load User model
const { user } = require("../models/users");
const User = user;
const jwt = require("jsonwebtoken");
// const e = require("connect-flash");
app.use(bodyParser.json());

// Register
module.exports.signup_post = async (req, res) => {
  const { name, email, password, confirmPass } = req.body;
  let errors = [];
  if (!name || !email || !password || !confirmPass) {
    errors.push({ msg1empty: "Please enter all fields" });
  }
  if (password != confirmPass) {
    errors.push({ msgNotMatch: "Passwords do not match" });
  }
  if (password.length < 6) {
    errors.push({ msgShort: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.status(500).json({error: errors});
    // return res.render("signup", {
    //   errors,
    //   name,
    //   email,
    //   password,
    //   confirmPass,
    // });
  } else {
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      errors.push({ msgExists: "Email already exists" });
      // res.render("signup", {
      //   errors,
      //   name,
      //   email,
      //   password,
      //   confirmPass,
      // });
      res.status(400).json({ message: "User already exists" });
      return;
    } else {
      try {
        const harshedpassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
                                    name: name,
                                    password: harshedpassword,
                                    email: email
                                })
        const token = await jwt.sign(
          { email: newUser.email, id: newUser._id },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res
          .status(201)
          .json({ message: "Account created", user: newUser, token: token });
        // req.flash("success_msg", "You are now registered and can log in");

        // return res.redirect("/login");
      } catch (err) {
        console.log(err);
        // res.status(400).send("Error! User not created!");
      }
    }
  }
};
// Login
module.exports.login_post = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    const matchPassords = await bcrypt.compare(password, existingUser.password);
    if (matchPassords) {
      req.body.email = existingUser.email;
      console.log(req.body.email)

      if(email.toLowerCase() === 'erickykress1@gmail.com'){
        const token = await jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({
            message: "Welcome Admin!",
            user: existingUser,
            token: token,
          });
      }else{
        const token = await jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({
            message: `Welcome ${existingUser.name}`,
            user: existingUser,
            token: token,
          });
      }
      // return res.render("blogs");/
    } else {
      res.status(400).json({ message: "Incorect password!" });
      return;
    }
  } else {
    res.status(404).send({ message: "Error! Not logged in" });
    // res.redirect("/signup");
  }
};
passport.authenticate("local", {
  successRedirect: "/blogs",
  failureRedirect: "/login",
  failureFlash: true,
})//(req, res, next);
// }
// Logout
module.exports.logout_get =  (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).json({message: 'Unable to log out'})
      } else {
        res.status(200).json({message: 'Logout successful'})
      }
    });
  } else {
    res.end()
  }
}


// (req, res,) => {
//   res.status(200).json({message: "Logged out!"});
//   req.logout();
  // req.flash("success_msg", "You are logged out");
  // return res.redirect("/login");

