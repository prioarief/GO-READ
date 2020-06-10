const express = require("express");
const router = express.Router();
const { getAllAuthor , createAuthor, detailAuthor, editAuthor, deleteAuthor, searchAuthor } = require("../controllers/AuthorController");

router.get("/", getAllAuthor);
router.get("/search/", searchAuthor);
router.get("/:id", detailAuthor);
router.post("/", createAuthor);
router.put("/:id", editAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;
