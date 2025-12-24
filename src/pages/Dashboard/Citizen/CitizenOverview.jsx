// CitizenDashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../Component/LoadingSpinner/LoadingSpinner";

const COLORS = ["#0088FE", "#FFBB28", "#00C49F"];

const CARD_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
  "bg-green-100 text-green-800",
  "bg-pink-100 text-pink-800",
];

const CitizenOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch citizen stats using TanStack Query
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ["citizen-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/citizen-stats");
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !stats)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Failed to load dashboard data
      </p>
    );

  const chartData = [
    { name: "Pending", value: stats.pendingIssues },
    { name: "In Progress", value: stats.inProgressIssues },
    { name: "Resolved", value: stats.resolvedIssues },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Blocked User Message */}
      {stats.isBlocked && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md text-center font-medium">
          You are blocked. You cannot submit, edit, upvote, or boost issues.
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[
          { label: "Total Issues", value: stats.totalIssues },
          { label: "Pending Issues", value: stats.pendingIssues },
          { label: "In Progress", value: stats.inProgressIssues },
          { label: "Resolved Issues", value: stats.resolvedIssues },
          { label: "Total Payments", value: stats.totalPayments },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl shadow-lg flex flex-col items-center justify-center ${CARD_COLORS[idx]}`}
          >
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Issue Status Chart
        </h2>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [value, "Issues"]}
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CitizenOverview;
