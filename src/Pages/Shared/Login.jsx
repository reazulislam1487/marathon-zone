import Lottie from "lottie-react";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";

import RegisterAnimation from "../../assets/RegisterAnimation.json";
import { AuthContext } from "../../Contexts/AuthContext";
import SocialLogin from "../Home/SocialLogin";
import usePageTitle from "../../hooks/usePageTitle";
import Swal from "sweetalert2";

const Login = () => {
  usePageTitle("Login");

  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        form.reset();
        navigate(from);
        Swal.fire({
          title: "Good job!",
          text: "Login successful",
          icon: "success",
          timer: 1500,
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text:
            error.code === "auth/wrong-password"
              ? "Wrong password"
              : error.code === "auth/user-not-found"
              ? "No account found with this email"
              : "Something went wrong",
          timer: 2000,
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="hero bg-base-200 overflow-x-hidden flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 px-4 md:px-12">
        {/* Animation */}
        <div className="text-center w-full">
          <Lottie
            animationData={RegisterAnimation}
            style={{ width: "400px", maxWidth: "100%" }}
            loop
          />
        </div>

        {/* Login Card */}
        <div className="card bg-white w-full max-w-sm shrink-0 shadow-xl rounded-xl">
          <div className="card-body px-4 mx-auto">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Title */}
              <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text mb-4 text-center">
                Login Now
              </h1>

              {/* Email Input */}
              <div>
                <label className="label font-semibold text-blue-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="input w-full input-bordered border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="label font-semibold text-blue-600">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="input w-full input-bordered border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md"
                  required
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to=""
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                className="btn bg-blue-600 hover:bg-blue-700 text-white w-full rounded-md transition-all"
              >
                Login
              </motion.button>

              {/* Register Link */}
              <p className="text-sm text-center text-gray-600">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Register
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

export default Login;
