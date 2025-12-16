import { Link, NavLink, Outlet } from "react-router";
import Logo from "../assets/medical-report.png";
import { LayoutDashboard } from "lucide-react";
import { LuFileText } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BsLayoutSidebar } from "react-icons/bs";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ------------------- NAVBAR ------------------- */}
      <div className="drawer-content">
        <header className="h-14 border-b border-gray-200 flex items-center px-4 ">
          {/* Sidebar Toggle */}
          <label htmlFor="my-drawer-4" className="p-2 rounded-lg hover:bg-gray-100 transition-all">
            <BsLayoutSidebar className="w-6 h-6 text-primary" />
          </label>

          {/* Dashboard Title */}
          <span className="ml-4 font-sans font-semibold text-lg text-gray-800">
            CivicPulse
          </span>

          {/* Optional Right Section */}
          <div className="ml-auto hidden lg:flex items-center gap-4">
            {/* Future: Profile / Notifications */}
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </div>

      {/* ------------------- SIDEBAR ------------------- */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col items-start bg-primary is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu text-white font-medium w-full grow pt-3 space-y-2">

            {/* Logo */}
            <Link to="/" className="flex justify-center mb-3">
              <img
                src={Logo}
                alt="Logo"
                className="w-12 h-12 is-drawer-open:w-14 is-drawer-open:h-14 object-contain mb-2 hover:scale-110 transition-all"
              />
            </Link>

            {/* Overview */}
            <li>
              <NavLink
                to="/dashboard"
                end
                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/20 text-base is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Overview"
              >
                <LayoutDashboard className="text-xl" />
                <span className="is-drawer-close:hidden text-[15px]">Overview</span>
              </NavLink>
            </li>

            {/* My Issues */}
            <li>
              <NavLink
                to="/dashboard/my-issues"
                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/20 text-base is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Issues"
              >
                <LuFileText className="text-xl" />
                <span className="is-drawer-close:hidden text-[15px]">My Issues</span>
              </NavLink>
            </li>

            {/* Report Issues */}
            <li>
              <NavLink
                to="/dashboard/report-issues"
                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/20 text-base is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Report Issues"
              >
                <IoMdAddCircleOutline className="text-xl" />
                <span className="is-drawer-close:hidden text-[15px]">Report Issues</span>
              </NavLink>
            </li>

            {/* My Profile */}
            <li>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/20 text-base is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Profile"
              >
                <CgProfile className="text-xl" />
                <span className="is-drawer-close:hidden text-[15px]">My Profile</span>
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
