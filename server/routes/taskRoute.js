const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createTask } = require("../controllers/taskController");

router.post('/',authMiddleware,createTask);
module.exports = router;