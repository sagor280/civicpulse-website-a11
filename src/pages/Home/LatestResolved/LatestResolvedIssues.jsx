import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import AllIssuesCard from "../../../Component/Cards/AllIssuesCard";

const LatestResolvedIssues = () => {
  const axiosSecure = useAxiosSecure();

  const { data: latestIssues = [] } = useQuery({
    queryKey: ["latestResolvedIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues/resolved/latest");
      return res.data;
    },
  });

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
    closed: "bg-gray-200 text-gray-600",
  };

  const priorityColor = {
    high: "bg-red-100 text-red-700",
    normal: "bg-green-100 text-green-700",
  };

  return (
    <section className="mt-16">
      {/* ===== Section Header ===== */}
      <div className="text-center max-w-2xl mx-auto mb-10">
         <span className="px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
          Latest Updates
        </span>

         <h2 className="text-5xl font-bold mt-4">
          How <span className="text-primary">Recently</span>
          <span className="text-primary font-extrabold">Resolved</span> Issues
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mt-3 mb-12">
          See the latest infrastructure issues being addressed in your community.
        </p>
      </div>

      {/* ===== Cards Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-6">
        {latestIssues.map((issue) => (
          <AllIssuesCard
            key={issue._id}
            issue={issue}
            statusColor={statusColor}
            priorityColor={priorityColor}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestResolvedIssues;
