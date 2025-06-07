import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <img
        src="https://i.ibb.co/6JXBM8Df/404-snow.gif"
        alt="404 Not Found"
        className="w-96 mb-8"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-6 text-lg">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
