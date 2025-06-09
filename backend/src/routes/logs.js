const express = require("express");
const { getLogs } = require("../controllers/logsController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getLogs);

module.exports = router;
