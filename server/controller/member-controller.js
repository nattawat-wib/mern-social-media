const Member = require('./../model/member-model');

exports.updateMe = async (req, res) => {
    try {
        // const member = await Member.findOne({  })

        res.status(200).json({
            status: 'success',
            msg: 'update member successfully'
        })

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}