const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { verifyToken } = require("../middleware/validateToken.middleware");
const verifyUser = verifyToken("user");

router.post("/tasks", verifyUser, taskController.createTask);
router.get("/tasks", verifyUser, taskController.getTasks);
router.put("/tasks/:id", verifyUser, taskController.updateTask);
router.delete("/tasks/:id", verifyUser, taskController.deleteTask);

exports.router = router;
