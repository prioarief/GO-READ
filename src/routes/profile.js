const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { MiddlewareRefreshToken } = require("../middleware/refreshToken")
const TokenCheck = require("../middleware/checkToken")

router.get('/:email', AuthController.detailUser )
router.put('/:email', AuthController.editUser )
router.delete('/:email', AuthController.deleteUser )

module.exports = router;
