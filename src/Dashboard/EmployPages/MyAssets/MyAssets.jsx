import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdSync } from "react-icons/md";
import MyAssetsTable from "./MyAssetsTable";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaSearch
} from "react-icons/fa";

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

  // Summary
  const total = requests.length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const returned = requests.filter((r) => r.status === "returned").length;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center gap-3">
          <MdSync className="animate-spin text-blue-600 text-3xl" />
          <p className="text-blue-600 text-lg font-semibold">Loading Your Assets...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="p-4 max-w-7xl mx-auto">

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white/70 backdrop-blur-md shadow-lg border border-blue-200 rounded-2xl p-5 flex items-center gap-4">
            <FaBoxOpen className="text-blue-600 text-4xl" />
            <div>
              <p className="text-gray-600 text-sm">Total Requests</p>
              <h2 className="text-2xl font-bold text-gray-900">{total}</h2>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md shadow-lg border border-yellow-200 rounded-2xl p-5 flex items-center gap-4">
            <FaExclamationTriangle className="text-yellow-600 text-4xl" />
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <h2 className="text-2xl font-bold text-gray-900">{pending}</h2>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md shadow-lg border border-green-200 rounded-2xl p-5 flex items-center gap-4">
            <FaCheckCircle className="text-green-600 text-4xl" />
            <div>
              <p className="text-gray-600 text-sm">Approved</p>
              <h2 className="text-2xl font-bold text-gray-900">{approved}</h2>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md shadow-lg border border-purple-200 rounded-2xl p-5 flex items-center gap-4">
            <FaTimesCircle className="text-purple-600 text-4xl" />
            <div>
              <p className="text-gray-600 text-sm">Returned</p>
              <h2 className="text-2xl font-bold text-gray-900">{returned}</h2>
            </div>
          </div>

        </div>

        {/* EMPTY */}
        {filteredRequests.length === 0 && (
          <div className="min-h-[70vh] flex justify-center items-center">
            <div className="bg-white/70 backdrop-blur-md p-8 border border-gray-300 rounded-2xl shadow-xl text-center max-w-md">
              <FaBoxOpen className="text-blue-500 text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">No Assets Found</h2>
              <p className="text-gray-600 mt-2">
                No assets match your search or filters. Try adjusting your filters.
              </p>
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        {filteredRequests.length > 0 && (
          <>
            {/* SEARCH & FILTER */}
            <div className="hidden md:flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

              {/* SEARCH */}
              <div className="relative w-full md:w-1/3">
                <FaSearch className="absolute left-4 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="
        w-full pl-12 pr-4 py-2 
        rounded-xl border border-gray-300 
        shadow-sm 
        text-gray-700 placeholder-gray-500 
        focus:ring-2 focus:ring-blue-500 
        outline-none
      "
                />
              </div>

              {/* FILTERS */}
              <div className="flex gap-3">

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="
        px-4 py-2 rounded-xl 
        border border-gray-300 
        bg-white shadow-sm 
        text-gray-700
      "
                >
                  <option value="all" className="text-gray-700">All Status</option>
                  <option value="pending" className="text-gray-700">Pending</option>
                  <option value="approved" className="text-gray-700">Approved</option>
                  <option value="returned" className="text-gray-700">Returned</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="
        px-4 py-2 rounded-xl 
        border border-gray-300 
        bg-white shadow-sm 
        text-gray-700
      "
                >
                  <option value="all" className="text-gray-700">All Types</option>
                  <option value="returnable" className="text-gray-700">Returnable</option>
                  <option value="non-returnable" className="text-gray-700">Non-Returnable</option>
                </select>

              </div>

            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white rounded-xl shadow-xl overflow-auto border border-gray-200 max-h-[75vh]">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-b from-blue-200 to-blue-300 text-gray-800 sticky top-0 border-b border-gray-400">
                  <tr>
                    <th className="p-3 text-center border-r border-gray-300">Name</th>
                    <th className="p-3 text-center border-r border-gray-300">Company</th>
                    <th className="p-3 text-center border-r border-gray-300">Type</th>
                    <th className="p-3 text-center border-r border-gray-300">Requested</th>
                    <th className="p-3 text-center border-r border-gray-300">Approved</th>
                    <th className="p-3 text-center border-r border-gray-300">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map((req) => (
                    <MyAssetsTable key={req._id} request={req} refetch={refetch} />
                  ))}
                </tbody>
              </table>
            </div>


            {/* MOBILE CARDS */}
            <div className="block md:hidden space-y-4">
              {filteredRequests.map((req) => (
                <div key={req._id} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                  <MyAssetsTable request={req} refetch={refetch} isMobile />
                </div>
              ))}
            </div>

          </>
        )}

      </div>
    </div>
  );
};

export default MyAssets;
