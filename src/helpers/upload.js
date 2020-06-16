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
const upload = multer({storage : storage})

module.exports = upload