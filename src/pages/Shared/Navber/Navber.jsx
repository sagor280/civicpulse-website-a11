import React from "react";
import Logo from "../../../Component/Logo/Logo";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

// ⬇️ Icon Import 
import { LayoutDashboard, LogOut } from "lucide-react";

const Navber = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const links = (
    <>
      <li><NavLink to="/" className="nav-link">Home</NavLink></li>
      <li><NavLink to="/issues" className="nav-link">All Issues</NavLink></li>
      <li><NavLink to="/how-it-works" className="nav-link">How It Works</NavLink></li>
      <li><NavLink to="/about" className="nav-link">About Us</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-white rounded-3xl shadow-md px-4 lg:px-8 sticky top-0 z-50">

      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-xl shadow-lg w-56 p-2 mt-3 border"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Logo />
      </div>

      {/* CENTER Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 gap-1">
          {links}
        </ul>
      </div>

      {/* RIGHT Side */}
      <div className="navbar-end flex gap-3">

        {user ? (
          /* ================= IF LOGGED IN ================= */
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer">
              <img
                src={user?.photoURL || "https://i.ibb.co/yP0sZ0C/default-user.png"}
                alt="user"
                className="w-10 h-10 rounded-full border"
              />
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content menu p-4 shadow-lg bg-white rounded-xl w-64 border mt-3"
            >
              <li className="pb-2 border-b">
                <p className="font-semibold text-gray-800">{user?.displayName}</p>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </li>

              {/* Dashboard */}
              <li className="mt-2">
                <Link to="/dashboard" className="font-medium flex items-center gap-2">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              </li>

              {/* Logout */}
              <li className="mt-2">
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-semibold flex items-center gap-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* ================= IF NOT LOGGED IN ================= */
          <>
            <Link
              className="px-5 py-2 rounded-xl font-semibold bg-[#19A48E] text-white hover:bg-[#168a77] transition"
              to="/login"
            >
              Sign In
            </Link>

            <Link
              className="px-5 py-2 rounded-xl font-semibold bg-[#f66aa3] text-white hover:bg-[#d9578d] transition"
              to="/register"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navber;
