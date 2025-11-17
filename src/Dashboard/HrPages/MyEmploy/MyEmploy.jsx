import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { MdSync } from "react-icons/md";
import {
  FaUser,
  FaEnvelope,
  FaUserTimes,
  FaCalendar,
  FaBuilding,
  FaSearch,
} from "react-icons/fa";
import { useState } from "react";

const MyEmploy = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: myEmployees = [], isLoading, refetch } = useQuery({
    queryKey: ["my-employ", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-employ`, {
        params: { hrEmail: user?.email },
      });
      return res.data.data;
    },
  });

  const handleCancelEmploy = async (empId) => {
    const confirm = await Swal.fire({
      title: "Cancel Employment?",
      text: "Are you sure you want to cancel this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/cancel-employ/${empId}`);
        if (res.data.success) {
          Swal.fire("Cancelled!", "Employee role has been removed.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", "Failed to cancel employment.", "error");
      }
    }
  };

  // FILTER & SORT
  const filteredEmployees = myEmployees
    .filter((emp) =>
      [emp.name, emp.email].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      let A = a[sortField]?.toLowerCase();
      let B = b[sortField]?.toLowerCase();
      if (sortOrder === "asc") return A > B ? 1 : -1;
      return A < B ? 1 : -1;
    });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <MdSync className="animate-spin text-blue-600 text-3xl" />
        <p className="text-blue-600 text-lg font-semibold ml-2">Loading employees...</p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 min-h-screen text-black bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto w-full">

        {/* EMPTY STATE */}
        {filteredEmployees.length === 0 ? (
          <div className="flex items-center justify-center h-[80vh]">
            <div className="bg-white/80 p-8 rounded-2xl shadow-xl border border-gray-300 text-center">
              <FaUser className="text-blue-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">No Employees Found</h2>
              <p className="text-gray-600 mt-2">You currently have no employees.</p>
            </div>
          </div>
        ) : (
          <>
            {/* TOP 4 STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">

              {/* Total */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl shadow border border-blue-200 text-center">
                <FaUser className="text-blue-600 text-3xl mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-gray-700">Total Employees</h3>
                <p className="text-3xl font-extrabold text-blue-700">{filteredEmployees.length}</p>
              </div>

              {/* Active */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl shadow border border-green-200 text-center">
                <FaUser className="text-green-600 text-3xl mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-gray-700">Active Employees</h3>
                <p className="text-3xl font-extrabold text-green-700">{filteredEmployees.length}</p>
              </div>

              {/* Male */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-2xl shadow border border-indigo-200 text-center">
                <FaUser className="text-indigo-600 text-3xl mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-gray-700">Male Employees</h3>
                <p className="text-3xl font-extrabold text-indigo-700">
                  {filteredEmployees.filter((e) => e.gender === "male").length}
                </p>
              </div>

              {/* Female */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-2xl shadow border border-pink-200 text-center">
                <FaUser className="text-pink-600 text-3xl mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-gray-700">Female Employees</h3>
                <p className="text-3xl font-extrabold text-pink-700">
                  {filteredEmployees.filter((e) => e.gender === "female").length}
                </p>
              </div>

            </div>

            {/* SEARCH + SORT (Desktop only) */}
            <div className="hidden md:flex justify-between items-center gap-4 mb-5">
              {/* Search */}
              <div className="relative w-1/2">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full p-3 pl-12 rounded-xl border border-gray-400 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Sorts */}
              <div className="flex gap-3">
                <select
                  className="p-3 rounded-xl border border-gray-400 shadow-sm"
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="companyName">Sort by Company</option>
                  <option value="dob">Sort by DOB</option>
                </select>

                <select
                  className="p-3 rounded-xl border border-gray-400 shadow-sm"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </select>
              </div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-auto border border-gray-300 max-h-[75vh]">
              <table className="w-full min-w-[900px] text-sm border-collapse">
                <thead className="sticky top-0 bg-blue-600 text-white">
                  <tr className="border-b border-gray-300">
                    <th className="p-3 text-center border-r border-gray-300">#</th>
                    <th className="p-3 text-center border-r border-gray-300">Photo</th>
                    <th className="p-3 text-center border-r border-gray-300">Name</th>
                    <th className="p-3 text-center border-r border-gray-300">Email</th>
                    <th className="p-3 text-center border-r border-gray-300">Company</th>
                    <th className="p-3 text-center border-r border-gray-300">DOB</th>
                    <th className="p-3 text-center border-gray-300">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.map((emp, index) => (
                    <tr
                      key={emp._id}
                      className="hover:bg-blue-50 transition-all border-b border-gray-300"
                    >
                      <td className="p-3 text-center border-r border-gray-300">{index + 1}</td>

                      <td className="p-3 text-center border-r border-gray-300">
                        <img
                          src={emp.photoURL}
                          className="w-10 h-10 rounded-full mx-auto object-cover"
                        />
                      </td>

                      <td className="p-3 text-center border-r border-gray-300">{emp.name}</td>

                      <td className="p-3 text-center border-r border-gray-300">{emp.email}</td>

                      <td className="p-3 text-center border-r border-gray-300">{emp.companyName}</td>

                      <td className="p-3 text-center border-r border-gray-300">{emp.dob}</td>

                      <td className="p-3 text-center border-gray-300">
                        <button
                          onClick={() => handleCancelEmploy(emp._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 mx-auto"
                        >
                          <FaUserTimes /> Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="block md:hidden space-y-4 mt-4">
              {filteredEmployees.map((emp, index) => (
                <div
                  key={emp._id}
                  className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg 
                             space-y-5 transition-all hover:shadow-xl hover:scale-[1.01]"
                >
                  {/* NUMBER */}
                  <div className="font-semibold text-gray-700">#{index + 1}</div>

                  {/* PROFILE */}
                  <div className="flex items-center gap-4">
                    <img
                      src={emp.photoURL}
                      className="w-16 h-16 rounded-full object-cover shadow-md ring-2 ring-white"
                    />

                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{emp.name}</h3>
                      <p className="text-sm text-gray-500">Employee</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200"></div>

                  {/* EMAIL */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaEnvelope className="text-blue-600 text-lg" />
                      <span>Email</span>
                    </div>
                    <span className="text-gray-900 text-sm">{emp.email}</span>
                  </div>

                  {/* COMPANY */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaBuilding className="text-green-600 text-lg" />
                      <span>Company</span>
                    </div>
                    <span className="text-gray-900 text-sm">{emp.companyName}</span>
                  </div>

                  {/* DOB */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaCalendar className="text-purple-600 text-lg" />
                      <span>DOB</span>
                    </div>
                    <span className="text-gray-900 text-sm">{emp.dob}</span>
                  </div>

                  {/* ACTION */}
                  <button
                    onClick={() => handleCancelEmploy(emp._id)}
                    className="w-full py-3 bg-red-500 text-white rounded-xl shadow 
                               flex items-center justify-center gap-2 hover:bg-red-600 active:scale-95"
                  >
                    <FaUserTimes /> Cancel
                  </button>
                </div>
              ))}
            </div>

          </>
        )}

      </div>
    </div>
  );
};

export default MyEmploy;
