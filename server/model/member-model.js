const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        default: 'username'
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
        required: true
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
    // friendList : {
    //     type: mongoose.Schema.
    // },
    // commentList : {
    // },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    createdAtDateTime: {
        type: String,
        default: new Date().toLocaleString().slice(0, -3)
    },
    changePasswordAt: {
        type: Number,
    },
    token: {
        type: String,
    },
    resetPasswordToken: {
        type: String
    },
})

memberSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.username = Math.random().toString(16).slice(2);

    next();
})

memberSchema.methods.isPasswordCorrect = async function (candidatePassword, oldPassword) {
    console.log(oldPassword, candidatePassword);
    
    return isPasswordCorrect = await bcrypt.compare(candidatePassword, oldPassword)
}

module.exports = mongoose.model('member', memberSchema)