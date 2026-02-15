import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white px-6">
      <div className="text-center max-w-2xl">

        {/* Gradient Border Card */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-transparent bg-clip-padding relative">

          {/* Gradient Border */}
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-[#9810FA] via-purple-500 to-indigo-500 -z-10"></div>

          {/* 404 Heading */}
          <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-[#9810FA] to-purple-600 bg-clip-text text-transparent mb-4">
            404
          </h1>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-8">
            The page you are looking for might have been removed, renamed,
            or is temporarily unavailable. Please check the URL or return
            to the homepage to continue exploring the platform.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              to="/"
              className="px-6 py-3 rounded-xl text-white font-medium 
              bg-gradient-to-r from-[#9810FA] to-purple-600 
              hover:scale-105 transition-all duration-200 shadow-md"
            >
              Go to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-xl border border-purple-300 text-[#9810FA] font-medium 
              hover:bg-purple-50 transition-all duration-200"
            >
              Go Back
            </button>

          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6">
          If the issue persists, please contact support.
        </p>

      </div>
    </div>
  );
};

export default NotFound;
