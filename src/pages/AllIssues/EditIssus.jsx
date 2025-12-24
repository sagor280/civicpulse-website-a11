import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Component/LoadingSpinner/LoadingSpinner";

const EditIssus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  // ================= FETCH ISSUE =================
  const { data: issue, isLoading } = useQuery({
    queryKey: ["edit-issue", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (issue) {
      if (issue.status !== "pending") {
        Swal.fire("Warning", "Only pending issues can be edited", "warning");
        navigate(`/dashboard/issue-details/${id}`);
      } else {
        setFormData({
          title: issue.title,
          description: issue.description,
          category: issue.category,
          location: issue.location,
        });
      }
    }
  }, [issue, id, navigate]);

  if (isLoading) return <LoadingSpinner />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/issues/${id}`, formData);
      if (res.data.modifiedCount) {
        Swal.fire("Updated!", "Issue updated successfully", "success");
        navigate(`/dashboard/issue-details/${id}`);
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Update failed", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 h-28"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          >
            <option value="">Select Category</option>
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update Issue
        </button>
      </form>
    </div>
  );
};

export default EditIssus;
