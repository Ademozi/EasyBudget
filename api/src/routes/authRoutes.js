const express = require("express");
const router = express.Router();
const { register, login, getCurrentUser } = require("../controllers/authController");
const { registerValidation } = require("../validators/authValidator")
const protect = require("../middleware/authMiddleware")
const validate = require("../middleware/validate")

// registerValidation is not a middleWare it is an Array
router.post("/register", registerValidation, validate, register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);

module.exports = router;