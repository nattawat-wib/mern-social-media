const mongoose = require('mongoose');

// module.exports = mongoose.connect('mongodb://localhost:27017/mern-social-media')
module.exports = mongoose.connect(process.env.MONGO_ATLAS_CONNECTION_STRING)
    .then(() => {
        console.log('connect db successfully')
    })
    .catch(err => {
        console.log(`ERROR : ${err}`);
    })