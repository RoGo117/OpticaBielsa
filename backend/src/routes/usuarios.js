const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usuariosController");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

router.get("/", auth, isAdmin, getUsers);

router.get("/:id", auth, isAdmin, getUserById);

router.post("/", createUser);

router.put("/:id", auth, isAdmin, updateUser);

router.delete("/:id", auth, isAdmin, deleteUser);

module.exports = router;
