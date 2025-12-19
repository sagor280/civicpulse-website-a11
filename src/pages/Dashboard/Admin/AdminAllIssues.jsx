import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpinner/LoadingSpinner";
import { FiEye, FiUserPlus, FiX } from "react-icons/fi";

const AdminAllIssues = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-all-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues/all");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="text-center text-red-500 py-10 text-lg">
        Failed to load issues
      </div>
    );

  // Boosted issues on top
  const sortedIssues = [...issues].sort(
    (a, b) => (b.isBoosted === true) - (a.isBoosted === true)
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">All Issues</h2>
        <p className="text-gray-500 mt-1">
          Monitor, assign and manage all reported issues
        </p>
      </div>

      {/* Table Wrapper */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-8 py-5">Title</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5">Priority</th>
              <th className="px-8 py-5">Assigned Staff</th>
              <th className="px-8 py-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {sortedIssues.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-16 text-center text-gray-400 text-lg"
                >
                  ❌ No issues found
                </td>
              </tr>
            ) : (
              sortedIssues.map((issue) => (
                <tr
                  key={issue._id}
                  className={`hover:bg-gray-50 transition ${
                    issue.isBoosted ? "bg-orange-50" : ""
                  }`}
                >
                  {/* Title */}
                  <td className="px-8 py-6 font-semibold text-gray-800 flex items-center gap-2">
                    {issue.isBoosted && (
                      <span className="text-orange-500">⚡</span>
                    )}
                    {issue.title}
                  </td>

                  {/* Category */}
                  <td className="px-8 py-6 text-gray-600">{issue.category}</td>

                  {/* Status */}
                  <td className="px-8 py-6">
                    <span className="px-4 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 capitalize">
                      {issue.status}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="px-8 py-6">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-medium capitalize ${
                        issue.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </td>

                  {/* Assigned Staff */}
                  <td className="px-8 py-6 text-gray-700">
                    {issue.assignedStaff ? (
                      issue.assignedStaff.name
                    ) : (
                      <span className="italic text-gray-400">Not Assigned</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-3">
                      {/* View */}
                      <button
                        className="p-2 rounded-full text-gray-600 
                 hover:bg-primary hover:text-white 
                 transition duration-200"
                        title="View Details"
                      >
                        <FiEye size={18} />
                      </button>

                      {/* Assign Staff */}
                      {!issue.assignedStaff && (
                        <button
                          className="p-2 rounded-full text-blue-600 
                   hover:bg-blue-100 hover:text-blue-700 
                   transition duration-200"
                          title="Assign Staff"
                        >
                          <FiUserPlus size={18} />
                        </button>
                      )}

                      {/* Reject */}
                      {issue.status === "pending" && (
                        <button
                          className="p-2 rounded-full text-red-500 
                   hover:bg-red-100 hover:text-red-600 
                   transition duration-200"
                          title="Reject Issue"
                        >
                          <FiX size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllIssues;
