import React from "react";
import { useQuery } from "@tanstack/react-query";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpinner/LoadingSpinner";

const StaffOverview = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch staff stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ["staff-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/dashboard/stats");
      return res.data;
    },
  });

  // Fetch latest assigned issues
  const { data: latestIssues = [] } = useQuery({
    queryKey: ["staff-latest-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/dashboard/latest-issues");
      return res.data;
    },
  });

  if (isLoading || !stats) return <LoadingSpinner />;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const pieData = [
    { name: "Assigned", value: stats.assignedIssuesCount || 0 },
    { name: "Resolved", value: stats.resolvedIssuesCount || 0 },
    { name: "Pending", value: stats.pendingIssuesCount || 0 },
    { name: "Today's Task", value: stats.todaysTasksCount || 0 },
  ];

  const barData = [
    {
      name: "Issues",
      Assigned: stats.assignedIssuesCount || 0,
      Resolved: stats.resolvedIssuesCount || 0,
      Pending: stats.pendingIssuesCount || 0,
      Today: stats.todaysTasksCount || 0,
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="font-bold">Assigned Issues</h2>
          <p className="text-2xl">{stats.assignedIssuesCount || 0}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="font-bold">Resolved Issues</h2>
          <p className="text-2xl">{stats.resolvedIssuesCount || 0}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="font-bold">Pending Issues</h2>
          <p className="text-2xl">{stats.pendingIssuesCount || 0}</p>
        </div>
        <div className="bg-pink-100 p-4 rounded shadow">
          <h2 className="font-bold">Today's Tasks</h2>
          <p className="text-2xl">{stats.todaysTasksCount || 0}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Issue Status Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Issues Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Assigned" fill="#0088FE" />
            <Bar dataKey="Resolved" fill="#00C49F" />
            <Bar dataKey="Pending" fill="#FFBB28" />
            <Bar dataKey="Today" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Latest Assigned Issues Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Latest Assigned Issues</h2>
        <table className="table table-zebra min-w-[500px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {latestIssues.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No issues assigned
                </td>
              </tr>
            ) : (
              latestIssues.map((issue, index) => (
                <tr key={issue._id}>
                  <td>{index + 1}</td>
                  <td>{issue.title}</td>
                  <td className="capitalize">{issue.status}</td>
                  <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffOverview;
