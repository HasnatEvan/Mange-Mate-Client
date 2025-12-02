import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TrafficChart from "./TrafficChart";
import Card from "./Card";
import { MdSync } from 'react-icons/md';

const HrHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dashboard = {}, isLoading } = useQuery({
    queryKey: ["hr-dashboard", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/hr-dashboard/${user?.email}`);
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
    <div className="px-4 sm:px-6 lg:px-10 py-6 min-h-screen bg-gray-50">

      {/* PAGE TITLE */}
      <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
        HR Dashboard
      </h1>

      {/* TOP CARDS — Fully Responsive */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-5
          gap-4 sm:gap-6
        "
      >
        {/* Total Employees */}
        <div className="bg-[#6A5AE0] text-white p-4 sm:p-6 rounded-2xl shadow-lg">
          <div className="text-2xl sm:text-3xl font-bold">{dashboard.totalEmployees}</div>
          <p className="text-sm opacity-80">My Employee</p>
        </div>

        {/* Total Assets */}
        <div className="bg-[#2196F3] text-white p-4 sm:p-6 rounded-2xl shadow-lg">
          <div className="text-2xl sm:text-3xl font-bold">{dashboard.totalAssets}</div>
          <p className="text-sm opacity-80">My Assets</p>
        </div>

        {/* Pending */}
        <div className="bg-[#F4A518] text-white p-4 sm:p-6 rounded-2xl shadow-lg">
          <div className="text-2xl sm:text-3xl font-bold">{dashboard.pendingRequests}</div>
          <p className="text-sm opacity-80">Pending Requests</p>
        </div>

        {/* Approved */}
        <div className="bg-[#E45252] text-white p-4 sm:p-6 rounded-2xl shadow-lg">
          <div className="text-2xl sm:text-3xl font-bold">{dashboard.approvedRequests}</div>
          <p className="text-sm opacity-80">Approved</p>
        </div>

        {/* Returned */}
        <div className="bg-[#8E44AD] text-white p-4 sm:p-6 rounded-2xl shadow-lg">
          <div className="text-2xl sm:text-3xl font-bold">{dashboard.returnedRequests}</div>
          <p className="text-sm opacity-80">Returned</p>
        </div>
      </div>

      {/* CHART SECTION — Full width responsive */}
      <div className="mt-4 sm:mt-6">
        <TrafficChart dashboard={dashboard} />
      </div>

      {/* CARD SECTION — grid responsive */}
      <div className="mt-4 sm:mt-6">
        <Card dashboard={dashboard} />
      </div>

    </div>
  );
};

export default HrHome;
