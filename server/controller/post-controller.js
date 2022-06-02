const Post = require('./../model/post-model');

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            author: req.member._id,
        });

        console.log(post);

        res.status(200).json({
            status: 'success',
            msg: 'create post successfully',
            data: {
                post
            }
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.getPostByUsername = async (req, res) => {
    try {
        const post = await Post.find().populate('author').sort({ created_at: -1 });

        console.log(post);

        res.status(200).json({
            status: 'success',
            msg: 'all post with this user is here',
            data: {
                post
            }
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}