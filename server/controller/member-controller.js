const Member = require('./../model/member-model');
const multer = require('multer');

exports.getAllMember = async (req, res) => {
    try {
        const allMember = await Member.find().select('-password');

        if (!allMember) throw 'no any member'

        res.status(200).json({
            status: 'success',
            msg: 'all member here',
            data: { allMember }
        })

    } catch (err) {
        console.log(err);

        res.status(404).json({
            status: 'error',
            msg: err,
        })
    }
}

// get only profile and friend status
exports.getMember = async (req, res) => {
    try {
        const member = await Member
            .findOne({ username: req.params.username })
            .select('-password -accessToken -__v -_id')
            .populate('followingList', 'username firstName lastName avatar -_id')
            .populate('followerList', 'username firstName lastName avatar -_id')

        if (!member) throw 'no member with this username'

        const isAlreadyFollow = !!member.followerList.find(member => {
            return member.username === req.member.username;
        })

        res.status(200).json({
            status: 'success',
            msg: 'all member here',
            data: {
                member,
                isFollowing: isAlreadyFollow
            }
        })

    } catch (err) {
        console.log(err);

        res.status(404).json({
            status: 'error',
            msg: err,
        })
    }
}

exports.getPostByUsername = async (req, res) => {
    try {
        const author = await Member.findOne({ username: req.params.username });
        if (!author) throw 'member not found with this username';

        const { postList } = await author.populate({
            path: 'postList',
            select: 'author content image createAtDateTime _id',
            options: { sort: { 'created_at': -1 } },
            populate: [
                {
                    path: 'author',
                    select: 'username firstName lastName avatar -_id',
                    options: { sort: { 'created_at': -1 } },
                },
                {
                    path: 'memberWhoLike',
                    select: 'username -_id',
                },
                {
                    path: 'commentList',
                    // select: 'username -_id',
                    populate: {
                        path: 'author',
                        select: 'username firstName lastName avatar -_id',
                        options: { sort: { 'created_at': -1 } },
                    }
                }
            ]
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

exports.updateMe = async (req, res) => {
    try {
        console.log('req.files', req.files);
        console.log('req.body', req.body);
        const updateMember = await Member.findOneAndUpdate({ accessToken: req.member.accessToken },
            {
                ...req.body,
                avatar: req.files.avatar ? req.files.avatar[0].filename : req.body.avatar,
                cover: req.files.cover ? req.files.cover[0].filename : req.body.cover
            },
            { new: true })

        res.status(200).json({
            status: 'success',
            msg: 'update member successfully',
            data: {
                member: updateMember
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

exports.followMember = async (req, res) => {
    try {
        // check member that following is exist 
        const member = await Member
            .findOne({ username: req.params.username })
            .populate('followerList', '_id');

        if (!member) throw 'member that you want to follow is not found';

        // check is already follow
        const isAlreadyFollow = !!member.followerList.find(follower => {
            return String(follower._id) === String(req.member._id)
        })

        // if already follow action pull || if not follow yet action push to followList
        const action = isAlreadyFollow ? '$pull' : '$push';

        const updatedMember = await Member.findByIdAndUpdate(
            member._id,
            { [action]: { followerList: req.member._id, } },
            { new: true }
        );

        // update follower
        await Member.findByIdAndUpdate(
            req.member._id,
            { [action]: { followingList: updatedMember._id } },
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            msg: `${!isAlreadyFollow ? 'follow' : 'unfollow'} successfully`,
            data: {
                member,
                isFollowing: !isAlreadyFollow
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

exports.getFollow = async (req, res) => {
    try {
        const me = await Member.findById(req.member._id)
            .populate('followerList followingList', 'username firstName lastName avatar -_id')

        res.status(200).json({
            status: 'success',
            msg: 'all follower and following here',
            data: {
                member: me
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

exports.getUnfollow = async (req, res) => {
    try {
        const { followingList } = await Member.findById(req.member._id).populate('followingList', '_id');
        const allMember = await Member.find().select('username firstName lastName avatar _id');

        // convert _id to string for compare
        const followingListString = followingList.map(following => String(following._id));

        const unfollowMember = allMember.filter(member => {
            if (followingListString.includes(String(member._id))) return
            if (String(member._id) === String(req.member._id)) return
            return member
        })

        res.status(200).json({
            status: 'success',
            msg: 'all follower and following here',
            data: {
                unfollowMember
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