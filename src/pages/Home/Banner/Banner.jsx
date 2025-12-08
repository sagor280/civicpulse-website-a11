import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative w-full min-h-[85vh] bg-gradient-to-br from-[#E9FFFD] via-[#F7FFFE] to-[#FFFFFF] flex items-center rounded-3xl px-6 md:px-16 mt-6 overflow-hidden">

      {/* Modern Soft Blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#19A48E]/15 rounded-full blur-[90px]"></div>
      <div className="absolute bottom-0 left-0 w-[340px] h-[340px] bg-[#33B09F]/10 rounded-full blur-[100px]"></div>

      {/* Grid Content */}
      <div className="grid md:grid-cols-2 gap-10 items-center z-20 w-full">

        {/* LEFT TEXT SECTION */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Empower Your  
            <span className="text-[#19A48E]"> Community.</span>
            <br />
            Report Issues Easily.
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed">
            Join CivicPulse to raise local issues, track updates, and help build a smarter, cleaner,
            and more transparent community—right from your mobile or computer.
          </p>

          <div className="flex gap-4 pt-2">
            <Link
              to="/rider"
              className="px-7 py-3 bg-[#19A48E] text-white font-semibold rounded-xl shadow-md hover:bg-[#158a76] transition duration-200"
            >
              Get Started
            </Link>

            <Link
              to="/how-it-works"
              className="px-7 py-3 bg-white border border-[#19A48E] text-[#19A48E] font-semibold rounded-xl shadow-sm hover:bg-[#19A48E] hover:text-white transition duration-200"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-[#19A48E]/20 rounded-full"></div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854894.png"
              alt="City Illustration"
              className="relative w-72 md:w-[420px] drop-shadow-2xl animate-[float_4s_ease-in-out_infinite]"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
