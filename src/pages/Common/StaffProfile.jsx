import React, { useState } from "react";
import { Mail, Phone, User2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Component/LoadingSpinner/LoadingSpinner";
import { uploadImageToImgbb } from "../../utils/uploadImage";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const StaffProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  
  const { data: staffProfile, isLoading, refetch } = useQuery({
    queryKey: ["staffProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/profile");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (!user) return null;
  if (!staffProfile)
    return <p className="text-center mt-10">Staff not found</p>;

  
  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.name.value;
    const phone = form.phone.value;

    setLoading(true);
    try {
      let photoURL = staffProfile.photoURL || null;

      if (photoFile) {
        photoURL = await uploadImageToImgbb(photoFile);
      }

      
      await axiosSecure.patch(`/staff/${staffProfile.id}`, {
        displayName,
        phone,
        photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Profile updated successfully",
        confirmButtonColor: "#4f46e5",
      });

      refetch();
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("FULL ERROR:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-900 text-white flex items-center justify-center overflow-hidden">
            {staffProfile.photoURL ? (
              <img
                src={staffProfile.photoURL}
                alt="Staff"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold">
                {staffProfile.displayName?.charAt(0) || "S"}
              </span>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-gray-800">
              {staffProfile.displayName}
            </h1>
            <p className="text-gray-600 break-all">{staffProfile.email}</p>
          </div>

          <span className="sm:ml-auto bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
            {staffProfile.role}
          </span>
        </div>

        
        <form
          onSubmit={handleUpdate}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Profile
          </h2>
          <p className="text-gray-600">
            Update your personal information.
          </p>

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
                  defaultValue={staffProfile.displayName}
                  className="block w-full border border-gray-300 rounded-md p-2 pl-10"
                  autoComplete="name"
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
                  value={staffProfile.email}
                  readOnly
                  className="block w-full border border-gray-300 rounded-md p-2 pl-10 bg-gray-50"
                  autoComplete="email"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                  defaultValue={staffProfile.phone || ""}
                  className="block w-full border border-gray-300 rounded-md p-2 pl-10"
                  autoComplete="tel"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full border border-gray-300 rounded-md p-2 mt-1"
              />
              {photoFile && (
                <p className="text-gray-500 text-sm mt-1">
                  {photoFile.name}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffProfile;
