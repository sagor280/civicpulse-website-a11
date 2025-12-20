import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpinner/LoadingSpinner";
import { FiEye, FiUserPlus, FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const AdminAllIssues = () => {
  const axiosSecure = useAxiosSecure();

  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");

  // 🔹 Fetch all issues
  const {
    data: issues = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-all-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues/all");
      return res.data;
    },
  });

  // 🔹 Open Assign Staff Modal
  const openAssignModal = async (issue) => {
    setSelectedIssue(issue);
    setSelectedStaff("");
    setShowModal(true);

    try {
      const res = await axiosSecure.get("/users/staff");
      setStaffList(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to load staff list", "error");
    }
  };

  // 🔹 Reject Issue
  const handleRejectIssue = (issue) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/issues/reject/${issue._id}`);
        Swal.fire("Rejected!", "Issue has been rejected.", "success");
        refetch();
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load issues
      </div>
    );

  // 🔹 Boosted issues first
  const sortedIssues = [...issues].sort(
    (a, b) => (b.isBoosted === true) - (a.isBoosted === true)
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">All Issues</h2>
        <p className="text-gray-500">
          Assign staff and manage reported issues
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Assigned Staff</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {sortedIssues.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-14 text-center text-gray-400">
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
                  <td className="px-6 py-4 font-semibold flex items-center gap-2">
                    {issue.isBoosted && <span>⚡</span>}
                    {issue.title}
                  </td>

                  <td className="px-6 py-4">{issue.category}</td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700 capitalize">
                      {issue.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        issue.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {issue.assignedStaff ? (
                      issue.assignedStaff.name
                    ) : (
                      <span className="italic text-gray-400">
                        Not Assigned
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button className="p-2 rounded-full hover:bg-gray-200">
                        <FiEye />
                      </button>

                      {!issue.assignedStaff &&
                        issue.status === "pending" && (
                          <button
                            onClick={() => openAssignModal(issue)}
                            className="p-2 rounded-full hover:bg-blue-100 text-blue-600"
                          >
                            <FiUserPlus />
                          </button>
                        )}

                      {issue.status === "pending" && (
                        <button
                          onClick={() => handleRejectIssue(issue)}
                          className="p-2 rounded-full hover:bg-red-100 text-red-600"
                        >
                          <FiX />
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

     {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Assign Staff
        </h3>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Select a staff member for this issue
      </p>

      <select
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
        value={selectedStaff}
        onChange={(e) => setSelectedStaff(e.target.value)}
      >
        <option value="">Select Staff</option>
        {staffList.map((staff) => (
          <option key={staff._id} value={staff.email}>
            {staff.displayName}
          </option>
        ))}
      </select>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setShowModal(false)}
          className="px-6 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          disabled={!selectedStaff}
          className={`px-6 py-2 rounded-full text-white font-medium ${
            selectedStaff
              ? "bg-primary hover:bg-[#138e7a]"
              : "bg-gray-300 cursor-not-allowed"
          } transition-colors`}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default AdminAllIssues;
