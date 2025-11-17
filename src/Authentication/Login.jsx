import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Player } from "@lottiefiles/react-lottie-player";
import lottie from "../../src/assets/Lottie/lottie.json";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion"; // 🟢 animation import

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);

      toast.success("Login Successful.", {
        duration: 2500,
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "❌ Login failed! Try again.", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 sm:px-6 md:px-10 py-10">
      <Toaster />

      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
        {/* 🟢 Left: Login Form with animation */}
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 md:order-1 bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md lg:max-w-lg"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 text-gray-700 placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 hover:border-blue-400 transition duration-200"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 text-gray-700 placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 hover:border-blue-400 transition duration-200 pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-13 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-blue-600"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          <div className="text-right mb-5">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 flex justify-center items-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="loading loading-ring loading-xl"></span>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-sm text-gray-600 mt-5">
            Don’t have an account?{" "}
            <Link
              to="/join-employee"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </motion.form>

        {/* 🟢 Right: Lottie Animation with animation */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 md:order-2 w-full md:w-1/2 flex justify-center"
        >
          <Player
            autoplay
            loop
            src={lottie}
            className="h-[220px] sm:h-[300px] md:h-[380px] lg:h-[440px] w-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
