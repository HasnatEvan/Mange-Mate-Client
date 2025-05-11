import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import logo from '../../src/assets/logo/logo.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 border-t border-gray-200">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Company Info */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-12 w-auto mb-2" />
          </Link>
          <p className="text-base">
            Simplifying asset management for modern businesses. Join us and make managing easier.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#0149B1]">Contact Information</h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope className="text-[#0149B1]" /> hasnatevan59@gmail.com
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPhoneAlt className="text-[#0149B1]" /> +880 1814-197707
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt className="text-[#0149B1]" /> 123 Gulshan Ave, Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#0149B1]">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-6 text-2xl">
            <a href="#">
              <FaFacebookF className="hover:text-[#145dbf] text-[#1877F2]" />
            </a>
            <a href="#">
              <FaTwitter className="hover:text-[#0d8ddb] text-[#1DA1F2]" />
            </a>
            <a href="#">
              <FaLinkedinIn className="hover:text-[#084a87] text-[#0A66C2]" />
            </a>

          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t pt-4 border-gray-300 text-gray-600">
        © {new Date().getFullYear()} ManageMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
