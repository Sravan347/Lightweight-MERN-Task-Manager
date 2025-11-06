import React from 'react';
const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Task Manager</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your tasks easily and efficiently.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
