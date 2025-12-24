import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import logo from '../../../assets/medical-report.png'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img className="h-10 w-10 object-contain drop-shadow-sm" src={logo} alt="" />
              <h2 className="text-xl font-semibold text-gray-800">
                CivicReport
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Empowering citizens to report and track public infrastructure
              issues for a better community.
            </p>

            <div className="flex gap-3 text-gray-500">
              <a href="#" className="hover:text-secondary transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-secondary transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-secondary transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-secondary cursor-pointer">All Issues</li>
              <li className="hover:text-secondary cursor-pointer">How It Works</li>
              <li className="hover:text-secondary cursor-pointer">About Us</li>
              <li className="hover:text-secondary cursor-pointer">Report an Issue</li>
            </ul>
          </div>

          {/* Issue Categories */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Issue Categories
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-secondary cursor-pointer">Streetlights</li>
              <li className="hover:text-secondary cursor-pointer">Potholes</li>
              <li className="hover:text-secondary cursor-pointer">Water Leakage</li>
              <li className="hover:text-secondary cursor-pointer">Garbage Collection</li>
              <li className="hover:text-secondary cursor-pointer">Road Damage</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-secondary" />
                City Municipal Corporation
              </li>
              <li className="flex items-center gap-2">
                <MdPhone className="text-secondary" />
                +8801319105280
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-secondary" />
                support@civicreport.gov
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 CivicReport. All rights reserved. Making cities better, one
            report at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
