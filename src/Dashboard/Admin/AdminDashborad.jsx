import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUsers, FaUserTie, FaUserFriends, FaBoxes } from "react-icons/fa";
import Card from "./Card";
import Chart from "./Chart";

const AdminDashborad = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["admin-summary"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/admin-summary", {
                withCredentials: true,
            });
            return res.data.data;
        },
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-blue-600 text-lg font-semibold animate-pulse">
                    Loading...
                </p>
            </div>
        );

    const stats = [
        {
            title: "TOTAL USERS",
            value: data.totalUsers,
            icon: <FaUsers size={18} className="text-white" />,
            color: "bg-emerald-500",
            graphColor: "bg-emerald-300",
        },
        {
            title: "TOTAL HR",
            value: data.totalHr,
            icon: <FaUserTie size={18} className="text-white" />,
            color: "bg-blue-500",
            graphColor: "bg-blue-300",
        },
        {
            title: "TOTAL EMPLOYEES",
            value: data.totalEmployee,
            icon: <FaUserFriends size={18} className="text-white" />,
            color: "bg-red-500",
            graphColor: "bg-red-300",
        },
        {
            title: "TOTAL ASSETS",
            value: data.totalAssets,
            icon: <FaBoxes size={18} className="text-white" />,
            color: "bg-yellow-500",
            graphColor: "bg-yellow-300",
        },
    ];

    return (
        <div className="px-4 py-6 min-h-screen space-y-6">

            {/* Top Stats Grid → Fully Responsive */}
            <div className="grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                gap-4"
            >
                {stats.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-sm rounded-lg p-4 border hover:shadow-md transition h-[150px]"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-[10px] font-semibold text-gray-500">{item.title}</h2>
                            <div className={`p-2 rounded-md ${item.color}`}>{item.icon}</div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
                        <p className="text-[10px] text-gray-500 mt-0.5">↑ Since last month</p>

                        <div className="mt-3 h-6 w-full overflow-hidden">
                            <div
                                className={`h-1 w-[150%] ${item.graphColor} rounded-full animate-pulse`}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full-width User Cards Section */}
            <div className="w-full">
                <Chart/>
            </div>
            <div className="w-full">
                <Card />
            </div>

        </div>
    );
};

export default AdminDashborad;
