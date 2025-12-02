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

const TrafficChart = ({ dashboard }) => {
  const chartData = [
    { name: "Pending", value: dashboard.pendingRequests || 0 },
    { name: "Approved", value: dashboard.approvedRequests || 0 },
    { name: "Returned", value: dashboard.returnedRequests || 0 },
    { name: "Returnable", value: dashboard.returnable || 0 },
    { name: "Non-Returnable", value: dashboard.nonReturnable || 0 },
  ];

  return (
    <div className="
      bg-white 
      p-4 sm:p-5 lg:p-6 
      rounded-2xl shadow-lg 
      mt-4 sm:mt-6 
      border border-gray-100 
      text-gray-800 
      w-full
    ">
      <h2 className="
        text-lg sm:text-xl lg:text-2xl 
        font-bold mb-3 sm:mb-4
        text-gray-800
      ">
        Request & Assets Overview
      </h2>

      <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6A5AE0" stopOpacity={1} />
                <stop offset="100%" stopColor="#6A5AE0" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              stroke="#6b7280" 
            />

            <YAxis 
              allowDecimals={false} 
              stroke="#6b7280" 
              tick={{ fontSize: 12 }} 
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.07)",
                color: "#111827",
              }}
              labelStyle={{ fontWeight: "bold", color: "#6A5AE0" }}
            />

            <Legend wrapperStyle={{ fontSize: 12 }} />

            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineColor)"
              strokeWidth={4}
              dot={{ r: 5, fill: "#6A5AE0" }}
              activeDot={{ r: 7 }}
              animationDuration={900}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficChart;
