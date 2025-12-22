import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { MdHowToVote } from "react-icons/md";
import { MapPin, Clock, User, Zap } from "lucide-react";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Component/LoadingSpinner/LoadingSpinner";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  /* ================= ISSUE DETAILS ================= */
  const {
    data: issue,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  /* ================= TIMELINE ================= */
  const { data: timeline = [] } = useQuery({
    queryKey: ["issue-timeline", issue?.trackingId],
    enabled: !!issue?.trackingId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues/${issue.trackingId}/timeline`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const isOwner = user?.email === issue?.email;

  /* ================= ACTIONS ================= */
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
        navigate("/dashboard/my-issue");
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
      try {
        const res = await axiosSecure.post(
          "/payment-checkout-session/boosting",
          paymentInfo
        );
        window.location.href = res.data.url; // Stripe opens
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Failed to start payment", "error");
      }
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="text-indigo-600 font-semibold mb-4"
      >
        ← Back
      </button>

      {/* MAIN */}
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
              <span className="badge badge-info capitalize">
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
                <Clock size={16} />
                {new Date(issue.createdAt).toLocaleString()}
              </span>
              <span>👍 {issue.upvotes}</span>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {issue.description}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6 flex-wrap">
              {isOwner ? (
                <>
                  {issue.status === "pending" && (
                    <button className="btn btn-outline btn-info">
                      Edit
                    </button>
                  )}

                  <button
                    onClick={handleDelete}
                    className="btn btn-outline btn-error"
                  >
                    Delete
                  </button>

                  {issue.priority !== "high" && (
                    <button
                      onClick={handleBoost}
                      className="btn btn-warning flex items-center gap-2 animate-pulse"
                    >
                      <Zap size={16} /> Boost ৳100
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={handleUpvote}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <MdHowToVote size={16} /> Upvote
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
                <p className="text-xs text-gray-400">
                  {issue.assignedStaff.email}
                </p>
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
            {timeline.map((item, index) => (
              <li key={index} className="mb-8 ml-6">
                <span className="absolute -left-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>

                <h3 className="font-semibold capitalize">
                  {item.status}
                </h3>

                <p className="text-gray-600 text-sm">{item.message}</p>

                <p className="text-xs text-gray-400 mt-1">
                  {item.role} • {new Date(item.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default IssueDetails;
