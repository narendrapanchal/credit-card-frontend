import React from 'react';
import {  useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate=useNavigate()
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">Oops! Page not found.</p>
        <button
          onClick={handleGoHome}
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
