import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin } from "lucide-react";
import { uploadImageToImgbb } from "../../../utils/uploadImage";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Component/LoadingSpinner/LoadingSpinner";

const ReportIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const categoryData = useLoaderData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch user info
  const { data: Creator = {}, isLoading: userLoading } = useQuery({
    queryKey: ["owner-self", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/id`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch user's issue count
  const { data: IssueCount = 0, isLoading: countLoading } = useQuery({
    queryKey: ["issue-count", Creator?.id],
    enabled: !!Creator?.id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/count/${Creator.id}`);
      return res.data.count;
    },
  });

  if (userLoading || countLoading || loading) return <LoadingSpinner />;

  // Free user limit check
  if (!Creator?.isPremium && IssueCount >= 3) {
    return (
      <div className="max-w-xl mx-auto text-center border border-[#ece7e7] bg-white p-6 rounded-xl mt-20 shadow">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Issue Limit Reached
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Free users can report only <strong>3 issues</strong>.
        </p>
        <button
          onClick={() => navigate("/dashboard/profile")}
          className="btn btn-primary"
        >
          Upgrade to Premium
        </button>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const imageFile = data.image[0];
      const imageUrl = await uploadImageToImgbb(imageFile);

      const issueData = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        image: imageUrl,
        createdBy: Creator.id,
        name: Creator.name,
        email: Creator.email,
      };

      await axiosSecure.post("/issues", issueData);
      toast.success("Issue reported successfully");
      reset();
      navigate("/dashboard/my-issues");
    } catch (err) {
      console.error(err);
      toast.error("Failed to report issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-900">Report New Issue</h2>
      <p className="text-sm text-gray-500 mt-1">
        Help improve your community by reporting civic issues
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Broken streetlight on Main Road"
            className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full rounded-lg border border-gray-200 px-4 py-2 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a category</option>

            {categoryData?.map((cat) =>
              cat.items.map((item, i) => (
                <option key={`${cat.id}-${i}`} value={item}>
                  {item}
                </option>
              ))
            )}
          </select>
          {errors.category && (
            <p className="text-sm text-red-500 mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="e.g., Near City Hall, Main Street"
              className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              {...register("location", { required: "Location is required" })}
            />
          </div>
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="4"
            placeholder="Describe the issue in detail..."
            className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            {...register("image")}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-primary text-white hover:opacity-90"
          >
            Submit Issue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssues;
