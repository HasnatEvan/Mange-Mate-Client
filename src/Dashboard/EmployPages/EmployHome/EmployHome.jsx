import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaClipboardList,
  FaCalendarAlt,
  FaBuilding,
  FaIdBadge,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MdSync } from "react-icons/md";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const EmployHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employ-request/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );
  const approvedRequests = requests.filter(
    (request) => request.status === "approved"
  );
  const rejectedRequests = requests.filter(
    (request) => request.status === "rejected"
  );

  const currentMonth = new Date().getMonth();
  const monthlyRequests = requests
    .filter((request) => {
      const requestDate = new Date(request.date);
      return requestDate.getMonth() === currentMonth;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const chartData = [
    { name: "Pending", value: pendingRequests.length },
    { name: "Approved", value: approvedRequests.length },
    { name: "Rejected", value: rejectedRequests.length },
  ];

  if (isLoading) {
    return (
      <div className="text-center text-base md:text-lg font-medium text-primary">
        <MdSync className="animate-spin inline-block mr-2 text-2xl text-primary" />
        Loading...
      </div>
    );
  }

  // Show fallback if no requests at all
  if (requests.length === 0) {
    return (
      <div className="text-center mt-12 text-gray-600 text-xl font-semibold">
        No requests found.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-12">
      {/* Graph Chart */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-[#0149B1]">
          <FaClipboardList className="text-purple-500" /> Request Status Overview
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Requests */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2 text-[#0149B1]">
          <FaClipboardList className="text-blue-500" /> My Pending Requests
        </h2>
        {pendingRequests.length === 0 ? (
          <p className="text-center text-gray-500">No pending requests.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingRequests.map((request, index) => (
              <div
                key={index}
                className="p-4 rounded shadow hover:shadow-md transition space-y-2"
              >
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <FaClipboardList className="text-blue-400" /> {request.name}
                </h3>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaBuilding className="text-gray-500" /> Company:{" "}
                  {request.companyName}
                </p>
                <p className="text-gray-500 flex items-center gap-2">
                  <FaIdBadge className="text-gray-500" /> Request ID:{" "}
                  {request.requestId}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Monthly Requests */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2 text-[#0149B1]">
          <FaCalendarAlt className="text-green-500" /> My Monthly Requests
        </h2>
        {monthlyRequests.length === 0 ? (
          <p className="text-center text-gray-500">
            No requests made this month.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthlyRequests.map((request, index) => (
              <div
                key={index}
                className="p-4 rounded shadow hover:shadow-md transition space-y-2"
              >
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <FaClipboardList className="text-green-400" /> {request.name}
                </h3>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaBuilding className="text-gray-500" /> Company:{" "}
                  {request.companyName}
                </p>
                <p className="text-gray-500 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500" /> Request Date:{" "}
                  {new Date(request.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployHome;
