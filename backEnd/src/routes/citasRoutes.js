const express = require("express");
const router = express.Router();
const controller = require("../controllers/citasController");

router.get("/", controller.getCitas);
router.post("/", controller.addCita);
router.put("/:id", controller.updateCita);
router.delete("/:id", controller.deleteCita);

module.exports = router;
