import { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUsers, FaUserTie, FaUserFriends } from "react-icons/fa";

const Card = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [page, setPage] = useState({});

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["users-summary"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/users-summary");
            return res.data.data;
        },
    });

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleDocClick = (e) => {
            if (!openMenu) return;

            const menuEl = document.querySelector(`[data-menu-id="${openMenu}"]`);
            const btnEl = document.querySelector(`[data-btn-id="${openMenu}"]`);

            if (
                menuEl &&
                btnEl &&
                !menuEl.contains(e.target) &&
                !btnEl.contains(e.target)
            ) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleDocClick);
        return () => document.removeEventListener("mousedown", handleDocClick);
    }, [openMenu]);

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-40 col-span-3">
                <p className="text-blue-500 text-base font-semibold animate-pulse">
                    Loading user summary...
                </p>
            </div>
        );

    const stats = [
        {
            title: "All Users",
            value: data.allUsers,
            icon: <FaUsers size={16} className="text-white" />,
            gradient: "from-indigo-500 to-purple-500",
        },
        {
            title: "HR Users",
            value: data.hrUsers,
            icon: <FaUserTie size={16} className="text-white" />,
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            title: "Employees",
            value: data.employeeUsers,
            icon: <FaUserFriends size={16} className="text-white" />,
            gradient: "from-green-500 to-teal-500",
        },
    ];

    // 🔥 ROLE CHANGE API + TOAST
    const handleRoleChange = async (user, role) => {
        try {
            const res = await axios.patch(
                `http://localhost:5000/update-role/${user._id}`,
                { role },
                { withCredentials: true }
            );

            toast.success(res.data.message || "Role updated!");
            setOpenMenu(null);
            refetch();
        } catch (error) {
            toast.error("Failed to update role");
            console.error(error);
        }
    };

    // DELETE USER API
    const handleDelete = async (user) => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/delete-user/${user._id}`,
                { withCredentials: true }
            );

            toast.success(res.data.message);
            setOpenMenu(null);
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete user");
        }
    };

    const usersPerPage = 6;

    const getPageData = (array, index) => {
        const currentPage = page[index] || 1;
        const start = (currentPage - 1) * usersPerPage;
        const end = start + usersPerPage;
        return array.slice(start, end);
    };

    const totalPages = (len) => Math.ceil(len / usersPerPage);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-4">
            {stats.map((item, index) => {
                const currentPage = page[index] || 1;
                const paginatedUsers = getPageData(item.value, index);
                const emptySlots = usersPerPage - paginatedUsers.length;

                return (
                    <div
                        key={index}
                        className="p-3 rounded-xl shadow-md bg-white/70 backdrop-blur-lg 
                        border border-white/40 flex flex-col min-h-[380px] sm:min-h-[430px]"
                    >
                        {/* Header */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-sm font-semibold text-gray-800">{item.title}</h2>

                                <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} shadow-md`}>
                                    {item.icon}
                                </div>
                            </div>

                            <p className="text-xs text-gray-600 mb-1">
                                Showing {paginatedUsers.length} of {item.value.length} Users
                            </p>
                        </div>

                        {/* Users */}
                        <div className="flex-1 flex flex-col gap-2">
                            {paginatedUsers.map((u, i) => (
                                <div
                                    key={u._id || i}
                                    className="relative flex items-center justify-between border rounded-lg 
                                    bg-white/60 p-2 gap-2 sm:gap-3"
                                >
                                    {/* Profile */}
                                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        <img
                                            src={u.photoURL || "https://i.ibb.co/5n7sF7z/user.png"}
                                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border shadow-sm object-cover"
                                        />

                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900 text-xs truncate">{u.name}</p>

                                            <p className="text-[10px] text-gray-500 truncate">
                                                {u.companyName || "No Company"}
                                            </p>

                                            {/* ⭐ Added Timestamp */}
                                            <p className="text-[9px] text-gray-400">
                                                {new Date(u.timestamp).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Role */}
                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <p className="text-[10px] font-semibold text-gray-700">
                                                {u.role?.toUpperCase() || "NO ROLE"}
                                            </p>

                                            {(u.role !== "admin" &&
                                                u.role !== "hr" &&
                                                u.role !== "employee") && (
                                                <span
                                                    className={`text-[9px] mt-1 inline-block px-1.5 py-[2px] rounded-full
                                                        ${u.status === "active"
                                                            ? "bg-green-100 text-green-600"
                                                            : u.status === "pending"
                                                                ? "bg-yellow-100 text-yellow-600"
                                                                : "bg-red-100 text-red-600"
                                                        }`}
                                                >
                                                    {u.status || "N/A"}
                                                </span>
                                            )}
                                        </div>

                                        {/* Dropdown */}
                                        <div className="relative">
                                            <button
                                                data-btn-id={u._id}
                                                onClick={() =>
                                                    setOpenMenu(openMenu === u._id ? null : u._id)
                                                }
                                                className="p-1 hover:bg-gray-200 rounded-full"
                                            >
                                                <FaEllipsisV className="text-gray-600 text-xs" />
                                            </button>

                                            {openMenu === u._id && (
                                                <div
                                                    data-menu-id={u._id}
                                                    className="absolute right-0 top-6 w-32 bg-white shadow-lg rounded-md border p-1 text-xs z-20"
                                                >
                                                    <button
                                                        onClick={() => handleRoleChange(u, "remove")}
                                                        className="w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                                                    >
                                                        Remove Role
                                                    </button>

                                                    <button
                                                        onClick={() => handleRoleChange(u, "hr")}
                                                        className="w-full text-left px-2 py-1 text-blue-600 hover:bg-blue-50 rounded"
                                                    >
                                                        Make HR
                                                    </button>

                                                    <button
                                                        onClick={() => handleRoleChange(u, "employee")}
                                                        className="w-full text-left px-2 py-1 text-green-600 hover:bg-green-50 rounded"
                                                    >
                                                        Make Employee
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(u)}
                                                        className="w-full text-left px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Empty slots */}
                            {Array.from({ length: emptySlots }).map((_, i) => (
                                <div key={`empty-${i}`} className="p-2 border rounded-lg bg-gray-50 opacity-40"></div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center text-xs">
                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setPage((prev) => ({
                                        ...prev,
                                        [index]: (prev[index] || 1) - 1,
                                    }))
                                }
                                className={`px-3 py-1.5 rounded-lg font-medium transition-all
                                ${currentPage === 1
                                        ? "bg-blue-100 text-blue-300 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md hover:opacity-90"
                                    }`}
                            >
                                Prev
                            </button>

                            <span className="text-blue-700 font-semibold px-2 py-1 bg-blue-100 rounded-lg shadow-sm">
                                Page {currentPage} of {totalPages(item.value.length)}
                            </span>

                            <button
                                disabled={currentPage === totalPages(item.value.length)}
                                onClick={() =>
                                    setPage((prev) => ({
                                        ...prev,
                                        [index]: (prev[index] || 1) + 1,
                                    }))
                                }
                                className={`px-3 py-1.5 rounded-lg font-medium transition-all
                                ${currentPage === totalPages(item.value.length)
                                        ? "bg-blue-100 text-blue-300 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md hover:opacity-90"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Card;
