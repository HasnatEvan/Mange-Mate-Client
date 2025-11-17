import React from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Chart = () => {

    // Fetch Asset Monthly Stats
    const { data: assetStats, isLoading: assetLoading } = useQuery({
        queryKey: ["asset-stats"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/assets-monthly-stats");
            return res.data.data;
        }
    });

    // Fetch User Monthly Stats
    const { data: userStats, isLoading: userLoading } = useQuery({
        queryKey: ["user-stats"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/users-monthly-stats");
            return res.data.data;
        }
    });

    if (assetLoading || userLoading) {
        return <p className="text-center py-10 text-blue-500">Loading Charts...</p>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">

            {/* ----------- ASSETS STATISTICS ----------- */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow border w-full">
                <h2 className="font-semibold text-gray-700 mb-4 text-sm">
                    Statistics
                </h2>

                {/* TOP SUMMARY BOXES */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                        <p className="text-gray-500">Total Assets</p>
                        <p className="text-teal-600 text-lg font-bold">{assetStats.totalAssets}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Issued</p>
                        <p className="text-red-500 text-lg font-bold">{assetStats.issuedAssets}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Returnable</p>
                        <p className="text-indigo-500 text-lg font-bold">{assetStats.returnable}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Non-Returnable</p>
                        <p className="text-purple-500 text-lg font-bold">{assetStats.nonReturnable}</p>
                    </div>
                </div>

                {/* LINE CHART */}
                <div className="w-full h-[240px] sm:h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={assetStats.monthly}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                            <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />

                            <Tooltip />
                            <Legend iconType="circle" />

                            <Line
                                type="monotone"
                                dataKey="assets"
                                stroke="#06b6d4"
                                strokeWidth={4}
                                dot={{ r: 5, fill: "#06b6d4" }}
                            />

                            <Line
                                type="monotone"
                                dataKey="avg"
                                stroke="#6366f1"
                                strokeWidth={4}
                                strokeDasharray="6 6"
                                dot={{ r: 5, fill: "#6366f1" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ----------- USERS BAR CHART ----------- */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow border w-full">
                <h2 className="font-semibold text-gray-700 mb-4 text-sm">
                    Users Overview
                </h2>

                {/* TOP SUMMARY BOXES */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                        <p className="text-gray-500">Users</p>
                        <p className="text-green-600 text-lg font-bold">{userStats.total}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">HR</p>
                        <p className="text-blue-500 text-lg font-bold">{userStats.hr}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Employees</p>
                        <p className="text-red-500 text-lg font-bold">{userStats.employee}</p>
                    </div>
                </div>

                {/* BAR CHART */}
                <div className="w-full h-[240px] sm:h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userStats.monthly}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                            <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />

                            <Tooltip />
                            <Legend />

                            <Bar
                                dataKey="users"
                                fill="#10b981"
                                barSize={22}
                                radius={[10, 10, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default Chart;
