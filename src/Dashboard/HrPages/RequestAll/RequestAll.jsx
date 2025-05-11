import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AllRequestTable from "./AllRequestTable";
import { MdSync } from "react-icons/md";
import { useState } from "react";

const RequestAll = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/hr-request/${user?.email}`);
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center text-base md:text-lg font-medium text-primary">
        <MdSync className="animate-spin inline-block mr-2 text-2xl text-primary" />
        Loading...
      </div>
    );

  const sortedRequests = [...requests].sort((a, b) => {
    return new Date(b.requestDate) - new Date(a.requestDate);
  });

  const filteredRequests = sortedRequests.filter((request) => {
    const name = request?.employ?.name?.toLowerCase() || "";
    const email = request?.employ?.email?.toLowerCase() || "";
    const status = request?.status?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    const matchesSearch = name.includes(search) || email.includes(search);
    const matchesStatus =
      statusFilter === "All" || status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 mt-8 text-black">
      {/* 🔍 Search & Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-48 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

      {/* 🖥️ Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Asset Name</th>
              <th className="border px-3 py-2">Asset Type</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Request Date</th>
              <th className="border px-3 py-2">Note</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <AllRequestTable
                key={request._id}
                request={request}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile View */}
      <div className="space-y-4 md:hidden">
        {filteredRequests.map((request) => (
          <AllRequestTable
            key={request._id}
            request={request}
            refetch={refetch}
            isMobile={true}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredRequests.length === 0 && (
        <div className="text-center text-gray-500 mt-4 text-sm">
          No matching requests found.
        </div>
      )}
    </div>
  );
};

export default RequestAll;
