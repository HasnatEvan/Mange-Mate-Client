import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import RequestedEmploy from "./RequestedEmploy";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";

import { MdSync } from "react-icons/md";
import { FaUser, FaUsers, FaUserCheck, FaClock, FaSearch } from "react-icons/fa";

const AddEmploy = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [gender, setGender] = useState("all");
  const [role, setRole] = useState("all");

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["requested-users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/requested-user");
      return response.data.data;
    },
  });

  // Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <MdSync className="animate-spin text-primary text-3xl" />
        <p className="ml-2 text-lg font-semibold text-primary">Loading...</p>
      </div>
    );
  }

  // =====================
  // FILTERED DATA
  // =====================
  const filtered = requests
    .filter((r) =>
      // 🔥 FIXED → companyName added in search
      `${r.name} ${r.email} ${r.companyName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((r) => (gender === "all" ? true : r.gender === gender))
    .filter((r) => (role === "all" ? true : r.role === role))
    .sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      if (sort === "newest") return b.timestamp - a.timestamp;
      if (sort === "oldest") return a.timestamp - b.timestamp;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ===================== */}
        {/* TOP 4 CARDS */}
        {/* ===================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {/* Total Requests */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 
                  flex flex-col items-center justify-center text-center 
                  hover:shadow-lg transition">
            <FaUsers className="text-blue-600 text-4xl mb-3" />
            <p className="text-gray-600 text-sm">Total Requests</p>
            <h2 className="text-3xl font-extrabold text-gray-900">{requests.length}</h2>
          </div>

          {/* Pending */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 
                  flex flex-col items-center justify-center text-center 
                  hover:shadow-lg transition">
            <FaClock className="text-yellow-500 text-4xl mb-3" />
            <p className="text-gray-600 text-sm">Pending</p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {requests.filter((r) => r.role !== "employee").length}
            </h2>
          </div>

          {/* Approved */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 
                  flex flex-col items-center justify-center text-center 
                  hover:shadow-lg transition">
            <FaUserCheck className="text-green-600 text-4xl mb-3" />
            <p className="text-gray-600 text-sm">Approved</p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {requests.filter((r) => r.role === "employee").length}
            </h2>
          </div>

          {/* Logged HR */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 
                  flex flex-col items-center justify-center text-center 
                  hover:shadow-lg transition">
            <FaUser className="text-purple-600 text-4xl mb-3" />
            <p className="text-gray-600 text-sm">Logged HR</p>
            <h2 className="text-xl font-bold text-gray-900 truncate w-40">
              {user?.displayName || "No Name Found"}
            </h2>
          </div>

        </div>




        {/* ============================= */}
        {/* SEARCH + SORT + FILTER BARS */}
        {/* ============================= */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">

  {/* Search */}
  <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 shadow-sm flex items-center gap-3 focus-within:border-blue-500 transition">
    <FaSearch className="text-blue-600 text-xl" />
    <input
      type="text"
      placeholder="Search name, email or company..."
      className="w-full outline-none text-gray-800 bg-transparent"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {/* Sort */}
  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="bg-blue-50 p-3 rounded-xl border border-blue-200 shadow-sm text-gray-800 focus:border-blue-500 focus:ring-blue-300 transition"
  >
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
    <option value="az">A–Z Name</option>
    <option value="za">Z–A Name</option>
  </select>

  {/* Gender Filter */}
  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="bg-blue-50 p-3 rounded-xl border border-blue-200 shadow-sm text-gray-800 focus:border-blue-500 focus:ring-blue-300 transition"
  >
    <option value="all">All Genders</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>

  {/* Role Filter */}
  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="bg-blue-50 p-3 rounded-xl border border-blue-200 shadow-sm text-gray-800 focus:border-blue-500 focus:ring-blue-300 transition"
  >
    <option value="all">All Status</option>
    <option value="employee">Approved</option>
  </select>

</div>



        {/* ===================== */}
        {/* TABLE */}
        {/* ===================== */}
        <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-auto border border-gray-200 max-h-[75vh]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-blue-600 text-white">
              <tr>
                <th className="p-3 border-r">Photo</th>
                <th className="p-3 border-r">Name</th>
                <th className="p-3 border-r">Company</th>
                <th className="p-3 border-r">Gender</th>
                <th className="p-3 border-r">Email</th>
                <th className="p-3 border-r">DOB</th>
                <th className="p-3 border-r">Timestamp</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((request) => (
                <RequestedEmploy
                  key={request._id}
                  request={request}
                  refetch={refetch}
                  hrEmail={user?.email}
                  isTable={true}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW */}
        <div className="block md:hidden space-y-4">
          {filtered.map((request) => (
            <RequestedEmploy
              key={request._id}
              request={request}
              refetch={refetch}
              hrEmail={user?.email}
              isTable={false}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AddEmploy;
