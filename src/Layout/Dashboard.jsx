import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaBell,
  FaThLarge,
  FaCog,
  FaMoon,
  FaTimes,
  FaHome,
  FaClipboardList,
  FaLaptopHouse,
  FaRegPaperPlane,
  FaUserFriends,
  FaUserPlus,
  FaUsers,
  FaAsterisk,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import logo from "../../src/assets/logo/logo.png";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const DashboardNavbar = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();

  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
  };

  // Dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Role-wise links
  const adminLinks = [
    { to: "/dashboard/admin-dashbord", icon: <FaHome />, label: "Admin Dashboard" },
  ];

  const hrLinks = [
    { to: "/dashboard/hr-home", icon: <FaHome />, label: "HR Home" },
    { to: "/dashboard/asset-list", icon: <FaClipboardList />, label: "Asset List" },
    { to: "/dashboard/addAssets", icon: <FaLaptopHouse />, label: "Add an Asset" },
    { to: "/dashboard/all-requests", icon: <FaRegPaperPlane />, label: "All Requests" },
    { to: "/dashboard/employee-list", icon: <FaUserFriends />, label: "My Employee List" },
    { to: "/dashboard/add-employee", icon: <FaUserPlus />, label: "Add an Employee" },
  ];

  const employeeLinks = [
    { to: "/dashboard/emHome", icon: <FaHome />, label: "Employee Home" },
    { to: "/dashboard/my-assets", icon: <FaClipboardList />, label: "My Assets" },
    { to: "/dashboard/my-team", icon: <FaUsers />, label: "My Team" },
    { to: "/dashboard/request-asset", icon: <FaAsterisk />, label: "Request for Asset" },
  ];

  // Set links by role
  let links = [];
  if (!isLoading) {
    if (role === "admin") links = adminLinks;
    else if (role === "hr") links = hrLinks;
    else if (role === "employee") links = employeeLinks;
  }

  return (
    <>
      {/* Navbar */}
      <header className="w-full bg-white border-b flex items-center justify-between px-4 py-2 shadow-sm fixed top-0 z-30">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="ABSTACK Logo" className="h-8" />
        </div>

        {/* Center: Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden sm:flex mx-auto w-full max-w-sm md:max-w-md relative"
        >
          <IoSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search something.."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm text-black focus:outline-none w-full placeholder-gray-400"
          />
        </form>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <FaBell className="text-gray-500 text-lg cursor-pointer" />
          <FaThLarge className="text-gray-500 text-lg cursor-pointer hidden sm:block" />
          <FaCog className="text-gray-500 text-lg cursor-pointer hidden sm:block" />
          <FaMoon className="text-gray-500 text-lg cursor-pointer hidden md:block" />

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={
                  user?.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.displayName || "User"}
              </span>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  My Account
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Support
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Toggle (Mobile) */}
          <FaBars
            className="text-gray-600 text-xl cursor-pointer sm:hidden"
            onClick={() => setSidebarOpen(true)}
          />
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-12 left-0 h-[calc(100%-56px)] w-64 bg-white shadow-lg z-20 
        transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end p-4 sm:hidden">
          <FaTimes
            className="text-gray-600 text-xl cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col px-4 gap-5 overflow-y-auto h-full pt-0 sm:pt-10">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            links.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="text-gray-700 hover:text-blue-600 flex items-center gap-3 py-2 rounded-md hover:bg-gray-100 transition"
                onClick={() => setSidebarOpen(false)}
              >
                {link.icon} <span>{link.label}</span>
              </Link>
            ))
          )}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="pt-14 sm:ml-64 bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardNavbar;
 