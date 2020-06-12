const express = require("express");
const router = express.Router();
const { getAllGenre , createGenre, detailGenre, editGenre, deleteGenre, searchGenre } = require("../controllers/GenreController");

router.get("/", getAllGenre);
router.get("/search/", searchGenre);
router.get("/:id", detailGenre);
router.post("/", createGenre);
router.put("/:id", editGenre);
router.delete("/:id", deleteGenre);

module.exports = router;
