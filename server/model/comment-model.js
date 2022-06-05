const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member'
    },
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Number,
        default: Date.now()
    },
    createAtDateTime: {
        type: Number,
        default: Date.now()
    }
}, {
    timestamps: {
        createdAt: 'create_at'
    }
})

module.exports = mongoose.model('comment', commentSchema);