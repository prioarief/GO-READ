const express = require("express");
const router = express.Router();
const { register, auth } = require("../controllers/AuthController");

// router.get("/", getAllAuthor);
// router.get("/search/", searchAuthor);
// router.get("/:id", detailAuthor);
router.post("/register", register);
router.post("/login", auth);
// router.put("/:id", editAuthor);
// router.delete("/:id", deleteAuthor);

module.exports = router;
