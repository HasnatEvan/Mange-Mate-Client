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
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../../src/assets/logo/logo.png";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import { FaExclamationTriangle } from "react-icons/fa";
const DashboardNavbar = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Redirect only when visiting /dashboard
  useEffect(() => {
    if (!isLoading && role && location.pathname === "/dashboard") {
      if (role === "admin") navigate("/dashboard/admin-dashbord");
      if (role === "hr") navigate("/dashboard/hr-home");
      if (role === "employee") navigate("/dashboard/emHome");
    }
  }, [role, isLoading, location.pathname, navigate]);

  // SEARCH BAR WORKING
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/dashboard/search?query=${searchQuery}`);
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ROLE NOT FOUND → NO NAVBAR, NO SIDEBAR, ONLY MESSAGE
if (!isLoading && !role) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md text-center max-w-md">
        
        {/* Warning Icon */}
        <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-red-600">No Role Assigned</h2>

        <p className="text-gray-700 mt-3">
          Your account does not have any assigned role.<br/>
          Please contact the administrator.
        </p>

        {/* Optional Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Home
        </button>

      </div>
    </div>
  );
}

  // LINKS
  const commonLinks = [
    { to: "/", icon: <FaHome />, label: "Home" },
  ];

  const adminLinks = [
    { to: "/dashboard/admin-dashbord", icon: <FaHome />, label: "Admin Dashboard" },
  ];

  const hrLinks = [
    { to: "/dashboard/hr-home", icon: <FaHome />, label: "Dashboard" },
    { to: "/dashboard/asset-list", icon: <FaClipboardList />, label: "Asset List" },
    { to: "/dashboard/addAssets", icon: <FaLaptopHouse />, label: "Add an Asset" },
    { to: "/dashboard/all-requests", icon: <FaRegPaperPlane />, label: "All Requests" },
    { to: "/dashboard/employee-list", icon: <FaUserFriends />, label: "My Employee List" },
    { to: "/dashboard/add-employee", icon: <FaUserPlus />, label: "Add an Employee" },
  ];

  const employeeLinks = [
    { to: "/dashboard/emHome", icon: <FaHome />, label: "Dashboard" },
    { to: "/dashboard/my-assets", icon: <FaClipboardList />, label: "My Assets" },
    { to: "/dashboard/my-team", icon: <FaUsers />, label: "My Team" },
    { to: "/dashboard/request-asset", icon: <FaAsterisk />, label: "Request for Asset" },
  ];

  let topLinks = [];
  if (!isLoading) {
    if (role === "admin") topLinks = [...adminLinks];
    else if (role === "hr") topLinks = [...hrLinks];
    else if (role === "employee") topLinks = [...employeeLinks];
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full bg-white text-gray-700 flex items-center justify-between px-4 py-2 fixed top-0 z-30">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden sm:flex mx-auto w-full max-w-sm md:max-w-md relative"
        >
          <IoSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search something..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm text-black w-full"
          />
        </form>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-3 sm:gap-4">
          <FaBell className="text-gray-500 text-lg cursor-pointer" />
          <FaThLarge className="text-gray-500 text-lg cursor-pointer hidden sm:block" />
          <FaCog className="text-gray-500 text-lg cursor-pointer hidden sm:block" />
          <FaMoon className="text-gray-500 text-lg cursor-pointer hidden md:block" />

          {/* PROFILE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm text-gray-700 hidden sm:block">{user?.displayName}</span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white  rounded-md shadow-lg py-1">
                <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100">My Account</button>
                <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100">Support</button>
                <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>

          {/* MOBILE SIDEBAR BUTTON */}
          <FaBars
            className="text-gray-600 text-xl cursor-pointer sm:hidden"
            onClick={() => setSidebarOpen(true)}
          />
        </div>
      </header>

      {/* SIDEBAR */}
      <div
        className={`fixed top-12 left-0 h-[calc(100%-56px)] text-gray-800 w-64 bg-white shadow-lg z-20 transition-transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        {/* MOBILE CLOSE */}
        <div className="flex justify-end p-4 sm:hidden">
          <FaTimes className="text-gray-600 text-xl cursor-pointer" onClick={() => setSidebarOpen(false)} />
        </div>

        {/* SIDEBAR MENU */}
        <nav className="flex flex-col justify-between h-full px-4 overflow-y-auto">
          {/* TOP LINKS */}
          <div className="flex flex-col gap-5 pt-4">
            {topLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-md transition 
                  ${isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}`
                }
              >
                {link.icon} <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* BOTTOM HOME LINK */}
          <div className="pb-6 border-t border-gray-200 pt-4">
            {commonLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-md transition 
                  ${isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}`
                }
              >
                {link.icon} <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <main className="pt-14 sm:ml-64 bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardNavbar;
