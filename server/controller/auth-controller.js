const Member = require('./../model/member-model');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const existMember = await Member.findOne({ email: req.body.email });
        if (existMember) throw 'this email is already taken';

        const member = await Member.create(req.body);

        res.status(200).json({
            status: 'success',
            msg: 'register successfully',
            data: {
                member
            }
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
        const member = await Member.findOne({ email: req.body.email }).select("-password, -__v");
        if (!member) throw 'member not found!'

        const isPasswordCorrect = await member.isPasswordCorrect(req.body.password, member.password);
        if (!isPasswordCorrect) throw 'password or email is not correct'

        const accessToken = await jwt.sign({ username: member.username }, process.env.JWT_SECRET)

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            // maxAge: 9999
        });

        member.accessToken = accessToken;
        await member.save({ validateBeforeSave: false });
        
        res.status(200).json({
            status: 'success',
            msg: 'login success',
            data: {
                member,
                accessToken
            }
        })

    } catch (err) {
        console.log(err);

        res.status(401).json({
            status: 'error',
            msg: err
        })
    }
}

exports.verifyToken = async (req, res) => {
    try {
        const member = await Member.findOne({ accessToken: req.cookies.accessToken }).select(`
            username firstName lastName email birthDate gender aboutMe address avatar cover  
        `);
        if (!member) throw 'user not login';

        await jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET, err => {
            if (err) throw 'access token is not valid';
        });

        res.status(200).json({
            status: 'success',
            msg: 'user already login',
            data: {
                member,
                accessToken: req.cookies.accessToken
            },
        });

    } catch (err) {
        console.log(err);

        res.status(401).json({
            status: 'error',
            msg: err
        })
    }
}

exports.logout = async (req, res) => {
    try {
        const member = await Member.findOne({ accessToken: req.cookies.accessToken });
        if (!member) throw 'member not found'

        member.accessToken = undefined;
        await member.save({ validateBeforeSave: false })

        res
            .clearCookie('accessToken')
            .status(200)
            .json({
                status: 'success',
                msg: 'logout successfully'
            })

    } catch (err) {
        console.log(err);

        res.json(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.isLogin = async (req, res, next) => {
    try {
        const member = await Member.findOne({ accessToken: req.cookies.accessToken });
        if (!member) throw 'no user found with this token';

        await jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET, err => {
            if (err) throw 'this token is invalid';
        })

        req.member = member
        next()

    } catch (err) {
        console.log(err);
        res.status(401).json({
            status: 'error',
            msg: err
        })
    }
}