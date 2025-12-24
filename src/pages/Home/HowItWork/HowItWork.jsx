import React from "react";
import { Link } from "react-router";
import ProcessSection from "../Banner/ProcessSection";

const HowItWork = ({ faqs }) => {
  return (
    <div>
        <ProcessSection></ProcessSection>

      {/* ================= User Roles ================= */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-4">
            User Roles
          </h2>

          <p className="text-center text-gray-600 mb-10">
            Three roles work together to solve community issues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Citizen */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Citizen</h3>
              <ul className="text-gray-600 space-y-2 list-disc pl-5">
                <li>Submit issues</li>
                <li>Track issue status</li>
                <li>Edit pending issues</li>
                <li>Boost important issues</li>
                <li>Use premium features</li>
              </ul>
            </div>

            {/* Staff */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Staff</h3>
              <ul className="text-gray-600 space-y-2 list-disc pl-5">
                <li>View assigned issues</li>
                <li>Update issue status</li>
                <li>Add work notes</li>
                <li>Resolve issues</li>
              </ul>
            </div>

            {/* Admin */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Admin</h3>
              <ul className="text-gray-600 space-y-2 list-disc pl-5">
                <li>View all issues</li>
                <li>Assign staff</li>
                <li>Manage users</li>
                <li>Check reports & payments</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

     
      

      {/* ================= CTA ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>

          <p className="text-gray-600 mb-6">
            Create an account and start reporting issues in your area.
          </p>

          <Link
            to="/register"
            className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Create Free Account
          </Link>

        </div>
      </section>

    </div>
  );
};

export default HowItWork;
