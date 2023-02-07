const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');
const userController = require('../controllers/usersController');
const blogsController = require('../controllers/blogsController');

router.get('/signup', controllers.signup_get);
router.post('/signup', controllers.signup_post);
router.get('/login', controllers.login_get);
router.post('/login', controllers.login_post);
// users 
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
