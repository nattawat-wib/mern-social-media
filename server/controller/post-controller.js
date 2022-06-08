const Post = require('./../model/post-model');
const Member = require('./../model/member-model');

exports.getAllPost = async (req, res) => {
    try {
        const post = await Post
            .find()
            .populate('author', 'firstName lastName avatar username -_id')
            .populate('memberWhoLike', 'username -_id')
            .populate({
                path: 'commentList',
                populate: 'author',
                // options: { sort: { 'created_at': -1 } },
            })
            .sort({ created_at: -1 })

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
        if (!req.body.content) throw 'please enter content';
        if (req.body.image === 'null') req.body.image = null;

        const post = await Post.findById(req.params._id).populate('author', '_id');
        if (!post) throw 'no post found with this _id';

        if (String(post.author._id) !== String(req.member._id)) throw 'cannot edit, you are not owner of this post'

        const editedPost = await Post.findByIdAndUpdate(req.params._id, {
            content: req.body.content,
            image: req.file ? req.file.filename : req.body.image
        }, { new: true });

        console.log(editedPost);

        res.status(200).json({
            status: 'success',
            msg: 'edit post successfully',
            data: {
                post: editedPost
            }
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: 'error',
            msg: err
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

exports.likePost = async (req, res) => {
    try {
        const isPostExist = await Post.findById(req.params._id);
        if (!isPostExist) throw 'no post found with this _id';

        const isThisPostLike = await Post.findOne(
            {
                _id: req.params._id,
                memberWhoLike: req.member._id
            }
        );

        let action = '$push';
        let msg = 'like';

        if (isThisPostLike) {
            action = '$pull';
            msg = 'unlike';
        }

        const post = await Post.findByIdAndUpdate(
            req.params._id,
            { [action]: { memberWhoLike: req.member._id } },
            { new: true }
        )

        res.status(200).json({
            status: 'success',
            msg,
            data: { post },
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.getPostByFollowing = async (req, res) => {
    try {
        const { followingList } = await Member.findById(req.member._id).select('-_id followingList').populate({
            path: 'followingList',
            select: 'postList firstName -_id',
            populate: {
                path: 'postList',
                populate: {
                    path: 'author',
                    select: 'firstName lastName avatar username'
                }
            }
        });

        const followingPostList = [];
        followingList.forEach(following => {
            following.postList.forEach(post => {
                followingPostList.push(post);
            })
        });

        const { postList } = await Member.findById(req.member._id).populate({
            path: 'postList',
            populate: {
                path: 'author',
                select: 'firstName lastName username avatar -_id'
            }
        });

        const allPost = [...postList, ...followingPostList].sort((a, b) => {
            return +a.content.slice(0, 1) - +b.content.slice(0, 1)
        });

        res.status(200).json({
            status: 'success',
            msg: 'all post from your following',
            data: {
                allPost
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