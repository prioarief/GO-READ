const express = require("express");
const checkRole = require("../middleware/checkRole")
const router = express.Router();
const { getAllAuthor , createAuthor, detailAuthor, editAuthor, deleteAuthor, searchAuthor } = require("../controllers/AuthorController");

router.get("/", getAllAuthor);
router.get("/search/", searchAuthor);
router.get("/:id", detailAuthor);
router.post("/", checkRole.checkRole, createAuthor);
router.put("/:id", checkRole.checkRole, editAuthor);
router.delete("/:id", checkRole.checkRole, deleteAuthor);

module.exports = router;
