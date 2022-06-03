const Post = require('./../model/post-model');
const Member = require('./../model/member-model');

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

exports.getPostByUsername = async (req, res) => {
    try {
        const author = await Member.findOne({ username: req.params.username });
        if (!author) throw 'member not found with this username';

        const { postList } = await author.populate({
            path: 'postList',
            select: 'author content image createAtDateTime -_id',
            options: { sort: { 'created_at': -1 } },
            populate: {
                path: 'author',
                select: 'username firstName lastName avatar -_id',
                options: { sort: { 'created_at': -1 } },
            }
        });

    res.status(200).json({
        status: 'success',
        msg: 'all post with this member is here',
        data: {
            post: postList
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