const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/images/')
    },
    filename: (req, file, cb) => {
        const image = file.originalname
        cb(null, `${Date.now()}-${req.body.title.split(" ").join("-").toLowerCase()}${image.slice(image.length-4, image.length )}` )
    },
})
const upload = multer({storage : storage})

module.exports = upload