const router = require('express').Router();
const postController = require('./../controller/post-controller');
const authController = require('./../controller/auth-controller');
const middleware = require('./../middleware/multer');

router
    .post('/',
        middleware.multerConfig.single('image'),
        authController.isLogin,
        postController.createPost
    )

router
    .get('/:username',
        authController.isLogin,
        postController.getPostByUsername
    )

module.exports = router