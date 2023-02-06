const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');
const userController = require('../controllers/usersController');
const blogsController = require('../controllers/blogsController');

router.get('/mybrand/signup', controllers.signup_get);
router.post('/mybrand/signup', controllers.signup_post);
router.get('/mybrand/login', controllers.login_get);
router.post('/mybrand/login', controllers.login_post);
// users 
router.get('/mybrand/api/users', userController.users_get); //get all
router.get('/mybrand/api/users/:id', userController.users_getOne); //get single
router.post('/mybrand/api/users/add', userController.users_add); // add one
router.put('/mybrand/api/users/:id', userController.users_update); //updated one
router.delete('/mybrand/api/users/:id', userController.users_delete); // delete one
//blogs
router.get('/mybrand/api/blogs', blogsController.blog_get); //get all
router.get('/mybrand/api/blogs/:id', blogsController.blog_getOne); //get single
router.post('/mybrand/api/blogs/add', blogsController.blog_add); // add one
router.put('/mybrand/api/blogs/:id', blogsController.blog_update); //updated one
router.delete('/mybrand/api/blogs/:id', blogsController.blog_delete); // delete one

module.exports = router; 
