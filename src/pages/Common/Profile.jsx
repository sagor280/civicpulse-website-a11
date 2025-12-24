import { Crown, Mail, Phone, User2 } from "lucide-react";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Component/LoadingSpinner/LoadingSpinner";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { uploadImageToImgbb } from "../../utils/uploadImage";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFcomponent from "../../Component/PDF/PDFcomponent";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  // 🔹 Load profile from DB
  const {
    data: profile = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  const currentUser = profile[0];

  const handlePhotoChange = (e) => setPhotoFile(e.target.files[0]);

  // 🔹 PAYMENT (Stripe checkout)
  const setShowPayment = (userData) => {
    const paymentInfo = {
      name: userData.displayName,
      userId: userData._id,
      email: userData.email,
      price: 1000,
    };

    Swal.fire({
      title: "Confirm Payment",
      text: "Pay 1000৳ for Premium access",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post(
          "/payment-checkout-session",
          paymentInfo
        );
        console.log(res.data);
        window.location.href = res.data.url;
      }
    });
  };

  // 🔹 Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;

    setLoading(true);

    try {
      // Firebase update
      let photoURL = currentUser?.photoURL || null;
      if (photoFile) photoURL = await uploadImageToImgbb(photoFile);
      await updateUserProfile(name, photoURL);

      // DB update
      await axiosSecure.patch(`/users/${currentUser._id}`, {
        displayName: name,
        phone,
        photoURL,
      });

      toast.success("Profile updated successfully");
      refetch();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-900 text-white flex items-center justify-center overflow-hidden">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold">
                {user?.displayName?.charAt(0) || "U"}
              </span>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {user?.displayName || "User"}
              {currentUser?.isPremium && (
                <span className="text-yellow-500 text-sm flex items-center gap-1">
                  <Crown size={16} /> Premium
                </span>
              )}
            </h1>
            <p className="text-gray-600 break-all">{user?.email}</p>
          </div>

          <span className="sm:ml-auto bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
            {currentUser?.role || "citizen"}
          </span>
        </div>

        {/* ================= PREMIUM SECTION ================= */}
        {!currentUser?.isPremium && (
          <div className="bg-yellow-50 border border-amber-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Upgrade to Premium
              </h2>
            </div>

            <p className="text-gray-600">
              Get unlimited issue submissions and priority support for just
              ৳1000 one-time payment.
            </p>

            <ul className="space-y-2 text-sm">
              <li>✔ Unlimited issue submissions</li>
              <li>✔ Priority support</li>
              <li>✔ Premium badge</li>
            </ul>

            <button
              onClick={() => setShowPayment(currentUser)}
              className="w-full bg-primary text-white py-2 px-4 rounded-md flex items-center justify-center gap-2"
            >
              <Crown className="h-5 w-5 text-yellow-300" />
              Subscribe for ৳1000
            </button>
            <PDFDownloadLink
              document={<PDFcomponent payment={p} />}
              fileName={`invoice_${p.transactionId}.pdf`}
              style={{
                padding: "6px 12px",
                backgroundColor: "#4CAF50",
                color: "white",
                borderRadius: "4px",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              {({ loading }) => (loading ? "Generating..." : "Download")}
            </PDFDownloadLink>
          </div>
        )}

        {/* ================= EDIT PROFILE ================= */}
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
                  defaultValue={user?.displayName}
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
                  value={user?.email || ""}
                  readOnly
                  className="block w-full border border-gray-300 rounded-md p-2 pl-10 bg-gray-50"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* ================= IMAGE UPLOAD ================= */}
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
                  defaultValue={currentUser?.phone || ""}
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

export default Profile; 
