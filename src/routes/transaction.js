const express = require("express");
const router = express.Router();
const transaction = require("../controllers/TransactionController");


router.get("/", transaction.getTransaction);
router.get("/:id", transaction.detailTransaction);
router.get("/borrow/:id", transaction.borrowed);
router.get("/return/:id", transaction.returned);

module.exports = router;
