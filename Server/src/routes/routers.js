const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');
const userController = require('../controllers/usersController');
const blogsController = require('../controllers/blogsController');
const { forwardAuthenticated } = require("../configs/auth");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/signup", forwardAuthenticated, (req, res) => res.render("signup"));
//logout
router.delete('/logout', actionController.logout_get);

// add users
router.post('/signup', actionController.signup_post);
// users login
router.post('/login', actionController.login_post);
//users
router.get('/api/users', userController.users_get); //get all
router.get('/api/users/:id', userController.users_getOne); //get single
router.post('/api/users/add', userController.users_add); // add one
router.put('/api/users/:id', userController.users_update); //updated one
router.delete('/api/users/:id', userController.users_delete); // delete one
//blogs
router.get('/api/blogs', blogsController.blog_get); //get all
router.get('/api/blogs/:id', blogsController.blog_getOne); //get single
router.post('/api/blogs/add', blogsController.blog_add); // add one
router.put('/api/blogs/:id', blogsController.blog_update); //updated one
router.delete('/api/blogs/:id', blogsController.blog_delete); // delete one
module.exports = router;
