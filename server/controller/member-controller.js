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
            // .populate('postList')
            .populate('requestList')

        if (!member) throw 'no member with this username'

        let friendStatus = 'unfriend'

        res.status(200).json({
            status: 'success',
            msg: 'all member here',
            data: {
                member,
                friendStatus
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

exports.updateMe = async (req, res) => {
    try {
        // console.log('req.files', req.files);
        // console.log('req.body', req.body);
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

exports.requestFriend = async (req, res) => {
    try {
        // check member that request to is exist
        const requestToMember = await Member.findOne({ username: req.params.username });
        if (!requestToMember) throw 'request to member not found';

        // add request member to requestList of member that request to
        const member = await Member.findByIdAndUpdate(requestToMember._id, {
            $push: {
                requestList: req.member._id
            }
        });

        res.status(200).json({
            status: 'success',
            msg: 'friend send is successfully',
            data: {
                member,
                friendStatus: 'requested'
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