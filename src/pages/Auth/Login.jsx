import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import Logo from "../../Component/Logo/Logo";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, signInWithGoogle, loading } = useAuth();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await signIn(data.email, data.password);

      toast.success("Login Successful");

      const redirectTo = location.state || "/";
      navigate(redirectTo, { replace: true });

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Login Successful");

      const redirectTo = location.state || "/";
      navigate(redirectTo, { replace: true });

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Left Section */} 
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-12 lg:px-20 py-12 bg-white">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start md:mt-1">
            <Link to="/"><Logo /></Link>
          </div>

          {/* Welcome Text */}
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Welcome back
          </h2>
          <p className="text-gray-500 mb-8">
            Sign in to your account to continue reporting and tracking issues.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-gray-600 text-sm font-medium">Email</label>
              <div className="flex items-center gap-2 mt-2 p-3 border border-gray-300 rounded-xl shadow-sm">
                <HiOutlineMail className="text-gray-400" />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="you@example.com"
                  className="w-full outline-none text-gray-700"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-600 text-sm font-medium">Password</label>

              <div className="relative mt-2 p-3 border border-gray-300 rounded-xl shadow-sm flex items-center">
                <RiLockPasswordLine className="text-gray-400 mr-2" />
                <input
                  type={show ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className="w-full outline-none text-gray-700 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 text-xl text-gray-500"
                >
                  {show ? <FaEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}

              <p className="text-sm text-primary mt-2 cursor-pointer hover:underline">
                Forgot password?
              </p>
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold mt-4 shadow-md transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-6">
            <span className="h-px bg-gray-300 w-1/3"></span>
            <span className="px-3 text-gray-400 text-sm">or continue with</span>
            <span className="h-px bg-gray-300 w-1/3"></span>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition shadow-sm"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          {/* Sign up redirect */}
          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-[#0A2342] to-[#1AA37A] items-center justify-center p-12">
        <div className="text-white max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Make Your City Better
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            Join thousands of citizens improving their communities by reporting
            and tracking infrastructure issues.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
