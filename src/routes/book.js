const express = require("express");
const router = express.Router();
const { getAllBook , createBook, detailBook, editBook, deleteBook, searchBook } = require("../controllers/BookController");

router.get("/", getAllBook);
router.get("/search/", searchBook);
router.get("/:id", detailBook);
router.post("/", createBook);
router.put("/:id", editBook);
router.delete("/:id", deleteBook);

module.exports = router;
