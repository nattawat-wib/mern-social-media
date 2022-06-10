const Member = require('./../model/member-model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

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
    console.log(1);
    try {
        const member = await Member.findOne({ email: req.body.email }).select("+password").select(`
            username firstName lastName email birthDate gender aboutMe address avatar cover  
        `);

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
        const member = await Member.findOne({ accessToken: req.cookies.accessToken }).select('+password');
        if (!member) throw 'Unauthorized : no user found with this token';

        await jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET, err => {
            if (err) throw 'Unauthorized : this token is invalid';
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

exports.editPassword = async (req, res) => {
    try {
        // check all input is entered
        if (!req.body.oldPassword || !req.body.newPassword || !req.body.newPasswordConfirm) throw 'please enter all input';

        // check is old password correct
        const member = await Member.findById(req.member._id).select('+password');
        if (!await member.isPasswordCorrect(req.body.oldPassword, member.password)) throw 'old password is not correct'

        if (req.body.oldPassword === req.body.newPassword) throw "new password can't be the same as old password";

        // check new password and new password confirm is match
        if (req.body.newPassword !== req.body.newPasswordConfirm) throw 'new password and new password confirm should be match';

        // save new password
        member.password = req.body.newPassword;
        await member.save();

        // send response and clear old cookie (force logout) 
        res
            .clearCookie('accessToken')
            .status(200)
            .json({
                status: 'success',
                msg: 'edit password successfully',
            })
    } catch (err) {

        console.log(err);
        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        if (!req.body.email) throw 'please enter email'

        const member = await Member.findOne({ email: req.body.email });
        if (!member) throw 'not member found with this email';

        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD,
            }
        });

        const resetToken = Date.now() + Math.random().toString(16)
        member.resetPasswordToken = resetToken
        member.resetPasswordExpire = Date.now() + 10 * 60 * 1000
        await member.save({ validateBeforeSave: false })

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: req.body.email,
            subject: 'Reset your password',
            text: `
                reset password by click this link 
                ${req.headers.origin}/reset-password?token=${resetToken}, 
                please reset within 10 minute`
        })

        res.status(200).json({
            status: 'success',
            msg: 'already sent reset password link to email',
        })

    } catch (err) {
        member.resetPasswordToken = undefined
        member.resetPasswordExpire = undefined
        await member.save({ validateBeforeSave: false })

        console.log(err);
        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        // check all input is entered
        if (!req.body.password || !req.body.passwordConfirm) throw 'please enter all input';

        // check new password and new password confirm is match
        if (req.body.password !== req.body.passwordConfirm) throw 'new password and new password confirm should be match';

        const member = await Member.findOne({ resetPasswordToken: req.body.token }).select('+resetPasswordExpire');

        if (Date.now() > member.resetPasswordExpire) throw 'this token is timeout, please request new reset password link';

        const accessToken = await jwt.sign({ username: member.username }, process.env.JWT_SECRET)

        member.password = req.body.password;
        member.accessToken = accessToken;
        member.resetPasswordToken = undefined;
        member.resetPasswordExpire = undefined;
        await member.save({ validateBeforeSave: false });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            // maxAge: 9999
        });

        res.status(200).json({
            status: 'success',
            msg: 'reset password successfully'
        })

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}