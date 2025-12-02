import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const EmployChart = ({ dashboard }) => {
  
  const chartData = [
    { name: "Pending", value: dashboard?.pendingRequests || 0 },
    { name: "Approved", value: dashboard?.approvedRequests || 0 },
    { name: "Returned", value: dashboard?.returnedRequests || 0 },
    { name: "Total", value: dashboard?.totalRequests || 0 },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mt-6 border border-gray-200">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
        Request Summary Chart
      </h2>

      <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 15, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="name"
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                color: "#111",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />

            <Legend wrapperStyle={{ fontSize: 12 }} />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5, fill: "#3b82f6" }}
              activeDot={{ r: 7 }}
              animationDuration={900}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployChart;
