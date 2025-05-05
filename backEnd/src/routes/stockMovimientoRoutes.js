const express = require("express");
const router = express.Router();
const controller = require("../controllers/stockMovimientoController");

router.get("/", controller.getMovimientos);
router.post("/", controller.addMovimiento);
router.put("/:id", controller.updateMovimiento);
router.delete("/:id", controller.deleteMovimiento);

module.exports = router;
