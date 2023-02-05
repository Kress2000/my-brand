require('dotenv').config();
// dotenv.config({path: './.env'})
const connectToDb = require('./src/configs/connection');
const express = require('express');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const user  = require('./src/models/users');
const blog  = require('./src/models/blogs');
const router = require('./src/routes/index')


const app=express();
app.use(express.json());
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.json());
//save data user
connectToDb();



app.use('/', router);
app.listen(port, (console.log("connected!")))