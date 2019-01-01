const express = require("express");
const router = express.Router();

const {authenticate} = require('../middleware/authenticate');
const UserController = require("../controllers/user");

router.post("/signup", UserController.signup);

router.post("/login", UserController.login);

router.delete("/logout", authenticate, UserController.logout);

router.get("/", authenticate, UserController.get);

module.exports = router;