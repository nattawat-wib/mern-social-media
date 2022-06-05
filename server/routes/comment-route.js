const router = require('express').Router();
const commentController = require('./../controller/comment-controller');
const authController = require('./../controller/auth-controller');

router.route('/')
    .post(
        authController.isLogin,
        commentController.createComment
    )

module.exports = router;