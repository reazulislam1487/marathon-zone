import React, { useContext } from "react";
import userPic from "/userPic.png";

import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // const avatarURL = user?.photoURL || userPic;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      confirmButtonColor: "#2563EB", // blue
      cancelButtonColor: "#6B7280", // gray
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              title: "Logged out!",
              text: "You have been logged out successfully.",
              icon: "success",
              confirmButtonColor: "#2563EB",
              timer: 1500,
            });
            navigate("/login");
          })
          .catch((error) => {
            Swal.fire({
              title: "Oops!",
              text: error.message,
              icon: "error",
              confirmButtonColor: "#2563EB",
            });
          });
      }
    });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "hover:text-blue-500 transition"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/marathons"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "hover:text-blue-500 transition"
          }
        >
          Marathons
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "hover:text-blue-500 transition"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="navbar bg-gradient-to-b from-blue-100 via-white to-blue-50 shadow-md p-0 pr-2 md:px-6 md:py-3 sticky top-0 z-50">
      <div className="navbar-start flex items-center gap-4">
        <div className="dropdown ">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden p-2 rounded-md hover:bg-blue-100 focus:bg-blue-100 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <NavLink
          to="/"
          className="hidden sm:flex text-2xl font-extrabold text-blue-700 select-none"
        >
          Marathon Zone
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            <div className="relative group inline-block">
              <img
                src={user?.photoURL ? user?.photoURL : userPic}
                alt="User"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <span className="absolute bg-black bg-opacity-80 text-white text-sm rounded px-3 py-1 top-1/2 right-full -translate-y-1/2 mr-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10 whitespace-nowrap">
                {user.displayName}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Log out
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
