import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "../Api/utiles";
import { motion } from "framer-motion";

// React Icons
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaBuilding,
  FaImage,
  FaCheckCircle,
  FaRegClock,
} from "react-icons/fa";

const SignupEmploy = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value.trim();
    const companyName = form.companyName.value.trim();
    const photo = form.photo.files[0];
    const email = form.email.value.trim();
    const password = form.password.value;
    const dob = form.dob.value;
    const gender = form.gender.value;

    try {
      setLoading(true);

      const photoURL = photo ? await imageUpload(photo) : null;

      await createUser(email, password);
      await updateUserProfile(name, photoURL);

      const employUserInfo = {
        name,
        companyName,
        gender,
        photoURL,
        email,
        dob,
        role: "",
        status: "requested",
      };

      await axios.post(`http://localhost:5000/users/${email}`, employUserInfo);

      form.reset();
      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const formAnim = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-700 px-4 py-10">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-10 w-full max-w-6xl">

        {/* =============== LEFT SIDE =============== */}
        <motion.div
          className="w-full lg:w-1/2 text-left space-y-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
            Welcome to Our Company
          </h3>

          <p className="text-gray-600 mb-6">
            Become part of a team where innovation, dedication, and growth are valued.
            Complete your profile to get started!
          </p>

          {/* Steps */}
          <div className="space-y-3">
            <h4 className="text-xl font-semibold text-blue-600">Steps to Join:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Fill in your full name, company name, and upload a profile photo.</li>
              <li>Set a secure password for your account.</li>
              <li>Submit your application and wait for HR approval.</li>
              <li>Once approved, access your personalized dashboard.</li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="text-xl font-semibold text-blue-600">Features You'll Enjoy:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-orange-500" /> Access your tasks and updates in real-time.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-orange-500" /> Notifications for approvals & requests.
              </li>
              <li className="flex items-center gap-2">
                <FaRegClock className="text-orange-500" /> Save time with automated workflows.
              </li>
            </ul>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h4 className="text-xl font-semibold text-blue-600">Benefits for Employees:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-orange-500" /> Streamlined HR processes.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-orange-500" /> Improved transparency.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-orange-500" /> Real-time updates & alerts.
              </li>
            </ul>
          </div>

          <p className="mt-6 text-gray-600">
            <strong>Note:</strong> Your company name must match the official records for verification.
          </p>
        </motion.div>

        {/* =============== RIGHT FORM =============== */}
        <motion.div
          className="flex flex-col gap-6 w-full lg:w-1/2"
          variants={formAnim}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={handleSignup} className="bg-white p-8 shadow-lg rounded-lg w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
              Sign Up as Employee
            </h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block mb-1 font-medium flex items-center gap-2"><FaUser /> Full Name</label>
              <input type="text" name="name" required placeholder="Enter your full name"
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Company Name */}
            <div className="mb-4">
              <label className="block mb-1 font-medium flex items-center gap-2"><FaBuilding /> Company Name</label>
              <input type="text" name="companyName" required placeholder="Enter company name"
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block mb-1 font-medium flex items-center gap-2"><FaUser /> Gender</label>
              <select name="gender" required
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Profile Photo */}
            <div className="mb-4">
              <label className="block mb-1 font-medium flex items-center gap-2"><FaImage /> Profile Photo</label>
              <input type="file" name="photo" accept="image/*"
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 font-medium flex items-center gap-2"><FaEnvelope /> Email</label>
              <input type="email" name="email" required placeholder="Enter your email"
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1 font-medium flex items-center gap-2"><FaLock /> Password</label>
              <input type="password" name="password" required placeholder="Create a password"
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* DOB */}
            <div className="mb-6">
              <label className="block mb-1 font-medium flex items-center gap-2"><FaCalendarAlt /> Date of Birth</label>
              <input type="date" name="dob" required
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className={`w-full py-2 rounded transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}>
              {loading ? <span className="loading loading-ring loading-xl"></span> : "Sign Up"}
            </button>

            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#FD8E29] font-medium hover:underline">
                Login
              </Link>
            </p>
          </form>

          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md text-center text-sm">
            <p><strong>Note:</strong> HR approval required before accessing dashboard.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SignupEmploy;
