import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "motion/react";

import RegisterAnimation from "../../assets/RegisterAnimation.json";
import { Link } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import SocialLogin from "../Home/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
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
        console.log(user);
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
            });

            form.reset();
          })
          .catch((error) => {
            alert("Error updating user profile:", error.message);
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Registration Failed!",
          text: error.message || "An error occurred",
          icon: "error",
        });
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
            <form onSubmit={handleRegister} className="fieldset">
              <h1 className="text-5xl font-bold">Register now!</h1>

              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Your Name"
                name="name"
              />
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
              />
              <label className="label">Photo </label>
              <input
                type="url"
                className="input"
                placeholder="Photo URL"
                name="photo"
              />
              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                />
                {error && <p className="text-error text-sm">{error}</p>}
                <button
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute top-3.5 right-6 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div>
                <Link to="/login" className="link link-hover">
                  Forgot password?
                </Link>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                Register
              </button>
              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 underline">
                  Login
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
              <SocialLogin></SocialLogin>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
