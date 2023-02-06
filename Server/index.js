require('dotenv').config();
// dotenv.config({path: './.env'})
const connectToDb = require('./src/configs/connection');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const router = require('./src/routes/routers')
const app=express();
app.use(express.json());
app.use(express.urlencoded());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');

//middlewares
app.use(express.static('UI'));
//view engine
app.set('view engine', 'html');
// connection 
connectToDb();

app.use('/', router);
app.listen(3000, ()=>console.log("connected!"))