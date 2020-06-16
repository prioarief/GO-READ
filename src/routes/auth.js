const express = require("express");
const router = express.Router();
const { register, auth, refreshToken } = require("../controllers/AuthController");
const { MiddlewareRefreshToken } = require("../middleware/refreshToken")
const TokenCheck = require("../middleware/checkToken")
// router.get("/", getAllAuthor);
// router.get("/search/", searchAuthor);
// router.get("/:id", detailAuthor);
router.post("/register", register);
router.post("/login", auth);
router.get("/refresh-token", TokenCheck, MiddlewareRefreshToken, refreshToken);
// router.put("/:id", editAuthor);
// router.delete("/:id", deleteAuthor);

module.exports = router;
