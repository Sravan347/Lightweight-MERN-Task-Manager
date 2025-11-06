import React from 'react';

export default function TaskItem({ task, onUpdate, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Task Info */}
      <div>
        <strong
          className={`block text-lg ${
            task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'
          }`}
        >
          {task.title}
        </strong>
        <div
          className={`text-sm ${
            task.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
          }`}
        >
          {task.status}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            onUpdate(task._id, {
              status: task.status === 'pending' ? 'completed' : 'pending',
            })
          }
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            task.status === 'pending'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
          }`}
        >
          {task.status === 'pending' ? 'Mark Done' : 'Mark Pending'}
        </button>

        <button
          onClick={() => {
            const newTitle = prompt('Edit title', task.title);
            if (newTitle !== null) onUpdate(task._id, { title: newTitle });
          }}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
