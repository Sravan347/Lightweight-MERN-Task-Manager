const Task = require("../models/Task");
const User = require("../models/User");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    if (!title) {
      return res.status(400).json({ msg: "Title required" });
    }

    const task = await Task.create({
      user: req.user.id,
      title,
      status: status || "pending",
    });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    if (title !== undefined) task.title = title;
    if (status !== undefined) task.status = status;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found or not authorized" });
    }

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
