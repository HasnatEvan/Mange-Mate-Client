import { useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import { imageUpload } from '../Api/utiles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // <- import toast

// React Icons import
import { FaUser, FaBuilding, FaImage, FaEnvelope, FaLock, FaBirthdayCake, FaBoxOpen, FaCheckCircle, FaRegClock } from 'react-icons/fa';

const SignupHr = () => {
    const { createUser, updateUserProfile } = useAuth();
    const [selectedPackage, setSelectedPackage] = useState('');
    const [loading, setLoading] = useState(false);
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAnimate(true);
    }, []);

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

        const packagePriceMap = { '5': 5, '10': 8, '20': 15 };
        const packagePrice = packagePriceMap[packageType];

        try {
            setLoading(true);
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

            await axios.post(`http://localhost:5000/users/${email}`, hrUserInfo);

            form.reset();
            setSelectedPackage('');

            // SUCCESS TOAST
            toast.success('Signed up successfully!', {
                duration: 3000,
                position: 'top-center'
            });


            navigate('/');

        } catch (error) {
            console.error('Error signing up:', error.message);

            // ERROR TOAST
            toast.error('Signup failed. Try again.', {
                duration: 3000,
                position: 'top-center'
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around bg-white text-gray-600 px-4 py-10 gap-10 max-w-6xl mx-auto">
            <Toaster /> {/* <- Toast container */}

            {/* Info Section */}
            <div className={`w-full lg:w-1/2 text-left space-y-8 transform transition-all duration-700 ease-out
                ${animate ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-500 mb-6 leading-tight">
                    Why Join as an HR Manager?
                </h2>

                <ul className="list-disc list-inside space-y-4 text-base md:text-lg text-left">
                    <li>Efficiently manage company assets and employees.</li>
                    <li>Flexible packages tailored to your team size.</li>
                    <li>Secure sign-up with your company logo and details.</li>
                    <li>Track employee requests and approval statuses.</li>
                    <li>Save time and streamline HR processes.</li>
                </ul>

                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-500">Features You’ll Love</h3>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center gap-2">
                            <FaCheckCircle className="text-orange-500" /> Real-time employee tracking
                        </li>
                        <li className="flex items-center gap-2">
                            <FaCheckCircle className="text-orange-500" /> Manage multiple departments
                        </li>
                        <li className="flex items-center gap-2">
                            <FaCheckCircle className="text-orange-500" /> Automated notifications and approvals
                        </li>
                        <li className="flex items-center gap-2">
                            <FaRegClock className="text-orange-500" /> Save hours of manual work
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-blue-500">Benefits for Your Company</h3>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center gap-2">
                            <FaCheckCircle className="text-orange-500" /> Better resource allocation
                        </li>
                        <li className="flex items-center gap-2">
                            <FaCheckCircle className="text-orange-500" /> Improved employee satisfaction
                        </li>
                        <li className="flex items-center gap-2">
                            <FaCheckCircle className="text-orange-500" /> Increased productivity
                        </li>
                    </ul>
                </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSignup} className={`bg-white p-6 md:p-8 w-full max-w-md rounded-lg shadow-lg space-y-5 transform transition-all duration-700 ease-out
                ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-500">
                    Sign Up as HR Manager
                </h2>

                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaUser className="text-gray-400 mr-3" />
                    <input type="text" name="name" required placeholder="Your full name" className="w-full outline-none" />
                </div>

                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaBuilding className="text-gray-400 mr-3" />
                    <input type="text" name="companyName" required placeholder="Company name" className="w-full outline-none" />
                </div>

                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaImage className="text-gray-400 mr-3" />
                    <input type="file" name="photo" accept="image/*" required className="w-full text-gray-500" />
                </div>

                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaEnvelope className="text-gray-400 mr-3" />
                    <input type="email" name="email" required placeholder="Your email" className="w-full outline-none" />
                </div>

                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaLock className="text-gray-400 mr-3" />
                    <input type="password" name="password" required placeholder="Create password" className="w-full outline-none" />
                </div>

                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaBirthdayCake className="text-gray-400 mr-3" />
                    <input type="date" name="dob" required className="w-full outline-none" />
                </div>

                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <FaBoxOpen className="text-gray-400 mr-3" />
                    <select name="package" required value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)} className="w-full outline-none text-gray-600">
                        <option value="" disabled>Select a package</option>
                        <option value="5">5 Members – $5</option>
                        <option value="10">10 Members – $8</option>
                        <option value="20">20 Members – $15</option>
                    </select>
                </div>

                <button type="submit" disabled={loading} className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}>
                    {loading ? <span className="loading loading-ring loading-xl"></span> : 'Sign Up & Pay'}
                </button>
            </form>
        </div>
    );
};

export default SignupHr;
