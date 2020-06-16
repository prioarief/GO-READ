const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/checkRole")
const { getAllGenre , createGenre, detailGenre, editGenre, deleteGenre, searchGenre } = require("../controllers/GenreController");

router.get("/", getAllGenre);
router.get("/search/", searchGenre);
router.get("/:id", detailGenre);
router.post("/", checkRole.checkRole, createGenre);
router.put("/:id", checkRole.checkRole, editGenre);
router.delete("/:id", checkRole.checkRole, deleteGenre);

module.exports = router;
