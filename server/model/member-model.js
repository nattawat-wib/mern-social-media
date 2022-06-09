const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    birthDate: {
        type: String
    },
    gender: {
        type: String
    },
    aboutMe: {
        type: String
    },
    address: {
        type: String
    },
    avatar: {
        type: String
    },
    cover: {
        type: String
    },
    postList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'post',
    },
    followingList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'member'
    },
    followerList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'member'
    },
    changePasswordAt: {
        type: Number,
        select: false
    },
    accessToken: {
        type: String,
        select: false
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpire: {
        type: Number,
        select: false
    },
    createdAt: {
        type: Date
    },
    createdAtDateTime: {
        type: String
    },
    createdAtTimestamp: {
        type: Number
    },
    updatedAt: {
        type: Date
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})

memberSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    if (this.isNew) {
        this.username = Math.random().toString(16).slice(2);
        this.createdAtTimestamp = new Date(this.createdAt).getTime();
        this.createdAtDateTime = new Date(this.createdAt).toLocaleString('en-GB').split(',').join('');
    }

    next();
})

// memberSchema.post('/^find/', async function(next) {
//     this.password
// })

memberSchema.methods.isPasswordCorrect = async function (candidatePassword, oldPassword) {
    return await bcrypt.compare(candidatePassword, oldPassword)
}

module.exports = mongoose.model('member', memberSchema)