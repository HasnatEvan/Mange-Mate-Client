import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { Player } from "@lottiefiles/react-lottie-player"; // Import Player
import lottie from "../../src/assets/Lottie/lottie.json"; // Import your lottie animation

const Login = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await signIn(email, password);

            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome back!",
                timer: 2000,
                showConfirmButton: false,
            });

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            console.error("Login failed:", error.message);

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message || "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white text-gray-500 p-4">
            {/* Lottie Animation */}
            <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
                <Player
                    autoplay
                    loop
                    src={lottie}
                    style={{ height: "400px", width: "400px" }}
                />
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="bg-white p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="text-right mb-4">
                    <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/join-employee" className="text-[#FD8E29] hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
