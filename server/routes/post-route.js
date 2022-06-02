const router = require('express').Router();
const postController = require('./../controller/post-controller');
const authController = require('./../controller/auth-controller');

router
    .post('/',
        authController.isLogin,
        postController.createPost
    )

router
    .get('/:username',
        authController.isLogin,
        postController.getPostByUsername
    )

module.exports = router