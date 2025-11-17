import { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaInfoCircle, FaEnvelope, FaBlog, FaLifeRing, FaPhone } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Topbar = () => {
    const [showSupportOptions, setShowSupportOptions] = useState(false);
    const supportRef = useRef(null);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (supportRef.current && !supportRef.current.contains(event.target)) {
                setShowSupportOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-gray-50 py-2 text-gray-600">
            <div className=" flex flex-col sm:flex-row items-center justify-between px-4 gap-2 sm:gap-0">

                {/* ✅ Left Section */}
                <div className="flex items-center gap-2 text-center sm:text-left">
                    <FaMapMarkerAlt className="text-blue-500 text-sm sm:text-base" />
                    <p className="text-xs sm:text-sm text-gray-600">
                        Manhattan square. 124 avenue. Bodrum
                    </p>
                </div>

                {/* ✅ Right Section */}
                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">

                    {/* Page Links */}
                    <a href="#" className="hidden sm:flex items-center gap-1 hover:text-blue-600 transition">
                        <FaInfoCircle className="text-blue-500" /> About
                    </a>
                    <a href="#" className="hidden sm:flex items-center gap-1 hover:text-blue-600 transition">
                        <FaEnvelope className="text-blue-500" /> Contact
                    </a>
                    <a href="#" className="hidden sm:flex items-center gap-1 hover:text-blue-600 transition">
                        <FaBlog className="text-blue-500" /> Blogs
                    </a>

                    {/* Support Dropdown */}
                    <div ref={supportRef} className="relative">
                        <button
                            onClick={() => setShowSupportOptions(!showSupportOptions)}
                            className="hidden sm:flex items-center gap-1 hover:text-blue-600 transition"
                        >
                            <FaLifeRing className="text-blue-500" /> Support
                        </button>

                        {showSupportOptions && (
                            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-10">
                                <a href="mailto:support@example.com" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    <FaEnvelope style={{ color: "#D44638" }} /> Email
                                </a>
                                <a href="tel:+880123456789" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    <FaPhone style={{ color: "#25D366" }} /> Call
                                </a>
                                <a href="https://wa.me/880123456789" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    <FaWhatsapp style={{ color: "#25D366" }} /> WhatsApp
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Social Media Icons with real colors */}
                    <a href="#" className="transition">
                        <FaFacebookF style={{ color: "#1877F2" }} />
                    </a>
                    <a href="#" className="transition">
                        <FaTwitter style={{ color: "#1DA1F2" }} />
                    </a>
                    <a href="#" className="transition">
                        <FaInstagram style={{ color: "#E1306C" }} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
