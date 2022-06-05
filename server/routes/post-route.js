const router = require('express').Router();
const postController = require('./../controller/post-controller');
const authController = require('./../controller/auth-controller');
const middleware = require('./../middleware/multer');

router.use(authController.isLogin)

router.route('/')
    .get(postController.getAllPost)
    .post(
        middleware.multerConfig.single('image'),
        postController.createPost
    )

router.route('/:_id')
    .delete(postController.deletePost)
    .patch(
        middleware.multerConfig.single('image'),
        postController.editPost
    )

router.patch('/:_id/like/:username', postController.likePost)

module.exports = router