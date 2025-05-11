import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FiPieChart,
  FiClock,
  FiTrendingUp,
  FiAlertTriangle,
  FiPackage,
  FiUser,
} from "react-icons/fi";
import { MdSync } from "react-icons/md";

const HrHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/hr-request/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const pendingRequests = requests
    .filter((request) => request.status === "pending")
    .slice(0, 5);

  const topRequestedItems = [...requests]
    .sort((a, b) => (b.requestCount || 0) - (a.requestCount || 0))
    .slice(0, 4);

  const limitedStockItems = requests.filter((request) => request.quantity < 10);

  const assetTypeCount = requests.reduce((acc, curr) => {
    const type = curr.assetsType || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(assetTypeCount).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

  if (isLoading) {
    return (
      <div className="text-center text-base md:text-lg font-medium text-primary">
        <MdSync className="animate-spin inline-block mr-2 text-2xl text-primary" />
        Loading...
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-600">No requests found.</h2>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-10">
      {/* Assets by Type Chart */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiPieChart className="text-blue-600" />
          Assets by Type
        </h2>
        {chartData.length === 0 ? (
          <p>No data to show.</p>
        ) : (
          <div className="w-full h-96">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Pending Requests */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiClock className="text-yellow-600" />
          Pending Requests
        </h2>
        {pendingRequests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingRequests.map((request, index) => (
              <div key={index} className="p-4 rounded shadow">
                <div className="flex items-center gap-2">
                  <FiPackage className="text-gray-500" />
                  <h3 className="text-xl font-semibold">{request.name}</h3>
                </div>
                <p>Status: {request.status}</p>
                <p>Company: {request.companyName}</p>
                <div className="flex items-center gap-2">
                  <FiUser className="text-gray-500" />
                  <p>Requested by: {request.employ.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Most Requested Items */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-green-600" />
          Top Most Requested Items
        </h2>
        {topRequestedItems.length === 0 ? (
          <p>No top requested items.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topRequestedItems.map((request, index) => (
              <div key={index} className="p-4 rounded shadow">
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="text-gray-500" />
                  <h3 className="text-xl font-semibold">{request.name}</h3>
                </div>
                <p>Company: {request.companyName}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Limited Stock Items */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiAlertTriangle className="text-red-600" />
          Limited Stock Items
        </h2>
        {limitedStockItems.length === 0 ? (
          <p>No limited stock items.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {limitedStockItems.map((request, index) => (
              <div key={index} className="p-4 rounded shadow">
                <div className="flex items-center gap-2">
                  <FiAlertTriangle className="text-red-600" />
                  <h3 className="text-xl font-semibold">{request.name}</h3>
                </div>
                <p>Quantity: {request.quantity}</p>
                <p>Company: {request.companyName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HrHome;
