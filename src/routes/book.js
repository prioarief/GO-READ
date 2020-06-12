const express = require("express");
const router = express.Router();
const upload = require("../helpers/upload")
const { getAllBook , createBook, detailBook, editBook, deleteBook, searchBook } = require("../controllers/BookController");

router.get("/", getAllBook);
router.get("/search/", searchBook);
router.get("/:id", detailBook);
router.post("/", upload.single('image'), createBook);
router.put("/:id", upload.single('image'), editBook);
router.delete("/:id", deleteBook);

module.exports = router;
