import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { MdHowToVote } from "react-icons/md";
import { MapPin, Clock, User, Zap, CheckCircle, XCircle } from "lucide-react";
import Swal from "sweetalert2";
import { useState } from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Component/LoadingSpinner/LoadingSpinner";
import { uploadImageToImgbb } from "../../utils/uploadImage";
import { BiSolidLike } from "react-icons/bi";

const statusColors = {
  pending: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-red-100 text-red-800",
};

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [editingIssue, setEditingIssue] = useState(null);

  // ================= ISSUE DETAILS =================
  const { data: issue, isLoading, refetch } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  // ================= TIMELINE =================
  const { data: timeline = [] } = useQuery({
    queryKey: ["issue-timeline", issue?.trackingId],
    enabled: !!issue?.trackingId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${issue.trackingId}/timeline`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const isOwner = user?.email === issue?.email;

  // ================= ACTIONS =================
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/issues/${issue._id}`);
      if (res.data.deletedCount) {
        Swal.fire("Deleted!", "Issue deleted successfully", "success");
        navigate("/dashboard/my-issues");
      }
    }
  };

  const handleUpvote = async () => {
    try {
      const res = await axiosSecure.patch(`/issues/upvote/${issue._id}`, {
        email: user?.email,
      });
      Swal.fire("Success", res.data.message, "success");
      refetch();
    } catch (err) {
      Swal.fire(
        "Warning",
        err.response?.data?.message || "Already upvoted",
        "warning"
      );
    }
  };

  const handleBoost = async () => {
    const paymentInfo = {
      Issuetitle: issue.title,
      createrEmail: issue.email,
      Issueid: issue._id,
      trackingId: issue.trackingId,
      price: 100,
    };

    const result = await Swal.fire({
      title: "Boost this issue?",
      text: "Pay 100৳ to boost priority",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.post("/payment-checkout-session/boosting", paymentInfo);
      window.location.href = res.data.url;
    }
  };

  const openEditModal = () => setEditingIssue(issue);
  const closeEditModal = () => setEditingIssue(null);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      let imageUrl = editingIssue.image || "";

      const imageFile = formData.get("imageFile");
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImageToImgbb(imageFile);
      }

      const updatedIssue = {
        title: formData.get("title"),
        category: formData.get("category"),
        description: formData.get("description"),
        location: formData.get("location"),
        image: imageUrl,
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

  // ================= UI =================
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="text-indigo-600 font-semibold mb-4"
      >
        ← Back
      </button>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow">
          {issue.image && (
            <img
              src={issue.image}
              className="w-full h-72 object-cover rounded-t-2xl"
            />
          )}

          <div className="p-6">
            {/* BADGES */}
            <div className="flex gap-2 mb-3 flex-wrap">
              <span className="badge badge-outline">{issue.category}</span>
              <span className={`badge capitalize ${statusColors[issue.status]}`}>
                {issue.status}
              </span>
              {issue.priority === "high" && (
                <span className="badge badge-error flex items-center gap-1">
                  <Zap size={14} /> High Priority
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-3">{issue.title}</h1>

            <div className="text-gray-500 text-sm flex flex-wrap gap-4 mb-4">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {issue.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> {new Date(issue.createdAt).toLocaleString()}
              </span>
              <span><BiSolidLike size={26} className="text-primary" /> {issue.upvotes}</span>
            </div>

            <p className="text-gray-700 leading-relaxed">{issue.description}</p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6 flex-wrap">
              {isOwner ? (
                <>
                  {/* EDIT */}
                  {issue.status === "pending" && (
                    <button
                      onClick={openEditModal}
                      className="btn btn-outline btn-info"
                    >
                      Edit
                    </button>
                  )}

                  {/* DELETE */}
                  <button
                    onClick={handleDelete}
                    className="btn btn-outline btn-error"
                  >
                    Delete
                  </button>

                  {/* BOOST */}
                  {issue.priority !== "high" && (
                    <button
                      onClick={handleBoost}
                      className="btn btn-warning flex gap-1"
                    >
                      <Zap size={16} /> Boost ৳100
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={handleUpvote}
                  className="btn btn-primary flex gap-1"
                >
                  <MdHowToVote /> Upvote
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold flex gap-1 items-center mb-1">
              <User size={16} /> Reported By
            </h3>
            <p>{issue.name}</p>
            <p className="text-xs text-gray-400">{issue.email}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-1">Assigned Staff</h3>
            {issue.assignedStaff ? (
              <>
                <p>{issue.assignedStaff.name}</p>
                <p className="text-xs text-gray-400">{issue.assignedStaff.email}</p>
              </>
            ) : (
              <p className="text-gray-400">Not assigned yet</p>
            )}
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="bg-white rounded-2xl shadow p-6 mt-10">
        <h2 className="text-xl font-bold mb-6">Issue Timeline</h2>
        {timeline.length === 0 ? (
          <p className="text-gray-400">No tracking history yet</p>
        ) : (
          <ol className="relative border-l border-gray-300">
            {[...timeline].reverse().map((item, index) => (
              <li key={index} className="mb-8 ml-6">
                <span
                  className="absolute -left-3 w-6 h-6 flex items-center justify-center rounded-full text-white text-xs"
                  style={{
                    backgroundColor:
                      item.status === "pending"
                        ? "#d1d5db"
                        : item.status === "in-progress"
                        ? "#3b82f6"
                        : item.status === "resolved"
                        ? "#22c55e"
                        : "#ef4444",
                  }}
                >
                  {item.status === "resolved" ? (
                    <CheckCircle size={12} />
                  ) : item.status === "closed" ? (
                    <XCircle size={12} />
                  ) : (
                    index + 1
                  )}
                </span>
                <h3 className="font-semibold capitalize">{item.status}</h3>
                <p className="text-gray-600 text-sm">{item.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {item.role} • {new Date(item.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingIssue && (
        <dialog open className="modal modal-bottom sm:modal-middle">
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
                  <span className="label-text font-semibold">Category</span>
                </label>
                <input
                  type="text"
                  name="category"
                  defaultValue={editingIssue.category}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editingIssue.location}
                  className="input input-bordered w-full"
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
                  rows={4}
                  required
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
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

export default IssueDetails;
