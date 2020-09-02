const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, UserController.auth);

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/logout", auth, UserController.logout);

module.exports = router;
