import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MyAssetsListTable from "./MyAssetsListTable";
import { MdSync } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaBoxOpen, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";

const MyAssetsList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assets/hr`);
            return data;
        },
    });

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    // Summary data
    const totalAssets = assets.length;
    const totalReturnable = assets.filter(a => a.assetsType === "returnable").length;
    const totalNonReturnable = assets.filter(a => a.assetsType === "non-returnable").length;
    const outOfStock = assets.filter(a => a.quantity === 0).length;

    // Filter logic
    const filteredAssets = assets
        .filter((a) => a.assetsName.toLowerCase().includes(search.toLowerCase()))
        .filter((a) => (typeFilter ? a.assetsType === typeFilter : true))
        .sort((a, b) => {
            if (sortBy === "az") return a.assetsName.localeCompare(b.assetsName);
            if (sortBy === "za") return b.assetsName.localeCompare(a.assetsName);
            if (sortBy === "qtyHigh") return b.quantity - a.quantity;
            if (sortBy === "qtyLow") return a.quantity - b.quantity;
            return 0;
        });

    // ================= LOADING =================
    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex items-center gap-3">
                    <MdSync className="animate-spin text-blue-600 text-3xl" />
                    <p className="text-blue-600 text-lg font-semibold">Loading Assets...</p>
                </div>
            </div>
        );

    // ================= EMPTY STATE =================
    if (assets.length === 0)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <div className="bg-white/70 backdrop-blur-md p-8 border border-gray-200 rounded-2xl shadow-xl text-center max-w-md">
                    <FaBoxOpen className="text-blue-500 text-5xl mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Assets Found</h2>
                    <p className="text-gray-600">
                        You currently have no assigned assets. Once assets are available, they will show here.
                    </p>
                </div>
            </div>
        );

    // ================= MAIN UI =================
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="p-4 max-w-7xl mx-auto">

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                    <div className="bg-white/70 backdrop-blur-md shadow-lg border border-blue-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-xl transition">
                        <FaBoxOpen className="text-blue-600 text-4xl" />
                        <div>
                            <p className="text-gray-600 text-sm">Total Assets</p>
                            <h2 className="text-2xl font-bold text-gray-900">{totalAssets}</h2>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md shadow-lg border border-green-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-xl transition">
                        <FaCheckCircle className="text-green-600 text-4xl" />
                        <div>
                            <p className="text-gray-600 text-sm">Returnable</p>
                            <h2 className="text-2xl font-bold text-gray-900">{totalReturnable}</h2>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md shadow-lg border border-red-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-xl transition">
                        <FaTimesCircle className="text-red-600 text-4xl" />
                        <div>
                            <p className="text-gray-600 text-sm">Non-Returnable</p>
                            <h2 className="text-2xl font-bold text-gray-900">{totalNonReturnable}</h2>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md shadow-lg border border-orange-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-xl transition">
                        <FaExclamationTriangle className="text-orange-500 text-4xl" />
                        <div>
                            <p className="text-gray-600 text-sm">Out of Stock</p>
                            <h2 className="text-2xl font-bold text-gray-900">{outOfStock}</h2>
                        </div>
                    </div>

                </div>

                {/* SEARCH & FILTER (md and up) */}
                <div className="hidden md:flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

                    <div className="relative w-full md:w-1/3">
                        <FaSearch className="absolute left-4 top-3 text-gray-700 text-lg" />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm 
                            text-gray-700 placeholder-gray-500 
                            focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">

                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm 
                            text-gray-700 bg-white 
                            focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="returnable">Returnable</option>
                            <option value="non-returnable">Non-Returnable</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm 
                            text-gray-700 bg-white 
                            focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Sort By</option>
                            <option value="az">Name (A → Z)</option>
                            <option value="za">Name (Z → A)</option>
                            <option value="qtyHigh">Quantity (High → Low)</option>
                            <option value="qtyLow">Quantity (Low → High)</option>
                        </select>

                    </div>
                </div>

                {/* TABLE (Desktop) */}
                <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-auto border border-gray-200 max-h-[75vh]">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-blue-600 text-white text-md">
                            <tr>
                                <th className="p-3 text-center border-r border-blue-300">Name</th>
                                <th className="p-3 text-center border-r border-blue-300">Type</th>
                                <th className="p-3 text-center border-r border-blue-300">Qty</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAssets.map((asset) => (
                                <MyAssetsListTable
                                    key={asset._id}
                                    asset={asset}
                                    refetch={refetch}
                                    isTable={true}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE CARDS */}
                <div className="block md:hidden space-y-4">
                    {filteredAssets.map((asset) => (
                        <div key={asset._id} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                            <MyAssetsListTable asset={asset} refetch={refetch} isTable={false} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MyAssetsList;
