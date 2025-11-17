import { FcGoogle } from 'react-icons/fc'; // Google icon
import useAuth from '../Hooks/useAuth'; // Custom hook for authentication
import axios from 'axios'; // Axios import
import Swal from 'sweetalert2'; // SweetAlert import
import { useNavigate } from 'react-router-dom'; // Use navigate for redirection

const GoogleLogin = () => {
    const { signInWithGoogle } = useAuth(); // Get the sign-in function from useAuth
    const navigate = useNavigate(); // Initialize navigate for redirect

    // Handle Google login
    const handleGoogleLogin = async () => {
        try {
            // Sign in with Google
            const result = await signInWithGoogle();
            const user = result.user;
            console.log(user);

            // Prepare user info
            const userInfo = {
                email: user?.email,
                name: user?.displayName,
                role: '', // Role placeholder
                status: 'requested',
            };

            // Send user info to the backend
            const res = await axios.post(`http://localhost:5000/users/${user?.email}`, userInfo);

            if (res.data.insertedId) {
                console.log('User added successfully');
                // SweetAlert success message
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'You have logged in with Google.',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    // Navigate to home after a short delay
                    navigate('/');
                });
            } else if (res.data.existingUser) {
                console.log('User already exists, login successful');
                // SweetAlert success message
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'You are already registered.',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    // Navigate to home after a short delay
                    navigate('/');
                });
            }
        } catch (error) {
            console.error("Error during Google login:", error);
            // SweetAlert error message
            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: 'Something went wrong. Please try again.',
            });
        }
    };

    return (
        <div className="flex justify-center">
            <button
                onClick={handleGoogleLogin}
                className="flex items-center px-10 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:border-gray-400 transition duration-300 ease-in-out focus:outline-none"
            >
                <FcGoogle className="text-2xl mr-3" />
                <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>
        </div>
    );
};

export default GoogleLogin;
