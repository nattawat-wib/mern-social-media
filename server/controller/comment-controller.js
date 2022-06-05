const Comment = require('./../model/comment-model');
const Post = require('./../model/post-model');

exports.createComment = async (req,res) => {
    console.log(req.body);

    try {
        const comment = await Comment.create({
            post: req.body.postId,
            author: req.member._id,
            content: req.body.content
        })

        await Post.findByIdAndUpdate(req.body.postId, {
            $push: { commentList: comment._id }
        })

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