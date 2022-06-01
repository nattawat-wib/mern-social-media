const Member = require('./../model/member-model');

exports.updateMe = async (req, res) => {
    try {
        const updateMember = await Member.findOneAndUpdate({ accessToken: req.member.accessToken }, req.body, { new: true })

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