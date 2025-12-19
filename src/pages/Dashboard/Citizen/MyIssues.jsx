import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { uploadImageToImgbb } from "../../../utils/uploadImage";

const MyIssuePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const categoryData = useLoaderData();

  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editingIssue, setEditingIssue] = useState(null);
  const editModalRef = useRef(null);

  const priorityOrder = { high: 1, normal: 2 };

  const {
    data: myIssues = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myissues?email=${user.email}`);
      return res.data;
    },
  });

  // Delete Issue
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/issues/${id}`);
        Swal.fire("Deleted!", "Your issue has been deleted.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Error!", "Failed to delete issue.", "error");
      }
    }
  };

  // Open Edit Modal
  const openEditModal = (issue) => setEditingIssue(issue);

  // Close Edit Modal
  const closeEditModal = () => setEditingIssue(null);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);

      // File input handle
      const imageFile = formData.get("imageFile"); // name="imageFile"
      let imageUrl = editingIssue.photoURL || "";

      if (imageFile && imageFile.size > 0) {
        // Upload image to imgbb
        imageUrl = await uploadImageToImgbb(imageFile);
      }

      // Build updated issue object
      const updatedIssue = {
        title: formData.get("title"),
        category: formData.get("category"),
        description: formData.get("description"),
        location: formData.get("location"),
        photoURL: imageUrl,
      };

      await axiosSecure.patch(`/issues/${editingIssue._id}`, updatedIssue);
      Swal.fire("Updated!", "Your issue has been updated.", "success");
      closeEditModal();
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update issue.", "error");
    }
  };
  const filteredIssues = myIssues.filter(
  (issue) =>
    (statusFilter ? issue.status === statusFilter : true) &&
    (categoryFilter ? issue.category === categoryFilter : true)
);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Issues</h2>
        <p className="text-gray-500 mt-1">
          View and manage your reported issues.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="select select-bordered w-44"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          className="select select-bordered w-52"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categoryData?.map((cat) =>
            cat.items.map((item, i) => (
              <option key={`${cat.id}-${i}`} value={item}>
                {item}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
        {isLoading ? (
          <div className="py-20 text-center text-gray-500 text-lg">
            ⏳ Loading your issues...
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-500">
                    ❌ No issues found
                  </td>
                </tr>
              ) : (
                [...filteredIssues]
                  .sort(
                    (a, b) =>
                      priorityOrder[a.priority] - priorityOrder[b.priority]
                  )
                  .map((issue) => (
                    <tr key={issue._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-5 font-medium text-gray-800">
                        {issue.title}
                      </td>
                      <td className="px-6 py-5 text-gray-600">
                        {issue.category}
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700 capitalize">
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 text-xs rounded-full capitalize ${
                            issue.priority === "high"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-gray-500">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center gap-4 text-lg">
                          <FiEye
                            onClick={() =>
                              navigate(`/dashboard/issue-details/${issue._id}`)
                            }
                            className="cursor-pointer text-gray-600 hover:text-black"
                          />
                          {issue.status === "pending" && (
                            <FiEdit
                              onClick={() => openEditModal(issue)}
                              className="cursor-pointer text-gray-600 hover:text-blue-600"
                            />
                          )}
                          <FiTrash2
                            onClick={() => handleDelete(issue._id)}
                            className="cursor-pointer text-red-500 hover:text-red-700"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {editingIssue && (
        <dialog
          ref={editModalRef}
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <h3 className="text-xl font-bold mb-4">Edit Issue</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image (Optional)
                </label>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingIssue.title}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Issue Category
                  </span>
                </label>
                <select
                  name="category"
                  defaultValue={editingIssue.category}
                  className="select select-bordered w-full"
                  required
                >
                  {categoryData?.map((cat) =>
                    cat.items.map((item, i) => (
                      <option key={`${cat.id}-${i}`} value={item}>
                        {item}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editingIssue.location || ""}
                  className="input input-bordered w-full"
                  placeholder="Enter location"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingIssue.description}
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter detailed description"
                  rows={4}
                  required
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyIssuePage;
