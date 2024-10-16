const express = require("express");
const authController = require("../controllers/authController");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email id is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength(6),
  ],
  authController.register
);
router.post("/login", authController.login);

module.exports = router;
