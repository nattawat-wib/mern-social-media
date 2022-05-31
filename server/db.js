const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/mern-social-media')
    .then(() => {
        console.log('connect db successfully')
    })
    .catch(err => {
        console.log(`ERROR : ${err}`);
    })