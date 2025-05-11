import { useState } from 'react';
import useAuth from '../Hooks/useAuth';
import { imageUpload } from '../Api/utiles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// React Icons import
import { FaUser, FaBuilding, FaImage, FaEnvelope, FaLock, FaBirthdayCake, FaBoxOpen } from 'react-icons/fa';
import { MdSync } from 'react-icons/md';  // Import the sync icon for the spinner

const SignupHr = () => {
    const { createUser, updateUserProfile } = useAuth();
    const [selectedPackage, setSelectedPackage] = useState('');
    const [loading, setLoading] = useState(false);  // Track loading state
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const companyName = form.companyName.value;
        const photo = form.photo.files[0];
        const email = form.email.value;
        const password = form.password.value;
        const dob = form.dob.value;
        const packageType = form.package.value;

        const packagePriceMap = {
            '5': 5,
            '10': 8,
            '20': 15
        };
        const packagePrice = packagePriceMap[packageType];

        try {
            setLoading(true);  // Set loading state to true when form is submitting
            const photoURL = photo ? await imageUpload(photo) : null;

            await createUser(email, password);
            await updateUserProfile(name, photoURL);

            const hrUserInfo = {
                name,
                companyName,
                photoURL,
                email,
                dob,
                packageType,
                packagePrice,
                role: 'hr'
            };

            const res = await axios.post(`http://localhost:5000/users/${email}`, hrUserInfo);
            console.log('User saved to database:', res.data);

            form.reset();
            setSelectedPackage('');

            Swal.fire({
                icon: 'success',
                title: 'Signup successful!',
                text: 'You have successfully signed up as an HR manager.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Go to Home',
            }).then(() => {
                navigate('/');
            });

        } catch (error) {
            console.error('Error signing up:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Signup failed!',
                text: 'Something went wrong. Please try again.',
            });
        } finally {
            setLoading(false);  // Set loading state to false after submission is complete
        }
    };

    return (
        <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-around bg-white text-gray-600 px-4 py-10 gap-10">
            {/* Info Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6 leading-tight">
                    Why Join as an HR Manager?
                </h2>
                <ul className="list-disc list-inside space-y-4 text-base md:text-lg px-4 lg:px-0">
                    <li>Efficiently manage company assets and employees.</li>
                    <li>Flexible packages tailored to your team size.</li>
                    <li>Secure sign-up with your company logo and details.</li>
                    <li>Track employee requests and approval statuses.</li>
                    <li>Save time and streamline HR processes.</li>
                </ul>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSignup} className="bg-white p-6 md:p-8 w-full max-w-md rounded-lg shadow-lg space-y-5">
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
                    Sign Up as HR Manager
                </h2>

                {/* Name */}
                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaUser className="text-gray-400 mr-3" />
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your full name"
                        className="w-full outline-none"
                    />
                </div>

                {/* Company Name */}
                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaBuilding className="text-gray-400 mr-3" />
                    <input
                        type="text"
                        name="companyName"
                        required
                        placeholder="Company name"
                        className="w-full outline-none"
                    />
                </div>

                {/* Company Logo */}
                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaImage className="text-gray-400 mr-3" />
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        required
                        className="w-full text-gray-500"
                    />
                </div>

                {/* Email */}
                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaEnvelope className="text-gray-400 mr-3" />
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Your email"
                        className="w-full outline-none"
                    />
                </div>

                {/* Password */}
                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaLock className="text-gray-400 mr-3" />
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Create password"
                        className="w-full outline-none"
                    />
                </div>

                {/* Date of Birth */}
                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaBirthdayCake className="text-gray-400 mr-3" />
                    <input
                        type="date"
                        name="dob"
                        required
                        className="w-full outline-none"
                    />
                </div>

                {/* Package Selection */}
                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaBoxOpen className="text-gray-400 mr-3" />
                    <select
                        name="package"
                        required
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="w-full outline-none text-gray-600"
                    >
                        <option value="" disabled>Select a package</option>
                        <option value="5">5 Members – $5</option>
                        <option value="10">10 Members – $8</option>
                        <option value="20">20 Members – $15</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? (
                        <MdSync className="animate-spin inline-block mr-2 text-white" />
                    ) : (
                        'Sign Up & Pay'
                    )}
                </button>
            </form>
        </div>
    );
};

export default SignupHr;
