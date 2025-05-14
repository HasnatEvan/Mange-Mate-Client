import { useState, useRef, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiGrid, FiUserPlus, FiUserCheck, FiLogIn, FiLogOut, FiUser } from 'react-icons/fi'; // React Icons Import
import useAuth from '../Hooks/useAuth';
import logo from '../../src/assets/logo/logo.png'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { user, logOut } = useAuth();


    // console.log(user)

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <header className="bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-lg text-black sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="h-12 w-auto" />
                </Link>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6 font-medium items-center">
                    <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
                        <FiHome /> Home
                    </Link>
                    <Link to="/dashboard" className="hover:text-blue-600 flex items-center gap-1">
                        <FiGrid /> Dashboard
                    </Link>
                    {!user ? (
                        <>
                            <Link to="/join-employee" className="hover:text-blue-600 flex items-center gap-1">
                                <FiUserPlus /> Join as Employee
                            </Link>
                            <Link to="/join-hr" className="hover:text-blue-600 flex items-center gap-1">
                                <FiUserCheck /> Join as HR Manager
                            </Link>
                            <Link to="/login" className="hover:text-blue-600 flex items-center gap-1">
                                <FiLogIn /> Login
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile" className="hover:text-blue-600 flex items-center gap-1">
                                <FiUser /> {user?.displayName}
                            </Link>
                            <button onClick={logOut} className="hover:text-blue-600 flex items-center gap-1">
                                <FiLogOut /> Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={`md:hidden bg-white shadow-md text-center transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen py-4' : 'max-h-0 py-0'}`}
            >
                <nav className="flex flex-col px-6 pb-4 pt-2 space-y-3 font-medium">
                    <Link to="/" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-2">
                        <FiHome /> Home
                    </Link>
                    <Link to="/dashboard" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-2">
                        <FiGrid /> Dashboard
                    </Link>
                    {!user ? (
                        <>
                            <Link to="/join-employee" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-2">
                                <FiUserPlus /> Join as Employee
                            </Link>
                            <Link to="/join-hr" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-2">
                                <FiUserCheck /> Join as HR Manager
                            </Link>
                            <Link to="/login" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-2">
                                <FiLogIn /> Login
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile" onClick={closeMenu} className="hover:text-blue-600 flex items-center gap-2">
                                <FiUser /> {user?.displayName}
                            </Link>
                            <button onClick={logOut} className="hover:text-blue-600 flex items-center gap-2">
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
