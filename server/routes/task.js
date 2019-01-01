const express = require("express");
const router = express.Router();

const {authenticate} = require('../middleware/authenticate');
const TaskController = require("../controllers/task");

router.post("/task", authenticate, TaskController.add);

router.get("/task", authenticate, TaskController.get);

router.get("/task/:id", authenticate, TaskController.getById);

router.delete("/task/:id", authenticate, TaskController.delete);

router.patch("/task/:id", authenticate, TaskController.update);

module.exports = router;