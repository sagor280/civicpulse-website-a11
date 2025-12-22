import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../Component/LoadingSpinner/LoadingSpinner";

const AssignedIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const { data: issues = [], isLoading, refetch } = useQuery({
    queryKey: ["staffIssues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/issues");
      return res.data;
    },
  });

  const statusFlow = {
    assigned: ["in-progress"],
    pending: ["in-progress"],
    "in-progress": ["working"],
    working: ["resolved"],
    resolved: ["closed"],
  };

  const priorityOrder = { high: 1, normal: 2 };

  const statusColor = {
    assigned: "bg-gray-100 text-gray-700",
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    working: "bg-purple-100 text-purple-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-200 text-gray-600",
  };

  const handleStatusChange = async (issue, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/staff/issues/${issue._id}/status`, { status: newStatus });
      if (res.data.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Status changed to ${newStatus}`,
          showConfirmButton: false,
          timer: 1200,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: err.response?.data?.message || "Status update failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const filteredIssues = issues
    .filter((i) => (!filterStatus || i.status === filterStatus) && (!filterPriority || i.priority === filterPriority))
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Assigned Issues</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="select select-bordered bg-white border-gray-300 rounded-lg shadow-sm"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {Object.keys(statusFlow).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
          <option value="closed">closed</option>
        </select>

        <select
          className="select select-bordered bg-white border-gray-300 rounded-lg shadow-sm"
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="high">High ( Boosted)</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      {/* Table */}
      {filteredIssues.length === 0 ? (
        <div className="text-center text-gray-400 mt-32 text-xl font-medium">
          ❌ No assigned issues
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-gray-700 text-left text-sm font-medium">Title</th>
                <th className="px-6 py-4 text-gray-700 text-left text-sm font-medium">Category</th>
                <th className="px-6 py-4 text-gray-700 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-4 text-gray-700 text-left text-sm font-medium">Priority</th>
                <th className="px-6 py-4 text-gray-700 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <tr key={issue._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 font-semibold text-gray-800">{issue.title}</td>
                  <td className="px-6 py-4 text-gray-600">{issue.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[issue.status]}`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {issue.priority === "high" ? (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                         High
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 relative">
                    {statusFlow[issue.status] ? (
                      <select
                        className="input input-bordered w-40 rounded-lg text-gray-700"
                        defaultValue=""
                        onChange={(e) => handleStatusChange(issue, e.target.value)}
                      >
                        <option value="" disabled>Change Status</option>
                        {statusFlow[issue.status].map((s) => (
                          <option key={s} value={s} className="capitalize">
                            {s.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedIssues;
