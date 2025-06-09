const express = require("express");
const {
  getCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
} = require("../controllers/citasController");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

router.get("/", auth, getCitas);

router.get("/:id", auth, getCitaById);

router.post("/", auth, createCita);

router.put("/:id", auth, isAdmin, updateCita);

router.delete("/:id", auth, deleteCita);

module.exports = router;
