const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member'
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    memberWhoLike: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'member'
    },
    commentList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment'
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
}
)

postSchema.pre('save', function () {
    if (this.isNew) {
        this.createdAtTimestamp = new Date(this.createdAt).getTime();
        this.createdAtDateTime = new Date(this.createdAt).toLocaleString('en-GB').split(',').join('');
    }
})

module.exports = mongoose.model('post', postSchema)