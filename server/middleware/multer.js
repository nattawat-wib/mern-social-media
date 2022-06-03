const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const uid = `${Date.now()}-${Math.random().toString(32).slice(2)}`;
        cb(null, `${uid}-${file.originalname}`);
    }
})

exports.multerConfig = multer({ storage })