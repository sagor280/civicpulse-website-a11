import React from "react";

import { useQuery } from "@tanstack/react-query";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpinner/LoadingSpinner";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  // ================= Issue Stats =================
  const { data: issueStats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["issueStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/issues-stats");
      return res.data;
    },
  });

  // ================= Latest Issues =================
  const { data: latestIssues = [] } = useQuery({
    queryKey: ["latestIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/latest-issues");
      return res.data;
    },
  });

  // ================= Payment Stats =================
  const { data: paymentStats = {} } = useQuery({
    queryKey: ["paymentStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/payment-stats");
      return res.data;
    },
  });

  // ================= Latest Payments =================
  const { data: latestPayments = [] } = useQuery({
    queryKey: ["latestPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/latest-payments");
      return res.data;
    },
  });

  // ================= Latest Users =================
  const { data: latestUsers = [] } = useQuery({
    queryKey: ["latestUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/latest-users");
      return res.data;
     
    },
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1"];

  const pieData = [
    { name: "Resolved", value: issueStats.resolved || 0 },
    { name: "Pending", value: issueStats.pending || 0 },
    { name: "Rejected", value: issueStats.rejected || 0 },
    { name: "Total", value: issueStats.total || 0 },
  ];

  const barData = [
    {
      name: "Issues",
      Resolved: issueStats.resolved || 0,
      Pending: issueStats.pending || 0,
      Rejected: issueStats.rejected || 0,
      Total: issueStats.total || 0,
      TotalAmount: paymentStats.totalAmount || 0,
      TotalPayments: paymentStats.totalPayments || 0,
    },
  ];

  if (statsLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-green-100 shadow rounded-xl p-4">
          <h2 className="text-lg font-bold">Total Issues</h2>
          <p className="text-3xl font-semibold">{issueStats.total || 0}</p>
        </div>

        <div className="bg-blue-100 shadow rounded-xl p-4">
          <h2 className="text-lg font-bold">Pending Issues</h2>
          <p className="text-3xl font-semibold">{issueStats.pending || 0}</p>
        </div>

        <div className="bg-green-200 shadow rounded-xl p-4">
          <h2 className="text-lg font-bold">Resolved Issues</h2>
          <p className="text-3xl font-semibold">{issueStats.resolved || 0}</p>
        </div>

        <div className="bg-red-100 shadow rounded-xl p-4">
          <h2 className="text-lg font-bold">Rejected Issues</h2>
          <p className="text-3xl font-semibold">{issueStats.rejected || 0}</p>
        </div>

        <div className="bg-pink-100 shadow rounded-xl p-4">
          <h2 className="text-lg font-bold">Total Payments</h2>
          <p className="text-3xl font-semibold">{paymentStats.totalPayments || 0}</p>
        </div>

        <div className="bg-teal-100 shadow rounded-xl p-4">
          <h2 className="text-lg font-bold">Total Amount</h2>
          <p className="text-3xl font-semibold">{paymentStats.totalAmount || 0}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Issue Status Overview</h2>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={70} label={({ name }) => name}>
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Overview Chart</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={barData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Pending" fill="#facc15" />
            <Bar dataKey="Resolved" fill="#38bdf8" />
            <Bar dataKey="Rejected" fill="#f87171" />
            <Bar dataKey="Total" fill="#4ade80" />
            <Bar dataKey="TotalAmount" fill="#AC25D9" />
            <Bar dataKey="TotalPayments" fill="#E67A85" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Latest Issues Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Latest Issues</h2>
        <table className="table table-zebra min-w-[400px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {latestIssues.map((issue, index) => (
              <tr key={issue._id}>
                <td>{index + 1}</td>
                <td>{issue.title}</td>
                <td className="capitalize">{issue.status}</td>
                <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Latest Payments Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Latest Payments</h2>
        <table className="table table-zebra min-w-[400px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {latestPayments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.customerEmail||payment.email}</td>
                <td>{payment.amount} {payment.currency}</td>
                <td>{new Date(payment.paidAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Latest Users Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Latest Users</h2>
        <table className="table table-zebra min-w-[400px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {latestUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
               <td>{user.name || user.displayName || "N/A"}</td>

                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOverview;
