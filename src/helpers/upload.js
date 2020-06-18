const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/images/')
    },
    filename: (req, file, cb) => {
        const image = file.originalname.split(".").pop()
        cb(null, `${Date.now()}-${req.body.title.split(" ").join("-").toLowerCase()}.${image}` )
    },
})
const filter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage : storage,
    fileFilter: filter,
})

module.exports = upload