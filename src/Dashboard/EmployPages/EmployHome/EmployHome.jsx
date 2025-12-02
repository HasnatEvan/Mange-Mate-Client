import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import EmployChart from "./EmployChart";
import Card from "./Card";
import { MdSync, MdOutlineRequestPage, MdPendingActions, MdCheckCircle, MdAssignmentReturn } from "react-icons/md";

const EmployHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Employee Dashboard Summary
  const { data: dashboard = {}, isLoading } = useQuery({
    queryKey: ["employee-dashboard", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employee-dashboard/${user?.email}`);
      return data.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MdSync className="text-blue-600 text-4xl animate-spin" />
        <p className="ml-2 text-blue-600 text-lg font-semibold">Loading Requests...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 min-h-screen bg-gray-50">
      
      {/* PAGE TITLE */}
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-600">
        Employee Dashboard
      </h1>

      {/* Top 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        {/* Total Requests */}
        <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-lg flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <MdOutlineRequestPage className="text-4xl" />
          </div>
          <div>
            <div className="text-3xl font-bold">{dashboard.totalRequests}</div>
            <p className="text-sm opacity-80">Total Requests</p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-yellow-500 text-white p-5 rounded-2xl shadow-lg flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <MdPendingActions className="text-4xl" />
          </div>
          <div>
            <div className="text-3xl font-bold">{dashboard.pendingRequests}</div>
            <p className="text-sm opacity-80">Pending Requests</p>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-green-600 text-white p-5 rounded-2xl shadow-lg flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <MdCheckCircle className="text-4xl" />
          </div>
          <div>
            <div className="text-3xl font-bold">{dashboard.approvedRequests}</div>
            <p className="text-sm opacity-80">Approved</p>
          </div>
        </div>

        {/* Returned */}
        <div className="bg-purple-600 text-white p-5 rounded-2xl shadow-lg flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <MdAssignmentReturn className="text-4xl" />
          </div>
          <div>
            <div className="text-3xl font-bold">{dashboard.returnedRequests}</div>
            <p className="text-sm opacity-80">Returned</p>
          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="mt-6">
        <EmployChart dashboard={dashboard} />
      </div>

      {/* Cards */}
      <div className="text-gray-700 mt-6">
        <Card dashboard={dashboard} />
      </div>

    </div>
  );
};

export default EmployHome;
