import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Check if current route is homepage
  const isHome = location.pathname === '/';

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold tracking-wide">Task Manager</h1>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {/* Home link (always visible except on home itself if you want to hide it) */}
          {!isHome && (
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors duration-200"
            >
              Home
            </Link>
          )}

          {/* Auth Links */}
          <Link
            to="/login"
            className="hover:text-blue-200 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-blue-200 transition-colors duration-200"
          >
            Register
          </Link>

          {/* Logout only shown if not on Home and user is logged in */}
          {!isHome && token && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
