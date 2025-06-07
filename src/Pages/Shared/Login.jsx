import Lottie from "lottie-react";
import React, { useContext } from "react";
import { motion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router";

import RegisterAnimation from "../../assets/RegisterAnimation.json";
import { AuthContext } from "../../Contexts/AuthContext";
import SocialLogin from "../Home/SocialLogin";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  console.log(location);
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((result) => {
        console.log("User logged in successfully:", result.user);
        form.reset();
        navigate(from);
      })
      .catch((error) => {
        console.error("Error logging in user:", error.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie
            animationData={RegisterAnimation}
            style={{ width: "400px" }}
            loop={true}
          />
          ;
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin} className="fieldset">
              <h1 className="text-5xl font-bold">Login now!</h1>

              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
              />
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <Link to="/login" className="link link-hover">
                  Forgot password?
                </Link>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
              <p className="text-sm text-center mt-4">
                Do not Have any Account?{" "}
                <Link to="/register" className="text-green-600 underline">
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
              <SocialLogin from={from}></SocialLogin>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
