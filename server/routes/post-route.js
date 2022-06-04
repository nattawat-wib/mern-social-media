const router = require('express').Router();
const postController = require('./../controller/post-controller');
const authController = require('./../controller/auth-controller');
const middleware = require('./../middleware/multer');

router.use(authController.isLogin)

router
    .get('/', postController.getAllPost)
    .post('/',
        middleware.multerConfig.single('image'),
        postController.createPost
    )

router.delete('/:_id', postController.deletePost)

module.exports = router