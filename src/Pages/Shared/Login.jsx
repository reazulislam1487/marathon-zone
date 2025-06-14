import Lottie from "lottie-react";
import React, { useContext } from "react";
import { motion } from "motion/react";
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

    // .catch((error) => {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Login Failed",
    //     text: error.message,
    //     timer: 1500,
    //     confirmButtonText: "OK",
    //   });
    // });
  };

  return (
    <div className="hero bg-base-200 min-h-screen overflow-x-hidden flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 px-4 md:px-12">
        <div className="text-center w-full">
          <Lottie
            animationData={RegisterAnimation}
            style={{ width: "400px", maxWidth: "100%" }}
            loop={true}
          />
        </div>
        <div className="card bg-white w-full max-w-sm shrink-0 shadow-xl rounded-lg">
          <div className="card-body px-8 py-10 mx-auto ">
            <form onSubmit={handleLogin} className="space-y-5">
              <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
                Login now!
              </h1>

              <label className="label font-semibold text-blue-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input w-full input-bordered border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md"
                required
              />

              <label className="label font-semibold text-blue-600">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input w-full input-bordered border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md"
                required
              />

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
                className="btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-4 rounded-md transition-all"
              >
                Login
              </button>

              <p className="text-sm text-center mt-4 text-gray-600">
                Do not Have any Account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Register
                </Link>
              </p>
            </form>

            <div className="divider">OR</div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log("hover started!")}
              className="mt-4 text-center"
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
