const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/validateToken.middleware");
const verifyUser = verifyToken("user");

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
router.post("/logout", verifyUser, userController.userLogout);
router.get("/user", verifyUser, userController.verifyUser);
exports.router = router;
