import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "motion/react";

import RegisterAnimation from "../../assets/RegisterAnimation.json";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import SocialLogin from "../Home/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import usePageTitle from "../../hooks/usePageTitle";

const Register = () => {
  usePageTitle("Register");

  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }
    setError("");

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({
              ...user,
              displayName: name,
              photoURL: photo,
            });
            Swal.fire({
              title: "Good job!",
              text: "Registration Successful",
              icon: "success",
              timer: 1500,
              confirmButtonColor: "#2563EB",
            });
            form.reset();
            navigate(from);
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message || "An error occurred while updating profile",
              icon: "error",
              confirmButtonColor: "#2563EB",
              timer: 1500,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Registration Failed!",
          text: error.message || "An error occurred",
          icon: "error",
          confirmButtonColor: "#2563EB",
          timer: 1500,
        });
      });
  };

  return (
    <div className="hero bg-base-200 overflow-x-hidden flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 px-4 md:px-12">
        <div className="text-center w-full">
          <Lottie
            animationData={RegisterAnimation}
            style={{ width: "400px", maxWidth: "100%" }}
            loop={true}
          />
        </div>
        <div className="card bg-white w-full max-w-sm  shrink-0 shadow-xl rounded-lg">
          <div className="card-body px-4 md:px-6 py-10">
            <form onSubmit={handleRegister} className="space-y-5">
              <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text mb-4 text-center">
                Register now
              </h1>
              <div className="flex flex-col md:flex-row gap-3">
                {/* Name */}
                <div className="w-full md:flex-1">
                  <label className="label font-semibold text-blue-600">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="input input-bordered w-full border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md"
                    required
                  />
                </div>

                {/* Email */}
                <div className="w-full md:flex-1">
                  <label className="label font-semibold text-blue-600">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label font-semibold text-blue-600">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="Photo URL"
                  className="input w-full input-bordered  border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md"
                />
              </div>
              <div className="relative">
                <label className="label font-semibold text-blue-600">
                  Password
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input w-full input-bordered border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md pr-12"
                  required
                />
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-8 right-4 text-blue-600 hover:text-blue-800 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} className="cursor-pointer" />
                  ) : (
                    <FaEye size={18} className="cursor-pointer" />
                  )}
                </button>
              </div>
              <div className="text-right">
                <Link
                  to=""
                  className="link link-hover text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="btn bg-blue-600 hover:bg-blue-700 text-white w-full transition-all rounded-md"
              >
                Register
              </button>
              <p className="text-sm text-center  text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Login
                </Link>
              </p>
            </form>
            {/* Divider */}
            <div className="divider">OR</div>

            {/* Social Login */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=" text-center"
            >
              <SocialLogin from={from} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
