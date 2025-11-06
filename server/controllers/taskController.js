const Task = require("../models/Task");
const User = require("../models/User");
// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    if (!title) return res.status(400).json({ msg: "Title required" });

    const task = new Task({
      user: req.user.id,
      title,
      status: status || "pending",
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createTask,
  getTasks,
};
