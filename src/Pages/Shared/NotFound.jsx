import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 px-4 text-center">
      <img
        src="https://i.ibb.co/6JXBM8Df/404-snow.gif"
        alt="404 Not Found"
        className="w-80 md:w-96 mb-8"
      />
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-base md:text-lg text-gray-600 mb-6 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
