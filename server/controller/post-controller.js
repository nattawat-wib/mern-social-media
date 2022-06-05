const Post = require('./../model/post-model');
const Member = require('./../model/member-model');

exports.getAllPost = async (req, res) => {
    try {
        const post = await Post.find().populate('author', 'firstName lastName avatar username -_id').sort({ created_at: -1 });

        res.status(200).json({
            status: 'success',
            msg: 'all post',
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

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            author: req.member._id,
            image: req.file?.filename || null
        });
        // console.log(post);

        const author = await Member.findByIdAndUpdate(req.member._id, {
            $push: { postList: post._id }
        }, { new: true })

        console.log(author);

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

exports.editPost = async (req, res) => {
    try {
        const post = await Post.findById(req.body._id).populate('author', '_id');
        if (!post) throw 'post with this id is not exist';

        console.log('post', post);

        res.status(200).json({
            status: 'success',
            msg: 'edit post successfully'
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            mag: err
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { author } = await Post.findById(req.params._id).populate('author', '_id');
        if (String(req.member._id) !== String(author._id)) throw 'cannot delete, You are not owner of this post.'

        const deletePost = await Post.findByIdAndDelete(req.params._id);
        await Member.update(
            { _id: author._id },
            { $pull: { postList: deletePost._id } }
        )

        res.status(200).json({
            status: 'success',
            msg: 'delete post successfully',
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}