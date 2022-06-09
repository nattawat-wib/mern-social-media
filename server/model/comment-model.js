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
});

commentSchema.pre('save', function () {
    if (this.isNew) {
        this.createdAtTimestamp = new Date(this.createdAt).getTime();
        this.createdAtDateTime = new Date(this.createdAt).toLocaleString('en-GB').split(',').join('');
    }
})

module.exports = mongoose.model('comment', commentSchema);