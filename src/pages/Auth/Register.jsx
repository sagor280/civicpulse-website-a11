

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiUser } from "react-icons/hi";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import Logo from "../../Component/Logo/Logo";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { uploadImageToImgbb } from "../../utils/uploadImage";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SocialPages from "./SocialPages";


const Register = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, loading } = useAuth();

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // =========================
  //     HANDLE REGISTER
  // =========================
  const handleRegistration = async (data) => {
    
    try {
      // 1. Create User
      await createUser(data.email, data.password);

      // 2. Upload Image (using utility function)
      const photoURL = await uploadImageToImgbb(data.photo[0]);

      // 3. Update Firebase Profile
      await updateUserProfile(data.name, photoURL);

      // 4. Save user to DB
    const userInfo = {
      name: data.name,
      email: data.email,
      photo: photoURL,
    };
      await axiosSecure.post('/users', userInfo);

      toast.success("Account created successfully!");
      navigate(from, { replace: true });
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-[#1A2955] to-[#116F68] 
      items-center justify-center p-12 text-white">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4">Join the Movement</h2>
          <p className="text-lg text-gray-200 leading-relaxed mb-10">
            Create your free account and start making a difference today.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 py-8 md:py-12 bg-white">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <Link to="/"><Logo /></Link>
          </div>

          <h2 className="text-3xl font-bold mb-3 text-gray-900">Create your account</h2>
          <p className="text-gray-500 mb-8">Start helping your community today.</p>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-gray-600 text-sm font-medium mb-1 block">Full Name</label>
              <div className="flex items-center gap-2 mt-1 p-3 border border-gray-300 rounded-xl shadow-sm">
                <HiUser className="text-gray-400" />
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="John Doe"
                  className="w-full outline-none text-gray-700"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">Name is required.</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-600 text-sm font-medium mb-1 block">Email</label>
              <div className="flex items-center gap-2 mt-1 p-3 border border-gray-300 rounded-xl shadow-sm">
                <HiOutlineMail className="text-gray-400" />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="you@example.com"
                  className="w-full outline-none text-gray-700"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">Email is required.</p>}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="text-gray-600 text-sm font-medium mb-1 block">Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input file-input-bordered w-full"
              />
              {errors.photo && <p className="text-red-500 text-sm mt-1">Photo is required.</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-600 text-sm font-medium mb-1 block">Password</label>
              <div className="relative border border-gray-300 rounded-xl shadow-sm flex items-center">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                  })}
                  placeholder="Password"
                  className="w-full p-3 outline-none rounded-xl text-gray-700 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 text-gray-500 text-xl"
                >
                  {show ? <FaEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Must include uppercase, lowercase, number & special character.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold mt-2 shadow-md transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-6">
            <span className="h-px bg-gray-300 w-1/3"></span>
            <span className="px-3 text-gray-400 text-sm">or continue with</span>
            <span className="h-px bg-gray-300 w-1/3"></span>
          </div>

          <SocialPages/>

          <p className="text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
