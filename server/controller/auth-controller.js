const Member = require('./../model/member-model');

exports.memberRegister = async (req, res) => {
    await Member.create({
        username: 'tester',
        firstName: 'tester firstName'
    })

    res.json({
        status: 'success',
    })
}