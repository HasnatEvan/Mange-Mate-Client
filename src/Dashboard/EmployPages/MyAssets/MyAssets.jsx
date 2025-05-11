import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdSync } from "react-icons/md";
import MyAssetsTable from "./MyAssetsTable";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employ-request/${user?.email}`);
      return data;
    },
  });

  const filteredRequests = requests.filter((req) => {
    const matchSearch = req.assetsName.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = statusFilter === "all" || req.status === statusFilter;
    const matchType = typeFilter === "all" || req.assetsType === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  if (isLoading) {
    return (
      <div className="text-center text-base md:text-lg font-medium text-primary">
        <MdSync className="animate-spin inline-block mr-2 text-2xl text-primary" />
        Loading...
      </div>
    );
  }

  return (
    <div className="px-2 md:px-6 py-4 space-y-4 mt-8 text-black">
      {/* 🔍 Search & Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by asset name..."
          className="w-full md:w-1/3 border px-3 py-2 rounded shadow-sm text-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value="all">All Types</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* 📋 Table/Card Section */}
      <div className="grid gap-4 md:hidden">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <MyAssetsTable key={request._id} request={request} refetch={refetch} isMobile />
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 text-sm">
            No assets found matching your criteria.
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full border text-sm text-left text-gray-600 shadow rounded">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
            <tr className="text-xs md:text-sm">
              <th className="px-4 py-2">Asset Name</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Request Date</th>
              <th className="px-4 py-2">Approval Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <MyAssetsTable key={request._id} request={request} refetch={refetch} />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500 text-sm">
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
