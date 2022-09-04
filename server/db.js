const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGO_LOCAL)
// module.exports = mongoose.connect(process.env.MONGO_ATLAS)
    .then(() => {
        console.log('connect db successfully')
    })
    .catch(err => {
        console.log(`ERROR : ${err}`);
    })