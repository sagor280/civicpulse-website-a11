import { Crown, Mail, Phone, User2 } from "lucide-react";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  console.log(user)
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;

     setLoading(true);

    updateUserProfile(name)
      .then(() => {
        toast.success("Profile updated successfully");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
        setLoading(false);
      });
      
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
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
            <h1 className="text-xl font-bold text-gray-800">
              {user?.displayName || "User"}
            </h1>
            <p className="text-gray-600 break-all">{user?.email}</p>
          </div>

          <span className="sm:ml-auto bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
            Citizen
          </span>
        </div>

        {/* Upgrade to Premium Section */}
        <div className="bg-yellow-50 border border-amber-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              Upgrade to Premium
            </h2>
          </div>

          <p className="text-gray-600">
            Get unlimited issue submissions and priority support for just ৳1000
            one-time payment.
          </p>

          <ul className="space-y-2 text-sm">
            <li><span className="text-primary text-xl">✔</span> Unlimited issue submissions</li>
            <li><span className="text-primary text-xl">✔</span> Priority support</li>
            <li><span className="text-primary text-xl">✔</span> Premium badge</li>
          </ul>

          <button className="w-full bg-primary text-white py-2 px-4 rounded-md flex items-center justify-center gap-2">
            <Crown className="h-5 w-5 text-yellow-300" />
            Subscribe for ৳1000
          </button>
        </div>

        {/* Edit Profile Section */}
        <form
          onSubmit={handleUpdate}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
          <p className="text-gray-600">Update your personal information.</p>

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="name"
                  
                 defaultValue={user?.displayName}
                  className="block w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-indigo-500"
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
              <p className="mt-1 text-xs text-gray-500">
                Email cannot be changed
              </p>
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
                  defaultValue={user?.phone || ""}
                  className="block w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-indigo-500"
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
