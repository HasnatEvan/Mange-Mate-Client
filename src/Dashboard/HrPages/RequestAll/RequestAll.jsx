import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AllRequestTable from "./AllRequestTable";
import { MdSync } from "react-icons/md";
import {
  FaSearch,
  FaClock,
  FaCheckCircle,
  FaList,
  FaUndo,
  FaBoxOpen
} from "react-icons/fa";
import { useState, useMemo, useEffect } from "react";

const RequestAll = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/hr-request/${user?.email}`);
      return data || [];
    },
    enabled: !!user?.email,
  });

  // Debounce searchTerm -> debouncedSearch (300ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Memoized sortedRequests
  const sortedRequests = useMemo(() => {
    const arr = [...(requests || [])];
    if (sortBy === "latest") {
      arr.sort((a, b) => new Date(b.requestDate || 0) - new Date(a.requestDate || 0));
    } else if (sortBy === "oldest") {
      arr.sort((a, b) => new Date(a.requestDate || 0) - new Date(b.requestDate || 0));
    } else if (sortBy === "nameAZ") {
      arr.sort((a, b) =>
        (a.employ?.name || "").localeCompare(b.employ?.name || "", undefined, { sensitivity: "base" })
      );
    } else if (sortBy === "nameZA") {
      arr.sort((a, b) =>
        (b.employ?.name || "").localeCompare(a.employ?.name || "", undefined, { sensitivity: "base" })
      );
    }
    return arr;
  }, [requests, sortBy]);

  // Memoized filteredRequests
  const filteredRequests = useMemo(() => {
    const search = debouncedSearch;
    return sortedRequests.filter((request) => {
      const name = (request.employ?.name || "").toLowerCase();
      const email = (request.employ?.email || "").toLowerCase();
      const assetsName = (request.assetsName || "").toLowerCase();
      const type = (request.assetsType || "").toLowerCase();
      const status = (request.status || "").toLowerCase();

      const matchesSearch =
        !search ||
        name.includes(search) ||
        email.includes(search) ||
        assetsName.includes(search);

      const matchesStatus = statusFilter === "All" || status === statusFilter.toLowerCase();
      const matchesType = !typeFilter || type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [sortedRequests, debouncedSearch, statusFilter, typeFilter]);

  // Summary counts (memoized)
  const summary = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => (r.status || "").toLowerCase() === "pending").length;
    const approved = requests.filter((r) => (r.status || "").toLowerCase() === "approved").length;
    const returned = requests.filter((r) => (r.status || "").toLowerCase() === "returned").length;
    return { total, pending, approved, returned };
  }, [requests]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MdSync className="text-blue-600 text-4xl animate-spin" />
        <p className="ml-2 text-blue-600 text-lg font-semibold">Loading Requests...</p>
      </div>
    );
  }

  // No requests at all
  if (requests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <div className="bg-white/70 backdrop-blur-md p-8 border border-gray-200 rounded-2xl shadow-xl text-center max-w-md">
          <FaBoxOpen className="text-blue-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Requests Found</h2>
          <p className="text-gray-600">
            Currently there are no asset requests. Once requests are made, they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="p-4 max-w-7xl mx-auto">

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <SummaryCard icon={<FaList className="text-blue-600 text-4xl" />} label="Total Requests" value={summary.total} border="border-blue-200" />
          <SummaryCard icon={<FaClock className="text-yellow-600 text-4xl" />} label="Pending" value={summary.pending} border="border-yellow-200" />
          <SummaryCard icon={<FaCheckCircle className="text-green-600 text-4xl" />} label="Approved" value={summary.approved} border="border-green-200" />
          <SummaryCard icon={<FaUndo className="text-purple-600 text-4xl" />} label="Returned" value={summary.returned} border="border-purple-300" />
        </div>

        {/* SEARCH + FILTER (DESKTOP) */}
        <div className="hidden md:block mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-3 text-gray-600" />
              <input
                type="text"
                placeholder="Search by name, email or asset..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700">
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Returned">Returned</option>
            </select>

            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700">
              <option value="">All Types</option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-Returnable</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700">
              <option value="">Sort By</option>
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="nameAZ">Name (A → Z)</option>
              <option value="nameZA">Name (Z → A)</option>
            </select>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-300 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-blue-600 text-white sticky top-0 z-10">
              <tr>
                <th className="p-3 border-r border-gray-300">Asset Name</th>
                <th className="p-3 border-r border-gray-300">Type</th>
                <th className="p-3 border-r border-gray-300">Email</th>
                <th className="p-3 border-r border-gray-300">Name</th>
                <th className="p-3 border-r border-gray-300">Date</th>
                <th className="p-3 border-r border-gray-300">Note</th>
                <th className="p-3 border-r border-gray-300">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-600">
                    No requests match your filters.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <AllRequestTable key={request._id} request={request} refetch={refetch} isMobile={false} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="space-y-4 md:hidden mt-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white/80 p-4 rounded-2xl text-center">No requests match your filters.</div>
          ) : (
            filteredRequests.map((request) => (
              <AllRequestTable key={request._id} request={request} refetch={refetch} isMobile={true} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, label, value, border }) => (
  <div className={`bg-white/70 backdrop-blur-lg shadow-lg border ${border} rounded-2xl p-5 flex items-center gap-4`}>
    {icon}
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
    </div>
  </div>
);

export default RequestAll;
