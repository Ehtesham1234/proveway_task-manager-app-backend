const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { verifyToken } = require("../middleware/validateToken.middleware");
const verifyUser = verifyToken("user");

router.post("/categories", verifyUser, categoryController.createCategory);
router.get("/categories", verifyUser, categoryController.getCategories);
router.delete("/categories/:id", verifyUser, categoryController.deleteCategory);

exports.router = router;
