require('dotenv').config();
const connectToDb = require('./src/configs/connection');
connectToDb();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = require('./src/routes/routers')
const app=express();
app.use(express.json());
app.use(express.urlencoded());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');


//middlewares
// app.use('/css', express.static(__dirname + '/UI'));
// app.use('/js', express.static(__dirname + '/UI'));
// app.use('/img', express.static(__dirname + '/UI'));
// app.use('/pages', express.static(__dirname + '/UI'));
// //set static engines
// app.set('views', '../')
// app.set('view engine', 'ejs');
// app.get('/', (req, res)=>{
//     res.render('index');
// })


app.use('/mybrand', router);
app.listen(3000, ()=>console.log("connected!"))