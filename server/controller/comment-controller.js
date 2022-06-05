const Comment = require('./../model/comment-model');

exports.createComment = async (req,res) => {
    try {
        const comment = await Comment.create({
            post: req.params.postId,
            author: req.params.username,
            content: req.body.content
        })

        console.log(comment);

        res.status(200).json({
            status: 'success',
            msg: 'comment successfully',
            data: { comment }
        })

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}