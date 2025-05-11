import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'; // useNavigate import
import {
  FaBars,
  FaTimes,
  FaHome,
  FaClipboardList,
  FaAsterisk,
  FaUserFriends,
  FaUsersCog,
  FaUserPlus,
  FaLaptopHouse,
  FaListAlt,
  FaRegPaperPlane,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import useRole from '../Hooks/useRole';
import { MdSync } from 'react-icons/md';
import logo from '../../src/assets/logo/logo.png'
import useAuth from '../Hooks/useAuth';
  import Swal from 'sweetalert2'; // import sweetalert2
// Sidebar Item Component
const SidebarItem = ({ to, icon: Icon, label, onClick }) => {
  if (!Icon) return null;
  return (
    <li>
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive
              ? 'text-[#0149B1] font-bold flex items-center gap-2 p-2 rounded bg-gray-100'
              : 'flex items-center gap-2 p-2 rounded hover:bg-gray-200'
          }
          onClick={onClick}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ) : (
        <button
          onClick={onClick}
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 w-full text-left"
        >
          <Icon />
          <span>{label}</span>
        </button>
      )}
    </li>
  );
};

// Main Dashboard Layout
const Dashboard = () => {
  const [role, isLoading] = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate initialize
  const {  logOut } = useAuth();



const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      logOut()
        .then(() => {
          Swal.fire(
            'Logged Out!',
            'You have been logged out successfully.',
            'success'
          );
          navigate('/login'); // logout এর পর login পেজে নিয়ে যাবে
        })
        .catch((error) => {
          console.error(error);
          Swal.fire(
            'Oops!',
            'Something went wrong while logging out.',
            'error'
          );
        });
    }
  });
};


  useEffect(() => {
    if (!isLoading) {
      if (role === 'hr') {
        navigate('/dashboard/hr-home');
      } else if (role === 'employee') {
        navigate('/dashboard/emHome');
      }
    }
  }, [role, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-base md:text-lg font-medium text-primary">
          <MdSync className="animate-spin inline-block mr-2 text-2xl text-primary" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden text-black">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 p-4 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out bg-white`}
      >
        {/* Sidebar Title */}
        <div className="mb-6 flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Sidebar Menu */}
        <ul className="menu space-y-2 text-gray-600">
          {role === 'hr' && (
            <>
              <SidebarItem to="/dashboard/hr-home" icon={FaHome} label="HR Home" />
              <SidebarItem to="/dashboard/asset-list" icon={FaListAlt} label="Asset List" />
              <SidebarItem to="/dashboard/addAssets" icon={FaLaptopHouse} label="Add an Asset" />
              <SidebarItem to="/dashboard/all-requests" icon={FaRegPaperPlane} label="All Requests" />
              <SidebarItem to="/dashboard/employee-list" icon={FaUsersCog} label="My Employee List" />
              <SidebarItem to="/dashboard/add-employee" icon={FaUserPlus} label="Add an Employee" />
              <div className="divider" />
            </>
          )}

          {role === 'employee' && (
            <>
              <SidebarItem to="/dashboard/emHome" icon={FaHome} label="Employee Home" />
              <SidebarItem to="/dashboard/my-assets" icon={FaClipboardList} label="My Assets" />
              <SidebarItem to="/dashboard/my-team" icon={FaUserFriends} label="My Team" />
              <SidebarItem to="/dashboard/request-asset" icon={FaAsterisk} label="Request for an Asset" />
              <div className="divider" />
            </>
          )}

          {!role && (
            <div className="text-center text-red-500 font-semibold mt-4">
              🚫 You have no assigned role. <br /> Please contact admin.
            </div>
          )}

          {/* Shared Navigation */}
          <SidebarItem to="/" icon={FaHome} label="Home" />
          <SidebarItem icon={FaSignOutAlt} label="Logout" onClick={handleLogout} />
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col overflow-y-auto bg-gray-50"
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
      >
        <div className="p-4">
          {!role ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center text-lg font-medium text-red-500">
                🚫 You have no assigned role. <br /> Please contact admin.
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
