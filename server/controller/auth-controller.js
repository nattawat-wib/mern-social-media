const Member = require('./../model/member-model');

exports.register = async (req, res) => {
    try {
        const existMember = await Member.findOne({ email: req.body.email });
        if (existMember) throw 'this email is already taken';

        const member = await Member.create(req.body);

        res.status(200).json({
            status: 'success',
            msg: 'register successfully',
            data: member
        })

    } catch (err) {
        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.login = async (req, res) => {
    try {
        const member = await Member.findOne({ email: req.body.email });
        if (!member) throw 'member not found!'

        const isPasswordCorrect = await member.isPasswordCorrect(req.body.password, member.password);
        if (!isPasswordCorrect) throw 'password or email is not correct'



        res.status(200).json({
            status: 'success',
            msg: 'login success'
        })

    } catch (err) {
        res.status(401).json({
            status: 'error',
            msg: err
        })
    }
}