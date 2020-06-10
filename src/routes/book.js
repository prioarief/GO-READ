const express = require("express");
const multer = require("multer")
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({storage : storage})
const { getAllBook , createBook, detailBook, editBook, deleteBook, searchBook } = require("../controllers/BookController");

router.get("/", getAllBook);
router.get("/search/", searchBook);
router.get("/:id", detailBook);
router.post("/", upload.single('image'), createBook);
router.put("/:id", editBook);
router.delete("/:id", deleteBook);

module.exports = router;
