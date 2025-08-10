import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";
import usePageTitle from "../../hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("404 - Page Not Found");

  return (
    <main
      role="main"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 px-6 text-center"
    >
      <FaExclamationTriangle
        className="text-blue-600 mb-6"
        size={64}
        aria-hidden="true"
      />
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
        404: Page Not Found
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-md mx-auto">
        The page you’re looking for doesn’t exist or may have been moved. Please
        check the URL or return home.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition"
        aria-label="Go back to homepage"
      >
        Go Back Home
      </Link>
    </main>
  );
};

export default NotFound;
