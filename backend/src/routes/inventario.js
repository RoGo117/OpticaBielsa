const express = require("express");
const { getInventario, createMovimiento } = require("../controllers/inventarioController");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

router.get("/", auth, isAdmin, getInventario);
router.post("/", auth, isAdmin, createMovimiento);

module.exports = router;
