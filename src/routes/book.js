const express = require("express");
const multer = require("multer")
const router = express.Router();
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
const { getAllBook , createBook, detailBook, editBook, deleteBook, searchBook } = require("../controllers/BookController");

router.get("/", getAllBook);
router.get("/search/", searchBook);
router.get("/:id", detailBook);
router.post("/", upload.single('image'), createBook);
router.put("/:id", upload.single('image'), editBook);
router.delete("/:id", deleteBook);

module.exports = router;
