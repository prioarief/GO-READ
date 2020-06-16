const express = require("express");
const router = express.Router();
const { getAllRole , createRole, detailRole, editRole, deleteRole, searchRole } = require("../controllers/RoleController");

router.get("/", getAllRole);
router.get("/search/", searchRole);
router.get("/:id", detailRole);
router.post("/", createRole);
router.put("/:id", editRole);
router.delete("/:id", deleteRole);

module.exports = router;
