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
    createAt: {
        type: Number,
        default: Date.now()
    },
    createAtDateTime: {
        type: String,
        default: Date.now()
    },
    memberWhoLike: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'member'
    },
    commentList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment'
    }
},
{
    timestamps: {
        createdAt: 'created_at',
    },

}
)

module.exports = mongoose.model('post', postSchema)