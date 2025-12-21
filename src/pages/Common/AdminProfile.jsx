import React, { useState } from "react";
import { Mail, Phone, User2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Component/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { uploadImageToImgbb } from "../../utils/uploadImage";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  // 🔹 Load admin profile from backend
  const {
    data: adminProfile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/profile");
      return res.data;
    },
  });

  const handlePhotoChange = (e) => setPhotoFile(e.target.files[0]);

  

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;

    setLoading(true);

    try {
      let photoURL = adminProfile?.photoURL || null;
      if (photoFile) photoURL = await uploadImageToImgbb(photoFile);

      // DB update
      await axiosSecure.patch(`/users/${adminProfile._id}`, {
        displayName: name,
        phone,
        photoURL,
      });

      // SweetAlert success
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4f46e5", 
      });

      refetch();
    } catch (err) {
      console.error(err);

      // SweetAlert error
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444", 
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-900 text-white flex items-center justify-center overflow-hidden">
            {adminProfile?.photoURL ? (
              <img
                src={adminProfile.photoURL}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold">
                {adminProfile?.displayName?.charAt(0) || "A"}
              </span>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-gray-800">
              {adminProfile?.displayName || "Admin"}
            </h1>
            <p className="text-gray-600 break-all">{adminProfile?.email}</p>
          </div>

          <span className="sm:ml-auto bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
            {adminProfile?.role || "admin"}
          </span>
        </div>

        
        <form
          onSubmit={handleUpdate}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
          <p className="text-gray-600">Update your personal information.</p>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="name"
                  defaultValue={adminProfile?.displayName}
                  className="block w-full border border-gray-300 rounded-md p-2 pl-10"
                />
                <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  value={adminProfile?.email || ""}
                  readOnly
                  className="block w-full border border-gray-300 rounded-md p-2 pl-10 bg-gray-50"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
                {photoFile && (
                  <span className="text-gray-500">{photoFile.name}</span>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="phone"
                  defaultValue={adminProfile?.phone || ""}
                  className="block w-full border border-gray-300 rounded-md p-2 pl-10"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
