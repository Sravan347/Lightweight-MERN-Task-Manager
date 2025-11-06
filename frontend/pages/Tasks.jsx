import React, { useEffect, useState } from "react";
import API from "../src/api";
import { useNavigate } from "react-router-dom";
import AddTaskForm from "../components/AddTaskForm";
import TaskItem from "../components/TaskItem";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else setError("Failed to load tasks");
    }
  };

  const addTask = async (title) => {
    try {
      const res = await API.post("/tasks", { title });
      setTasks((prev) => [res.data, ...prev]);
    } catch (err) {
      setError("Failed to add");
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await API.put(`/tasks/${id}`, updates);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setError("Failed to update");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">Your Tasks</h2>
        </div>

        {/* Add Task Form */}
        <div className="mb-6">
          <AddTaskForm onAdd={addTask} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
