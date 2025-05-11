import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

// Import React Icons
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt } from "react-icons/fa";
import { MdSync } from "react-icons/md";

const SignupEmploy = () => {
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const dob = form.dob.value;

        try {
            setLoading(true);
            await createUser(email, password);
            await updateUserProfile(name, null);

            const employUserInfo = {
                name,
                email,
                dob,
                role: '',
                status: 'requested',
            };

            const res = await axios.post(`http://localhost:5000/users/${email}`, employUserInfo);
            console.log("User saved:", res.data);

            Swal.fire({
                icon: 'success',
                title: 'Signup Successful!',
                text: 'Your account request has been submitted.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Go to Dashboard',
            }).then(() => {
                navigate('/');
            });

            form.reset();
        } catch (error) {
            console.error("Signup error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed!',
                text: error.message || 'Something went wrong. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-around bg-white text-gray-700 px-4 py-10 gap-10">
            {/* Left Content */}
            <div className="max-w-md text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-700">Welcome to Our Company</h3>
                <p className="mb-6 text-gray-600">
                    By signing up, you become part of an amazing team where we value hard work, dedication, and innovation. Join us and make an impact!
                </p>
                <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                        <span className="font-bold">Step 1:</span> Fill in your personal details.
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="font-bold">Step 2:</span> Set your password and secure your account.
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="font-bold">Step 3:</span> Submit your application and join our team!
                    </li>
                </ul>
            </div>

            {/* Form Content */}
            <div className="flex flex-col gap-6 w-full max-w-md">
                <form onSubmit={handleSignup} className="bg-white p-8 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
                        Sign Up as Employee
                    </h2>

                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium flex items-center gap-2">
                            <FaUser /> Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium flex items-center gap-2">
                            <FaEnvelope /> Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium flex items-center gap-2">
                            <FaLock /> Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* DOB */}
                    <div className="mb-6">
                        <label className="block mb-1 font-medium flex items-center gap-2">
                            <FaCalendarAlt /> Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dob"
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    >
                        {loading ? (
                            <MdSync className="animate-spin inline-block mr-2 text-white" />
                        ) : (
                            "Sign Up"
                        )}
                    </button>

                    {/* Login link */}
                    <p className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#FD8E29] hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </form>

                {/* Access Pending Info */}
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md text-center text-sm">
                    <p>
                        <strong>Note:</strong> Until an HR approves your employment request, you will not be able to view anything on your dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupEmploy;
