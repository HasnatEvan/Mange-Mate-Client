import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AssetsTable from "./AssetsTable";
import { MdSync } from "react-icons/md";
import { useState } from "react";
import { MdBusiness, MdDevices, MdCategory } from "react-icons/md";
import { FiPackage } from "react-icons/fi"; // Quantity icon


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
    const matchesSearch = asset.assetsName.toLowerCase().includes(searchText.toLowerCase());
    const matchesAvailability =
      availability === "all" ||
      (availability === "available" && asset.quantity > 0) ||
      (availability === "out-of-stock" && asset.quantity === 0);
    const matchesType = assetType === "all" || asset.assetsType === assetType;

    return matchesSearch && matchesAvailability && matchesType;
  });

  if (isLoading) return (
    <div className="text-center text-base md:text-lg font-medium text-primary">
      <MdSync className="animate-spin inline-block mr-2 text-2xl text-primary" />
      Loading...
    </div>
  );

  return (
    <div className="mt-8 text-black px-4">
      {/* 🔍 Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search by asset name"
          className="border px-3 py-2 rounded w-full md:w-1/3"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded w-full md:w-1/4"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="all">All Availability</option>
          <option value="available">Available</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

        <select
          className="border px-3 py-2 rounded w-full md:w-1/4"
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* 🖥️ Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="py-2 px-4 border-b">Company Name</th>
              <th className="py-2 px-4 border-b">Assets Name</th>
              <th className="py-2 px-4 border-b">Assets Type</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <AssetsTable key={asset._id} asset={asset} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredAssets.map((asset) => (
          <div key={asset._id} className=" p-4 rounded shadow bg-white">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MdBusiness className="text-blue-600" />
                Company Name:
              </span>
              <span className="text-sm">{asset.companyName}</span>
            </div>

            <div className="flex justify-between items-center mt-1">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MdDevices className="text-green-600" />
                Assets Name:
              </span>
              <span className="text-sm">{asset.assetsName}</span>
            </div>

            <div className="flex justify-between items-center mt-1">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MdCategory className="text-purple-600" />
                Assets Type:
              </span>
              <span className="text-sm">{asset.assetsType}</span>
            </div>

            <div className="flex justify-between items-center mt-1">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FiPackage className="text-yellow-600" />
                Quantity:
              </span>
              <span className="text-sm">{asset.quantity}</span>
            </div>

            <div className="mt-4">
              <AssetsTable asset={asset} refetch={refetch} mobile />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestForAssets;
