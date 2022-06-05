const router = require('express').Router();
const commentController = require('./../controller/comment-controller');

router.route('/')
    .post(commentController.createComment)

module.exports = router;