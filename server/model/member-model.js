const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    username: {
        type: String
    },
    firstName: {
        type: String
    }
})

module.exports = mongoose.model('member', memberSchema)