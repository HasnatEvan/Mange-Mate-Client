import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AssetsTable from "./AssetsTable";
import { MdSync } from "react-icons/md";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  MdCategory,
  MdBusiness,
  MdDevices
} from "react-icons/md";
import { FiPackage } from "react-icons/fi";

const RequestForAssets = () => {
  const [searchText, setSearchText] = useState("");
  const [availability, setAvailability] = useState("all");
  const [assetType, setAssetType] = useState("all");

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/assets");
      return data;
    },
  });

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.assetsName.toLowerCase().includes(searchText.toLowerCase()) ||
      asset.companyName.toLowerCase().includes(searchText.toLowerCase());

    const matchesAvailability =
      availability === "all" ||
      (availability === "available" && asset.quantity > 0) ||
      (availability === "out-of-stock" && asset.quantity === 0);

    const matchesType =
      assetType === "all" || asset.assetsType === assetType;

    return matchesSearch && matchesAvailability && matchesType;
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <MdSync className="animate-spin text-blue-600 text-4xl" />
        <span className="text-blue-600 text-lg ml-2">Loading Assets...</span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">

        {/* ================= EMPTY STATE ================= */}
        {filteredAssets.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white/70 backdrop-blur-md p-8 border border-gray-200 rounded-2xl shadow-xl text-center max-w-md mx-auto">
              <MdSync className="text-blue-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Assets Found</h2>
              <p className="text-gray-600">
                No asset matches your search or filters. Try adjusting your search keywords or filter options.
              </p>
            </div>
          </div>

        ) : (
          <>
            {/* ================= SEARCH + FILTER (Desktop Only) ================= */}
            <div className="hidden md:flex items-center justify-between gap-4 mb-6">

              {/* SEARCH */}
              <div className="relative w-full md:w-1/3">
                <FaSearch className="absolute left-4 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by asset name or company..."
                  className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-300 
                  bg-white shadow-sm text-gray-700 placeholder-gray-500
                  focus:ring-2 focus:ring-blue-500 outline-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              {/* FILTERS */}
              <div className="flex gap-3">

                {/* Availability Filter */}
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 shadow bg-white 
                  text-gray-700 placeholder-gray-500
                  focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Availability</option>
                  <option value="available">Available</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>

                {/* Type Filter */}
                <select
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 shadow bg-white 
                  text-gray-700 placeholder-gray-500
                  focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="returnable">Returnable</option>
                  <option value="non-returnable">Non-returnable</option>
                </select>

              </div>
            </div>

            {/* ================= EXCEL STYLE TABLE ================= */}
            <div className="hidden md:block bg-white rounded-xl shadow-xl border border-gray-300 overflow-auto max-h-[75vh]">

              <table className="min-w-full border-collapse text-sm">

                {/* Excel Header */}
                <thead className="bg-gradient-to-b from-blue-200 to-blue-300 text-gray-800 sticky top-0 border-b border-gray-400">
                  <tr>
                    <th className="p-3 border-r border-gray-300 font-semibold text-center">Company</th>
                    <th className="p-3 border-r border-gray-300 font-semibold text-center">Asset Name</th>
                    <th className="p-3 border-r border-gray-300 font-semibold text-center">Type</th>
                    <th className="p-3 border-r border-gray-300 font-semibold text-center">Qty</th>
                    <th className="p-3 font-semibold text-center">Action</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {filteredAssets.map((asset) => (
                    <tr
                      key={asset._id}
                      className="hover:bg-blue-50 transition-colors border-b border-gray-300 text-gray-600"
                    >
                      <td className="p-3 text-center border-r border-gray-300">{asset.companyName}</td>
                      <td className="p-3 text-center border-r border-gray-300">{asset.assetsName}</td>
                      <td className="p-3 text-center border-r border-gray-300 capitalize">
                        {asset.assetsType}
                      </td>
                      <td className="p-3 text-center border-r border-gray-300">{asset.quantity}</td>
                      <td className="p-3 text-center">
                        <AssetsTable asset={asset} refetch={refetch} />
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="md:hidden space-y-4 mt-4 ">
              {filteredAssets.map((asset) => (
                <div key={asset._id} className="bg-white/80 p-5 rounded-xl shadow text-gray-600">

                  {/* Company */}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <MdBusiness className="text-blue-600" /> Company
                    </span>
                    <span>{asset.companyName}</span>
                  </div>

                  {/* Name */}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <MdDevices className="text-green-600" /> Name
                    </span>
                    <span>{asset.assetsName}</span>
                  </div>

                  {/* Type */}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <MdCategory className="text-purple-600" /> Type
                    </span>
                    <span>{asset.assetsType}</span>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <FiPackage className="text-yellow-600" /> Quantity
                    </span>
                    <span>{asset.quantity}</span>
                  </div>

                  {/* Button */}
                  <div className="mt-4">
                    <AssetsTable asset={asset} refetch={refetch} mobile />
                  </div>

                </div>
              ))}
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default RequestForAssets;
