import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiGrid,
  FiUserPlus,
  FiUserCheck,
  FiLogIn,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import logo from "../../src/assets/logo/logo.png";
import Topbar from "./Topbar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logOut } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* ✅ Topbar */}
      <Topbar />

      {/* ✅ Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center bg-white">
        {/* ✅ Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="h-10 md:h-12 lg:h-14 w-auto transition-all duration-300"
          />
        </Link>

        {/* ✅ Hamburger (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="transition-transform duration-300 active:scale-90 text-[#223666]"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* ✅ Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium text-gray-800 text-sm lg:text-base">
          <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
            <FiHome /> Home
          </Link>

          {/* Show Dashboard only if user is logged in */}
          {user && (
            <Link
              to="/dashboard"
              className="hover:text-blue-600 flex items-center gap-1"
            >
              <FiGrid /> Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/join-employee"
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <FiUserPlus /> Join as Employee
              </Link>
              <Link
                to="/join-hr"
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <FiUserCheck /> Join as HR Manager
              </Link>
              <Link
                to="/login"
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <FiLogIn /> Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <FiUser /> {user?.displayName}
              </Link>
              <button
                onClick={logOut}
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <FiLogOut /> Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden fixed right-4 top-[75px] w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-3 font-medium text-gray-700 text-sm sm:text-base">
          <Link
            to="/"
            onClick={closeMenu}
            className="hover:text-blue-600 flex items-center gap-2"
          >
            <FiHome /> Home
          </Link>

          {/* Show Dashboard only if user is logged in */}
          {user && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="hover:text-blue-600 flex items-center gap-2"
            >
              <FiGrid /> Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/join-employee"
                onClick={closeMenu}
                className="hover:text-blue-600 flex items-center gap-2"
              >
                <FiUserPlus /> Join as Employee
              </Link>

              <Link
                to="/join-hr"
                onClick={closeMenu}
                className="hover:text-blue-600 flex items-center gap-2"
              >
                <FiUserCheck /> Join as HR Manager
              </Link>

              <Link
                to="/login"
                onClick={closeMenu}
                className="hover:text-blue-600 flex items-center gap-2"
              >
                <FiLogIn /> Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="hover:text-blue-600 flex items-center gap-2"
              >
                <FiUser /> {user?.displayName}
              </Link>

              <button
                onClick={() => {
                  logOut();
                  closeMenu();
                }}
                className="hover:text-blue-600 flex items-center gap-2 text-left"
              >
                <FiLogOut /> Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
